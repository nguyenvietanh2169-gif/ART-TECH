import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Hls from "hls.js";
import { fadeUp } from "../utils/animations";
import { translations } from "../utils/translations";
import type { Language } from "../utils/translations";

interface CTAProps {
  lang: Language;
}

export default function CTA({ lang }: CTAProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsUrl = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";
  const t = translations[lang].cta;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    let hls: Hls | null = null;
    let isInitialized = false;

    const initHls = () => {
      if (isInitialized) return;
      isInitialized = true;

      if (Hls.isSupported()) {
        hls = new Hls({
          maxMaxBufferLength: 10,
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS fallback (Safari)
        video.src = hlsUrl;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          initHls();
          video.play().catch((err) => console.log("HLS play error:", err));
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <section
      id="contact-section"
      className="relative bg-black text-foreground py-32 md:py-44 border-t border-border/30 overflow-hidden flex flex-col justify-center items-center px-4"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 select-none pointer-events-none"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 z-1 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center px-4">
        {/* Brand Logo */}
        <motion.div
          {...fadeUp(0.1)}
          className="w-16 h-16 text-white flex-shrink-0 mb-6"
        >
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
        </motion.div>

        {/* Brand Text */}
        <motion.span
          {...fadeUp(0.2)}
          className="font-rounded font-semibold text-xl tracking-[0.2em] text-white uppercase select-none leading-none mr-[-0.2em] block mb-10"
        >
          ART&TECH
        </motion.span>

        {/* Refined Liquid Glass Email Card */}
        <motion.a
          {...fadeUp(0.3)}
          href={`mailto:${t.email}`}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          whileTap={{ scale: 0.98 }}
          className="liquid-glass border border-white/10 text-foreground font-mono font-medium rounded-2xl px-4 py-3 sm:px-10 sm:py-5 text-xs min-[360px]:text-sm sm:text-xl md:text-3xl shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-300 cursor-pointer select-all inline-block max-w-full"
        >
          {t.email}
        </motion.a>

        {/* Social Links List */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-wrap gap-4 justify-center items-center mt-12 w-full"
        >
          {[
            { name: "Instagram", href: "https://www.instagram.com/vietanhnguyen.raw/", label: "@vietanhnguyen.raw" },
            { name: "Facebook", href: "https://www.facebook.com/viet.anh.nguyen.291622/", label: "Facebook" },
            { name: "Zalo", href: "https://zalo.me/0329123321", label: "0329 123 321" },
          ].map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass px-6 py-3 rounded-full text-xs font-semibold text-foreground border border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="text-muted-foreground/50 mr-1.5">{social.name}</span>
              {social.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
