import { translations } from "../utils/translations";
import type { Language } from "../utils/translations";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang].footer;

  return (
    <footer className="w-full py-12 px-8 md:px-28 border-t border-border/20 bg-background flex justify-center items-center z-10">
      <div className="text-muted-foreground text-sm text-center">
        {t.copyright}
      </div>
    </footer>
  );
}
