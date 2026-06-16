import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchHasChanged from "./components/SearchHasChanged";
import Mission from "./components/Mission";
import Solution from "./components/Solution";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import WelcomeOverlay from "./components/WelcomeOverlay";
import AudioPlayer from "./components/AudioPlayer";
import type { Language } from "./utils/translations";

export default function App() {
  const [lang, setLang] = useState<Language>("vi");
  const [showOverlay, setShowOverlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Prevent scrolling when welcome overlay is active
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showOverlay]);

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "vi" : "en"));
  };

  const handleStart = () => {
    setShowOverlay(false);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-foreground selection:text-background">
      {/* Welcome Screen Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <WelcomeOverlay onStart={handleStart} />
        )}
      </AnimatePresence>

      {/* Floating Audio Controller */}
      <AudioPlayer isPlaying={isPlaying} onTogglePlay={handleTogglePlay} lang={lang} />

      {/* Navbar with Language Switcher */}
      <Navbar lang={lang} toggleLang={toggleLang} />

      {/* Main Content */}
      <main className="w-full flex flex-col">
        {/* 1. Hero Section (Visual art & tech theme remains clean) */}
        <Hero />

        {/* 2. About / Artist Statement */}
        <Mission lang={lang} />

        {/* 4. Exhibitions Grid (Cinematic Video Loop) */}
        <Solution />

        {/* 3. Portfolio Showcase */}
        <SearchHasChanged lang={lang} />

        {/* 5. CTA Section */}
        <CTA lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}

