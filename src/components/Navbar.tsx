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
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-28 py-4 bg-transparent backdrop-blur-[2px]">
      {/* Left: Logo & Nav Links */}
      <div className="flex items-center gap-10">
        {/* Logo */}
        <a href="#" onClick={(e) => handleScroll(e, "#")} className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-white transition-colors">
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
          <span className="font-rounded font-semibold text-[11px] sm:text-xs tracking-[0.12em] text-foreground/90 uppercase select-none">
            ART&TECH
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
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Social Icons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
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
                className="liquid-glass w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-foreground hover:text-foreground/80 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.a>
            );
          })}
        </div>

        {/* Language Switcher */}
        <motion.button
          onClick={toggleLang}
          className="liquid-glass px-3 sm:px-4 h-8 sm:h-10 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-foreground hover:text-foreground/80 cursor-pointer gap-0.5 sm:gap-1 select-none"
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
