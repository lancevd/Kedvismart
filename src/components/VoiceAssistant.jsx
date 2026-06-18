"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { TbMicrophone, TbMicrophoneFilled, TbMicrophoneOff } from "react-icons/tb";
import { useCart } from "@/contexts/cartContext";

// Voice command grammar (annyang):
//   *term        - multi-word splat (e.g. "blue jeans" -> term = "blue jeans")
//   (optional)   - optional word in phrase
//   :noun        - named single-word capture
//
// Each command calls into the React app via the router and useCart().
// All side-effects are guarded with `typeof window !== 'undefined'`.

const VoiceAssistant = () => {
  const router = useRouter();
  const { addItemToCart } = useCart();
  const annyangRef = useRef(null);

  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lastCommand, setLastCommand] = useState("");
  const [error, setError] = useState("");

  // Stash a search term for the Shop page to read on mount.
  const stashSearchTerm = (term) => {
    try {
      sessionStorage.setItem("kedvis_voice_search", term);
    } catch (_) {
      // sessionStorage may be unavailable in private mode; fail silently.
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Feature-detect the underlying SpeechRecognition API.
    const hasRecognition =
      typeof window.SpeechRecognition !== "undefined" ||
      typeof window.webkitSpeechRecognition !== "undefined";

    if (!hasRecognition) {
      setSupported(false);
      return;
    }

    // Dynamic import keeps annyang out of the server bundle and lets us
    // gracefully no-op when SpeechRecognition is unavailable.
    let cancelled = false;
    import("annyang")
      .then(({ default: annyang }) => {
        if (cancelled) return;
        annyangRef.current = annyang;

        const goTo = (path) => () => router.push(path);

        const commands = {
          // --- Navigation ---
          "go to shop": goTo("/shop"),
          "open shop": goTo("/shop"),
          "show shop": goTo("/shop"),

          "go to cart": goTo("/cart"),
          "open cart": goTo("/cart"),
          "show cart": goTo("/cart"),
          "view cart": goTo("/cart"),

          "go to checkout": goTo("/cart"),
          checkout: goTo("/cart"),
          "check out": goTo("/cart"),
          "open checkout": goTo("/cart"),

          "go home": goTo("/"),
          "go to home": goTo("/"),
          "open home": goTo("/"),
          "take me home": goTo("/"),

          "show new arrivals": goTo("/#arrival"),
          "new arrivals": goTo("/#arrival"),

          "go to about": goTo("/about"),
          "open about": goTo("/about"),

          // --- Search ---
          "search for *term": (term) => {
            stashSearchTerm(term);
            router.push("/shop");
          },
          "search *term": (term) => {
            stashSearchTerm(term);
            router.push("/shop");
          },
          "find *term": (term) => {
            stashSearchTerm(term);
            router.push("/shop");
          },
          "look for *term": (term) => {
            stashSearchTerm(term);
            router.push("/shop");
          },
          "show me *term": (term) => {
            stashSearchTerm(term);
            router.push("/shop");
          },

          // --- Cart actions ---
          "add to cart": () => {
            const productID = getCookie("itemID");
            if (!productID) {
              setError("Open a product first, then say \"add to cart\".");
              return;
            }
            addItemToCart(productID, 1).catch((err) => {
              setError(err?.message || "Could not add to cart.");
            });
          },
          "add this to cart": () => {
            const productID = getCookie("itemID");
            if (!productID) {
              setError("Open a product first, then say \"add to cart\".");
              return;
            }
            addItemToCart(productID, 1).catch((err) => {
              setError(err?.message || "Could not add to cart.");
            });
          },

          // --- Mic control ---
          "stop listening": () => annyang.abort(),
          "go to sleep": () => annyang.abort(),
          "wake up": () => annyang.start(),
          "start listening": () => annyang.start(),
        };

        annyang.addCommands(commands);
        annyang.setLanguage("en-US");

        // Surface what the user said + what we matched.
        annyang.addCallback("result", (phrases) => {
          setTranscript(phrases?.[0] || "");
        });
        annyang.addCallback("resultMatch", (userSaid, _commandText, phrases) => {
          setLastCommand(userSaid || phrases?.[0] || "");
        });
        annyang.addCallback("errorNoSpeech", () => {
          setError("I didn't hear anything. Try again.");
        });
        annyang.addCallback("errorNetwork", () => {
          setError("Network error. Check your connection and try again.");
        });
        annyang.addCallback("errorPermissionBlocked", () => {
          setError("Microphone access is blocked. Enable it in browser settings.");
        });
        annyang.addCallback("errorPermissionDenied", () => {
          setError("Microphone access denied. Enable it in browser settings.");
        });
        annyang.addCallback("start", () => setListening(true));
        annyang.addCallback("end", () => setListening(false));
      })
      .catch(() => setSupported(false));

    return () => {
      cancelled = true;
      const annyang = annyangRef.current;
      if (annyang) {
        try {
          annyang.abort();
        } catch (_) {
          // ignore
        }
      }
    };
  }, [router, addItemToCart]);

  const toggleListening = () => {
    setError("");
    const annyang = annyangRef.current;
    if (!annyang) return;
    if (listening) {
      annyang.abort();
    } else {
      try {
        annyang.start({ autoRestart: true, continuous: false });
      } catch (e) {
        setError("Could not start microphone.");
      }
    }
  };

  const status = !supported
    ? "Voice not supported in this browser"
    : listening
    ? "Listening..."
    : lastCommand
    ? `Heard: "${lastCommand}"`
    : "Tap to speak";

  const StatusDot = () => {
    if (!supported) return <TbMicrophoneOff size={14} />;
    return listening ? <TbMicrophoneFilled size={14} /> : <TbMicrophone size={14} />;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Status / transcript pill */}
      <div
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg transition-colors ${
          !supported
            ? "bg-gray-200 text-gray-700"
            : listening
            ? "bg-black text-white"
            : error
            ? "bg-red-500 text-white"
            : "bg-white text-black border border-gray-200"
        }`}
        role="status"
        aria-live="polite"
      >
        <StatusDot />
        <span className="max-w-[12rem] truncate">{error || status}</span>
      </div>

      {/* Pulsing ring (only while listening) */}
      {listening && (
        <span className="relative inline-flex h-14 w-14 -mb-14">
          <span className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-black opacity-30" />
        </span>
      )}

      {/* Mic button */}
      <button
        type="button"
        onClick={toggleListening}
        disabled={!supported}
        aria-label={listening ? "Stop voice commands" : "Start voice commands"}
        title={
          !supported
            ? "Voice commands require Chrome, Edge, or Safari"
            : listening
            ? "Tap to stop listening"
            : "Tap to speak"
        }
        className={`relative inline-flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-transform ${
          !supported
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : listening
            ? "bg-red-500 text-white scale-110"
            : "bg-black text-white hover:scale-105 active:scale-95"
        }`}
      >
        {listening ? (
          <TbMicrophoneFilled size={26} />
        ) : supported ? (
          <TbMicrophone size={26} />
        ) : (
          <TbMicrophoneOff size={26} />
        )}
      </button>

      {/* Latest transcript (visible only after first command) */}
      {transcript && !error && (
        <div className="rounded-lg bg-white/90 px-3 py-1.5 text-[11px] text-gray-700 shadow border border-gray-200 max-w-[16rem] text-right">
          “{transcript}”
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;