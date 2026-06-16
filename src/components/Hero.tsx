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
      <div className="relative z-10 max-w-5xl mx-auto pt-40 md:pt-48 flex flex-col items-center text-center gap-8 px-4">
        {/* Heading */}
        <motion.h1
          {...fadeUp(0.3)}
          className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-[-4px] text-foreground leading-[1.05] uppercase select-none"
        >
          ART
          <span className="font-serif italic font-normal text-muted-foreground/80 lowercase mx-2">
            &
          </span>
          TECH
        </motion.h1>
      </div>
    </section>
  );
}
