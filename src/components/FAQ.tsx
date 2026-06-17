import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { translations } from "../utils/translations";
import type { Language } from "../utils/translations";
import { fadeUp } from "../utils/animations";

interface FAQProps {
  lang: Language;
}

interface FAQItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ q, a, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-white/5 py-6">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left gap-4 group focus:outline-none"
      >
        <span className="font-sans font-medium text-base md:text-lg text-foreground/80 group-hover:text-foreground transition-colors tracking-wide">
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground group-hover:text-foreground shrink-0 transition-colors"
        >
          <Plus className="w-5 h-5 stroke-[1.5]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.3, delay: 0.05 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 text-sm text-muted-foreground leading-relaxed font-sans font-light max-w-3xl">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ({ lang }: FAQProps) {
  const t = translations[lang].faq;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq-section" className="relative bg-black text-foreground py-24 md:py-32 px-8 md:px-28 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col">
        {/* Title & Subtitle */}
        <div className="flex flex-col mb-12 md:mb-16">
          <motion.h2
            {...fadeUp(0.1)}
            className="text-4xl md:text-5xl font-medium tracking-[-1.5px] leading-tight mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p
            {...fadeUp(0.2)}
            className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed font-light font-sans"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* FAQ List */}
        <motion.div
          {...fadeUp(0.3)}
          className="border-t border-white/5 flex flex-col"
        >
          {t.list.map((item, idx) => (
            <FAQItem
              key={idx}
              q={item.q}
              a={item.a}
              isOpen={openIdx === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
