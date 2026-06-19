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
      <div className="relative z-10 flex flex-col items-center max-w-2xl px-6 text-center">
        {/* Logo and Brand Text */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center justify-center mb-12 gap-6 sm:gap-8"
        >
          {/* Logo SVG */}
          <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 text-white flex-shrink-0">
            <svg
              viewBox="-45 -52.6 65 55.5"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full"
            >
              <g transform="scale(1, -1)">
                <path d="M -40 3.9999999999999973 L -40 18 A 3.9999999999999964 3.9999999999999964 0 0 0 -38.4 21.200000000000003 L -3.1999999999999984 47.599999999999994 A 1.9999999999999953 1.9999999999999953 0 0 0 3.3306690738754696e-15 46.00000000000001 L -5.551115123125783e-16 39.342585690775024 A 4.999999999999998 4.999999999999998 0 0 1 7.773501066962015 35.182334276309724 L 11.890599796732616 37.927066885522564 A 1.9999999999999991 1.9999999999999991 0 0 0 15.000000223517421 36.26296631973644 L 15.000000223517418 12.140735182963596 A 3.9999999999999973 3.9999999999999973 0 0 0 13.218801008418339 8.812534005612227 L 3.1094003924504583 2.072933594966972 A 2 2 0 0 0 0 3.73703418364266 L 0 20 A 4.999999999999999 4.999999999999999 0 0 1 -8 24 L -36.800000000000004 2.399999999999998 A 1.9999999999999967 1.9999999999999967 0 0 0 -40 3.9999999999999973 Z" />
              </g>
            </svg>
          </div>
          {/* Brand Text */}
          <h1 className="font-rounded font-semibold text-3xl sm:text-5xl md:text-6xl tracking-[0.2em] text-white uppercase select-none leading-none mr-[-0.2em]">
            ART&TECH
          </h1>
        </motion.div>

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
