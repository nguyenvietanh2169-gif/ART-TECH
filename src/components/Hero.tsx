import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly set muting for iOS Safari support
    video.muted = true;
    video.defaultMuted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((err) => console.log("Hero video play error:", err));
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-start items-center overflow-hidden bg-black px-4">
      {/* Background Video with 100% opacity and high contrast for sharp details */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 contrast-[1.40] brightness-[0.95] select-none pointer-events-none"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
          type="video/mp4"
        />
      </video>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-1 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto pt-40 md:pt-48 flex flex-col items-center justify-center px-4">
        {/* Horizontal Container for Logo and Heading */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex items-center justify-center gap-[3vw] sm:gap-6"
        >
          {/* Logo SVG */}
          <div className="w-[14vw] h-[14vw] max-w-[80px] max-h-[80px] sm:w-20 sm:h-20 md:w-24 md:h-24 text-white flex-shrink-0">
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

          {/* Heading */}
          <h1 className="text-[7.5vw] sm:text-5xl md:text-6xl lg:text-7xl font-rounded font-semibold tracking-[0.18em] text-foreground uppercase select-none leading-none mr-[-0.18em]">
            ART&TECH
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
