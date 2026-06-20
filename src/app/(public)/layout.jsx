import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VoiceAssistant from "@/components/VoiceAssistant";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <div className="pt-[140px] md:pt-[160px]">
        {children}
      </div>
      <Footer />
      <VoiceAssistant />
    </>
  );
}
