import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "play" | "view">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Position coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth trailing ring animation
  const springConfig = { damping: 30, stiffness: 300, mass: 0.6 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device / mobile screen size
    const checkDevice = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isNarrow = window.innerWidth < 768;
      setIsMobile(isTouch || isNarrow);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], [data-cursor]");
      
      if (interactive) {
        const customType = interactive.getAttribute("data-cursor");
        if (customType === "play") {
          setCursorType("play");
        } else if (customType === "view") {
          setCursorType("view");
        } else {
          setCursorType("pointer");
        }
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile || !isVisible) return null;

  // Render cursor configurations based on type
  const isCustomLabel = cursorType === "play" || cursorType === "view";

  return (
    <>
      {/* 1. Center Tiny Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isCustomLabel ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />

      {/* 2. Outer Trailing Ring */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "play" ? 72 : cursorType === "view" ? 72 : cursorType === "pointer" ? 48 : 28,
          height: cursorType === "play" ? 72 : cursorType === "view" ? 72 : cursorType === "pointer" ? 48 : 28,
          backgroundColor: isCustomLabel ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0)",
          borderColor: isCustomLabel ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.35)",
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 220,
        }}
        className="fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05)]"
      >
        {/* Cursor Label Text */}
        {cursorType === "play" && (
          <span className="text-[10px] tracking-wider text-black font-semibold uppercase font-sans">
            PLAY
          </span>
        )}
        {cursorType === "view" && (
          <span className="text-[10px] tracking-wider text-black font-semibold uppercase font-sans">
            VIEW
          </span>
        )}
      </motion.div>
    </>
  );
}
