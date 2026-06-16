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
        {/* Concentric Circles Logo */}
        <motion.div
          {...fadeUp(0.1)}
          className="w-10 h-10 rounded-full border-2 border-foreground/60 flex items-center justify-center bg-black/30 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)] mb-6"
        >
          <div className="w-5 h-5 rounded-full border border-foreground/60" />
        </motion.div>

        {/* Contact Label */}
        <motion.span
          {...fadeUp(0.2)}
          className="text-xs tracking-[4px] uppercase text-muted-foreground font-semibold block mb-3"
        >
          {t.label}
        </motion.span>

        {/* Refined Liquid Glass Email Card */}
        <motion.a
          {...fadeUp(0.3)}
          href={`mailto:${t.email}`}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          whileTap={{ scale: 0.98 }}
          className="liquid-glass border border-white/10 text-foreground font-mono font-medium rounded-2xl px-10 py-5 text-xl md:text-3xl shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-300 cursor-pointer select-all inline-block"
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
