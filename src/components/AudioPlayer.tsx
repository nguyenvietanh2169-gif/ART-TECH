import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { Language } from "../utils/translations";

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  lang: Language;
}

export default function AudioPlayer({ isPlaying, onTogglePlay, lang }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  const t = {
    en: {
      playing: "Playing background music",
      paused: "Music paused",
      tooltipPlay: "Play music",
      tooltipPause: "Pause music",
    },
    vi: {
      playing: "Đang phát nhạc nền",
      paused: "Đã dừng nhạc",
      tooltipPlay: "Phát nhạc",
      tooltipPause: "Dừng nhạc",
    },
  };

  const currentT = t[lang] || t.en;

  // Function to fade volume smoothly
  const fadeVolume = (targetVolume: number, duration: number = 1000) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const audio = audioRef.current;
    if (!audio) return;

    const startVolume = audio.volume;
    const diff = targetVolume - startVolume;
    if (diff === 0) return;

    const stepCount = 20;
    const stepDuration = duration / stepCount;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const nextVolume = startVolume + diff * (currentStep / stepCount);
      audio.volume = Math.max(0, Math.min(1, nextVolume));

      if (currentStep >= stepCount) {
        audio.volume = targetVolume;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        if (targetVolume === 0) {
          audio.pause();
        }
      }
    }, stepDuration);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set loop to true
    audio.loop = true;

    if (isPlaying) {
      // Fade in to 0.4 volume
      audio.volume = 0;
      audio.play()
        .then(() => {
          fadeVolume(0.4, 1500); // 1.5s fade-in
        })
        .catch((err) => {
          console.warn("Playback blocked by browser or failed to load:", err);
          if (isPlaying) {
            onTogglePlay();
          }
        });
    } else {
      // Fade out and pause
      fadeVolume(0, 1000); // 1s fade-out
    }

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-[990] flex items-center gap-3">
      {/* Hidden HTML5 Audio Element */}
      <audio ref={audioRef} src="/night-lounge.mp3" preload="auto" />

      {/* Floating Info Tooltip */}
      <div
        className={`px-3 py-1.5 rounded-lg text-[10px] tracking-wider uppercase font-semibold transition-all duration-500 bg-black/60 border border-white/5 backdrop-blur-md text-white/60 select-none hidden md:block ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        {isPlaying ? currentT.tooltipPause : currentT.tooltipPlay}
      </div>

      {/* Elegant Glassmorphic Button */}
      <button
        onClick={onTogglePlay}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={isPlaying ? currentT.tooltipPause : currentT.tooltipPlay}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden transition-all duration-500 border bg-black/30 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.4)] cursor-pointer ${
          isPlaying
            ? "border-white/10 hover:border-white/30 text-white/50 hover:text-white"
            : "border-white/20 hover:border-white/50 text-white/80 hover:text-white"
        }`}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Dynamic visual representation */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {isPlaying ? (
            <div className="flex items-center gap-[3px] h-4 w-5 justify-center">
              {/* Inject inline style for keyframe animation to keep it self-contained */}
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes soundwave {
                  0% { transform: scaleY(0.25); }
                  100% { transform: scaleY(1); }
                }
                .wave-bar {
                  animation: soundwave 0.8s ease-in-out infinite alternate;
                  transform-origin: bottom;
                }
              `}} />
              <span className="wave-bar w-[2px] h-3.5 bg-current rounded-full" style={{ animationDelay: "0.15s" }} />
              <span className="wave-bar w-[2px] h-3 bg-current rounded-full" style={{ animationDelay: "0.4s" }} />
              <span className="wave-bar w-[2px] h-4 bg-current rounded-full" style={{ animationDelay: "0s" }} />
              <span className="wave-bar w-[2px] h-2.5 bg-current rounded-full" style={{ animationDelay: "0.25s" }} />
            </div>
          ) : (
            <Play size={16} fill="currentColor" className="translate-x-[1px] transition-transform duration-300 group-hover:scale-110" />
          )}
        </div>
      </button>
    </div>
  );
}
