import { motion } from "framer-motion";

interface WelcomeOverlayProps {
  onStart: () => void;
}

export default function WelcomeOverlay({ onStart }: WelcomeOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] w-screen h-screen bg-black flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
        {/* Logo ART&TECH (Exactly styled like the homepage/hero header) */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="text-6xl sm:text-7xl md:text-8xl font-semibold tracking-[-4px] text-white leading-[1.05] uppercase select-none mb-12"
        >
          ART
          <span className="font-serif italic font-normal text-muted-foreground/80 lowercase mx-3">
            &amp;
          </span>
          TECH
        </motion.h1>

        {/* Start Button (Liquid glass styled, containing only the text "START") */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <button
            onClick={onStart}
            className="liquid-glass group relative px-10 py-3.5 rounded-full transition-all duration-500 hover:scale-105 active:scale-98"
          >
            {/* Hover background white transition */}
            <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />

            <span className="relative z-10 text-xs sm:text-sm font-semibold tracking-[0.25em] text-white transition-colors duration-500 group-hover:text-black">
              START
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
