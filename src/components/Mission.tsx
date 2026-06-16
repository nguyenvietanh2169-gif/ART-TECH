import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { translations } from "../utils/translations";
import type { Language } from "../utils/translations";

interface WordRevealProps {
  word: string;
  progress: MotionValue<number>;
  wordStart: number;
  wordEnd: number;
  isHighlighted: boolean;
}

function WordReveal({ word, progress, wordStart, wordEnd, isHighlighted }: WordRevealProps) {
  const opacity = useTransform(progress, [wordStart, wordEnd], [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={
        isHighlighted
          ? "text-foreground font-semibold"
          : "text-[hsl(var(--hero-subtitle))] font-normal"
      }
    >
      {word}{" "}
    </motion.span>
  );
}

interface ScrollRevealTextProps {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlightWords?: string[];
  className?: string;
}

function ScrollRevealText({
  text,
  progress,
  range,
  highlightWords = [],
  className = "",
}: ScrollRevealTextProps) {
  if (!text) return null;
  const words = text.split(" ");
  const [start, end] = range;
  const totalWords = words.length;

  return (
    <p className={className}>
      {words.map((word, i) => {
        // Strip punctuation to check for highlight words
        const cleanWord = word.replace(/[^a-zA-ZáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵĐđ]/g, "").toLowerCase();
        const isHighlighted = highlightWords.includes(cleanWord);

        // Word-specific scroll range
        const wordStart = start + (i / totalWords) * (end - start) * 0.95;
        const wordEnd = wordStart + 0.05 * (end - start);

        return (
          <WordReveal
            key={`${word}-${i}`}
            word={word}
            progress={progress}
            wordStart={wordStart}
            wordEnd={wordEnd}
            isHighlighted={isHighlighted}
          />
        );
      })}
    </p>
  );
}

interface MissionProps {
  lang: Language;
}

export default function Mission({ lang }: MissionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].about;

  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative bg-black text-foreground pt-0 pb-32 md:pb-44 px-8 md:px-28 flex flex-col items-center overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Large Centered Video Loop */}
        <div className="w-full max-w-[600px] md:max-w-[800px] aspect-square rounded-full border border-border/20 overflow-hidden mb-24 relative bg-card/5 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover select-none"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle inside shadow overlay to blend video edges */}
          <div className="absolute inset-0 rounded-full border-2 border-black/30 pointer-events-none" />
        </div>

        {/* Scroll-driven Word Reveal Content */}
        <div className="max-w-4xl flex flex-col items-center">
          {/* Paragraph 1 */}
          <ScrollRevealText
            text={t.paragraph1}
            progress={scrollYProgress}
            range={[0.15, 0.45]}
            highlightWords={t.highlights}
            className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] leading-snug"
          />

          {/* Paragraph 2 */}
          <ScrollRevealText
            text={t.paragraph2}
            progress={scrollYProgress}
            range={[0.45, 0.75]}
            className="text-xl md:text-2xl lg:text-3xl font-medium mt-10 leading-relaxed"
          />
        </div>
      </div>
    </section>
  );
}
