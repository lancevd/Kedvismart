"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { TbMicrophone, TbMicrophoneOff } from "react-icons/tb";
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

  const [initializing, setInitializing] = useState(true);
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lastCommand, setLastCommand] = useState("");
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Clear status message after 3 seconds
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);


  // Stash a search term for the Shop page to read on mount.
  const stashSearchTerm = (term) => {
    try {
      sessionStorage.setItem("kedvis_voice_search", term);
    } catch (_) { }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    console.log("🎤 Voice Assistant: Initializing...");

    const hasRecognition =
      typeof window.SpeechRecognition !== "undefined" ||
      typeof window.webkitSpeechRecognition !== "undefined";

    if (!hasRecognition) {
      console.warn("🎤 Voice Assistant: Speech recognition not supported in this browser.");
      setSupported(false);
      setInitializing(false);
      return;
    }

    let cancelled = false;
    import("annyang")
      .then(({ default: annyang }) => {
        if (cancelled) return;
        console.log("🎤 Voice Assistant: Annyang loaded successfully.");
        annyangRef.current = annyang;
        setInitializing(false);

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

          // --- Sorting ---
          "sort by price low to high": () => {
            router.push("/shop?sort=price-asc");
          },
          "sort by price high to low": () => {
            router.push("/shop?sort=price-desc");
          },
          "sort by newest": () => {
            router.push("/shop?sort=newest");
          },

          // --- Category Filtering ---
          "show me *category": (category) => {
            // Clean up the category name (e.g. "men's clothing")
            const slug = category.toLowerCase().trim().replace(/\s+/g, '-');
            router.push(`/shop?category=${slug}`);
          },
          "view *category": (category) => {
            const slug = category.toLowerCase().trim().replace(/\s+/g, '-');
            router.push(`/shop?category=${slug}`);
          },

          // --- Cart actions ---
          "add to cart": () => {
            const productID = getCookie("itemID");
            if (!productID) {
              setError("Open a product first, then say \"add to cart\".");
              return;
            }
            addItemToCart(productID, 1)
              .then(() => setStatusMessage("Added to cart!"))
              .catch((err) => {
                setError(err?.message || "Could not add to cart.");
              });
          },
          "add this to cart": () => {
            const productID = getCookie("itemID");
            if (!productID) {
              setError("Open a product first, then say \"add to cart\".");
              return;
            }
            addItemToCart(productID, 1)
              .then(() => setStatusMessage("Added to cart!"))
              .catch((err) => {
                setError(err?.message || "Could not add to cart.");
              });
          },
          "add *product to cart": async (productName) => {
            try {
              setStatusMessage(`Searching for ${productName}...`);
              const res = await fetch(`/api/products?search=${encodeURIComponent(productName)}`);
              const products = await res.json();
              if (products && products.length > 0) {
                const product = products[0];
                await addItemToCart(product._id, 1);
                setStatusMessage(`Added ${product.name} to cart!`);
              } else {
                setError(`Could not find "${productName}".`);
              }
            } catch (err) {
              setError("Failed to add item.");
            }
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

  const status = initializing
    ? "Initializing voice..."
    : !supported
    ? "Voice not supported"
    : listening
    ? "Listening (Tap to stop)"
    : statusMessage
    ? statusMessage
    : lastCommand
    ? `Heard: "${lastCommand}"`
    : "Tap to speak";


  const StatusDot = () => {
    if (initializing) return <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>;
    if (!supported) return <TbMicrophoneOff size={14} />;
    return listening ? <TbMicrophone size={14} className="text-red-500 animate-pulse" /> : <TbMicrophone size={14} />;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">
      {/* Status / transcript pill */}
      <div
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold shadow-2xl transition-all duration-300 border ${
          initializing
            ? "bg-yellow-50 text-yellow-700 border-yellow-100"
            : !supported
            ? "bg-gray-100 text-gray-500 border-gray-200"
            : listening
            ? "bg-red-50 text-red-600 border-red-100 scale-105"
            : error
            ? "bg-red-600 text-white border-transparent"
            : "bg-white text-black border-gray-100"
        }`}
        role="status"
        aria-live="polite"
      >
        <StatusDot />
        <span className="max-w-[14rem] truncate">{error || status}</span>
      </div>

      {/* Pulsing ring (only while listening) */}
      {listening && (
        <span className="relative inline-flex h-14 w-14 -mb-14 pointer-events-none">
          <span className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-40" />
        </span>
      )}

      {/* Mic button */}
      <button
        type="button"
        onClick={toggleListening}
        disabled={!supported || initializing}
        aria-label={listening ? "Stop voice commands" : "Start voice commands"}
        className={`relative inline-flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${
          initializing
            ? "bg-gray-100 text-gray-400 cursor-wait"
            : !supported
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : listening
            ? "bg-red-500 text-white rotate-12"
            : "bg-black text-white hover:bg-gray-800 hover:scale-110"
        }`}
      >
        {initializing ? (
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600"></div>
        ) : listening ? (
          <TbMicrophone size={32} />
        ) : supported ? (
          <TbMicrophone size={32} />
        ) : (
          <TbMicrophoneOff size={32} />
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