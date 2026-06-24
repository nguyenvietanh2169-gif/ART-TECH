import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchHasChanged from "./components/SearchHasChanged";
import Mission from "./components/Mission";
import Solution from "./components/Solution";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import WelcomeOverlay from "./components/WelcomeOverlay";
import AudioPlayer from "./components/AudioPlayer";
import CustomCursor from "./components/CustomCursor";
import type { Language } from "./utils/translations";

export default function App() {
  const [lang, setLang] = useState<Language>("vi");
  const [showOverlay, setShowOverlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Prevent scrolling when welcome overlay is active
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = "unset";
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showOverlay]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Call stop if overlay is active initially
    if (showOverlay) {
      lenis.stop();
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

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
      {/* Custom Mouse Cursor */}
      <CustomCursor />

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
        <SearchHasChanged lang={lang} onProductClick={() => setIsPlaying(false)} />

        {/* FAQs Accordion */}
        <FAQ lang={lang} />

        {/* 5. CTA Section */}
        <CTA lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}

