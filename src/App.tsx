import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchHasChanged from "./components/SearchHasChanged";
import Mission from "./components/Mission";
import Solution from "./components/Solution";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import type { Language } from "./utils/translations";

export default function App() {
  const [lang, setLang] = useState<Language>("en");

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "vi" : "en"));
  };

  return (
    <div className="relative min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-foreground selection:text-background">
      {/* Navbar with Language Switcher */}
      <Navbar lang={lang} toggleLang={toggleLang} />

      {/* Main Content */}
      <main className="w-full flex flex-col">
        {/* 1. Hero Section (Visual art & tech theme remains clean) */}
        <Hero />

        {/* 2. Portfolio Showcase */}
        <SearchHasChanged lang={lang} />

        {/* 3. About / Artist Statement */}
        <Mission lang={lang} />

        {/* 4. Exhibitions Grid */}
        <Solution />

        {/* 5. CTA Section */}
        <CTA lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
