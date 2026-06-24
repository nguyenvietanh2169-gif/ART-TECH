import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";
import { translations } from "../utils/translations";
import type { Language } from "../utils/translations";

interface ShowcaseVideoProps {
  src: string;
}

function ShowcaseVideo({ src }: ShowcaseVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((err) => console.log("Showcase video play error:", err));
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      className="w-full h-full object-cover select-none filter contrast-[1.05] brightness-[1.05] transition-transform duration-[800ms] group-hover:scale-101"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

interface SearchHasChangedProps {
  lang: Language;
  onProductClick?: () => void;
}

export default function SearchHasChanged({ lang, onProductClick }: SearchHasChangedProps) {
  const t = translations[lang].portfolio;

  const showcases = [
    {
      name: t.vanzi3Name,
      video: "/videos/vanzi-demo.mp4",
      price: t.vanzi3Price,
      link: "https://vanziondabeat3.vercel.app",
      description: t.vanzi3Desc,
    },
    {
      name: t.vanzi1Name,
      video: "/videos/vanzi-demo-2.mp4",
      price: t.vanzi1Price,
      link: "https://vanziondabeat.vercel.app/",
      description: t.vanzi1Desc,
    },
  ];

  return (
    <section
      id="portfolio-section"
      className="relative bg-black text-foreground pt-52 md:pt-64 pb-20 px-8 md:px-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <motion.h2
          {...fadeUp(0.1)}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] leading-[1.05] max-w-4xl"
        >
          {lang === "en" ? (
            <>
              Selected <span className="font-serif italic font-normal">Showcases</span>
            </>
          ) : (
            <>
              Tuyển Tập <span className="font-serif italic font-normal">Thiết Kế</span>
            </>
          )}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-muted-foreground text-base md:text-lg max-w-3xl mt-8 mb-20 leading-relaxed"
        >
          {t.subtitle}
        </motion.p>

        {/* 2-Column Showcases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mb-12 text-left">
          {showcases.map((show, index) => (
            <motion.div
              key={show.name}
              {...fadeUp(0.3 + index * 0.1)}
              className="flex flex-col gap-6"
            >
              {/* Clean Mockup Frame (No Top Bar) */}
              <motion.a
                href={show.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onProductClick}
                whileHover={{ y: -6 }}
                data-cursor="view"
                className="w-full aspect-video flex flex-col rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.02)] border border-border/20 bg-black cursor-pointer group"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <ShowcaseVideo src={show.video} />
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                  {/* View Live Tag */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-[10px] tracking-wider uppercase text-foreground px-3 py-1.5 rounded-lg border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
                    {t.liveTag}
                  </div>
                </div>
              </motion.a>

              {/* Showcase metadata */}
              <div className="flex flex-col bg-card/10 border border-border/10 p-6 rounded-2xl gap-4 backdrop-blur-sm">
                {/* Top Row: Name/Desc & Price */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1 tracking-wide">
                      {show.name}
                    </h3>
                    <p className="text-muted-foreground text-xs max-w-sm leading-relaxed">
                      {show.description}
                    </p>
                  </div>
                  <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto shrink-0 border-t border-border/10 md:border-none pt-3 md:pt-0">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-widest block md:hidden">
                      {t.priceLabel}
                    </span>
                    <div className="text-right">
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest hidden md:block">
                        {t.priceLabel}
                      </span>
                      <span className="font-mono text-lg font-bold text-foreground block mt-0.5">
                        {show.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-white/5 my-1" />

                {/* Bottom Row: Benefits List */}
                <div className="flex flex-col gap-2.5 text-xs text-muted-foreground font-light leading-relaxed">
                  {t.benefits && t.benefits.map((benefit: string, bIdx: number) => (
                    <div key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-foreground/45 text-[10px] select-none mt-0.5">•</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Deposit Note */}
                {t.depositNote && (
                  <div className="text-[10px] text-muted-foreground/45 italic mt-1.5 pt-2.5 border-t border-white/5 font-sans tracking-wide">
                    {t.depositNote}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* NFC Chip Card Section */}
        <motion.div
          {...fadeUp(0.45)}
          className="w-full mt-16 bg-card/5 border border-border/10 rounded-3xl p-6 md:p-10 backdrop-blur-sm text-left flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
        >
          {/* Image Column */}
          <div className="w-full lg:w-1/2 aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden relative group bg-black shrink-0">
            <img
              src="/nfc-card.jpg"
              alt="NFC Chip Card"
              className="w-full h-full object-cover select-none filter contrast-[1.05] brightness-[1.05] transition-transform duration-[800ms] group-hover:scale-103"
            />
            {/* Soft border gradient vignette overlay */}
            <div className="absolute inset-0 shadow-[inset_0_0_60px_25px_#000000] pointer-events-none" />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
          </div>

          {/* Details Column */}
          <div className="w-full flex flex-col gap-6">
            <div>
              {/* Badge */}
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-accent border border-accent/20 px-2.5 py-1 rounded-full bg-accent/5">
                {t.nfcSection.badge}
              </span>
              
              {/* Title */}
              <h3 className="font-semibold text-2xl md:text-3xl text-foreground tracking-wide mt-4 mb-2">
                {t.nfcSection.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl font-light">
                {t.nfcSection.desc}
              </p>
            </div>

            {/* Divider Line */}
            <div className="w-full h-[1px] bg-white/5" />

            {/* Info and pricing list */}
            <div className="flex flex-col gap-6 text-xs text-muted-foreground font-light leading-relaxed">
              {/* Free Gift */}
              <div className="w-full">
                <h4 className="font-semibold text-foreground text-sm tracking-wide">
                  {t.nfcSection.freeGiftLabel}
                </h4>
                <p className="text-muted-foreground mt-1 font-light">
                  {t.nfcSection.freeGiftDesc}
                </p>
              </div>

              {/* Custom Logo Card */}
              <div className="w-full">
                <h4 className="font-semibold text-foreground text-sm tracking-wide">
                  {t.nfcSection.logoCustomLabel}
                </h4>
                <div className="flex justify-between items-baseline gap-4 mt-1">
                  <p className="text-muted-foreground font-light text-xs">
                    {t.nfcSection.logoCustomDesc}
                  </p>
                  <span className="font-mono font-bold text-foreground text-sm shrink-0 text-right">
                    {t.nfcSection.logoCustomPrice}
                  </span>
                </div>
              </div>

              {/* Standalone Card */}
              <div className="w-full">
                <h4 className="font-semibold text-foreground text-sm tracking-wide">
                  {t.nfcSection.standaloneLabel}
                </h4>
                <div className="flex justify-between items-baseline gap-4 mt-1">
                  <p className="text-muted-foreground font-light text-xs">
                    {t.nfcSection.standaloneDesc}
                  </p>
                  <span className="font-mono font-bold text-foreground text-sm shrink-0 text-right">
                    {t.nfcSection.standalonePrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* More coming notice */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-16 flex flex-col items-center gap-2.5 text-muted-foreground/60 select-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground/50 font-sans">
              {lang === "en" ? "In Development" : "Đang Thiết Kế"}
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm tracking-wide font-light max-w-md leading-relaxed text-center">
            {t.moreComing}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
