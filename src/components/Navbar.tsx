import { motion } from "framer-motion";
import { translations } from "../utils/translations";
import type { Language } from "../utils/translations";

// Custom SVG Icons for Socials to avoid library import inconsistencies
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const ZaloIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M9.5 8.5h4L10 15h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface NavbarProps {
  lang: Language;
  toggleLang: () => void;
}

export default function Navbar({ lang, toggleLang }: NavbarProps) {
  const t = translations[lang].nav;

  const navLinks = [
    { label: t.portfolio, href: "#portfolio-section" },
    { label: t.about, href: "#about-section" },
    { label: t.contact, href: "#contact-section" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-28 py-4 bg-transparent backdrop-blur-[2px]">
      {/* Left: Logo & Nav Links */}
      <div className="flex items-center gap-10">
        {/* Logo */}
        <a href="#" onClick={(e) => handleScroll(e, "#")} className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-full border-2 border-foreground/60 flex items-center justify-center transition-colors group-hover:border-foreground">
            <div className="w-3 h-3 rounded-full border border-foreground/60 transition-colors group-hover:border-foreground" />
          </div>
          <span className="font-bold text-xl tracking-[-1px] text-foreground uppercase select-none">
            ART
            <span className="font-serif italic font-normal text-muted-foreground/80 lowercase mx-0.5">
              &
            </span>
            TECH
          </span>
        </a>

        {/* Center-left Nav links */}
        <div className="hidden md:flex items-center text-sm">
          {navLinks.map((link, index) => (
            <div key={link.label} className="flex items-center">
              <a
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
              {index < navLinks.length - 1 && (
                <span className="text-muted-foreground/35 px-3 select-none">•</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Social Icons & Language Switcher */}
      <div className="flex items-center gap-4">
        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {[
            { icon: InstagramIcon, href: "https://www.instagram.com/vietanhnguyen.raw/", label: "Instagram" },
            { icon: FacebookIcon, href: "https://www.facebook.com/viet.anh.nguyen.291622/", label: "Facebook" },
            { icon: ZaloIcon, href: "https://zalo.me/0329123321", label: "Zalo" },
          ].map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-foreground/80 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            );
          })}
        </div>

        {/* Language Switcher */}
        <motion.button
          onClick={toggleLang}
          className="liquid-glass px-4 h-10 rounded-full flex items-center justify-center text-xs font-mono font-semibold tracking-wider text-foreground hover:text-foreground/80 cursor-pointer gap-1 select-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={lang === "en" ? "text-foreground" : "text-muted-foreground/50"}>EN</span>
          <span className="text-muted-foreground/20">/</span>
          <span className={lang === "vi" ? "text-foreground" : "text-muted-foreground/50"}>VI</span>
        </motion.button>
      </div>
    </nav>
  );
}
