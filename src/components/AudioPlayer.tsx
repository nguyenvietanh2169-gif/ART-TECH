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
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
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

  // Initialize Web Audio graph
  const initAudioGraph = () => {
    const audio = audioRef.current;
    if (!audio || audioContextRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const gain = ctx.createGain();
      const source = ctx.createMediaElementSource(audio);

      source.connect(gain);
      gain.connect(ctx.destination);

      audioContextRef.current = ctx;
      gainNodeRef.current = gain;
      sourceNodeRef.current = source;
    } catch (e) {
      console.error("Failed to initialize Web Audio API:", e);
    }
  };

  // Function to fade volume smoothly
  const fadeVolume = (targetVolume: number, duration: number = 1000) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      clearTimeout(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const audio = audioRef.current;
    const ctx = audioContextRef.current;
    const gainNode = gainNodeRef.current;

    if (!audio) return;

    // Use Web Audio API if available
    if (ctx && gainNode) {
      try {
        const durationSeconds = duration / 1000;
        const currentVal = gainNode.gain.value;

        // Cancel scheduled changes and ramp smoothly
        gainNode.gain.cancelScheduledValues(ctx.currentTime);
        gainNode.gain.setValueAtTime(currentVal, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + durationSeconds);

        if (targetVolume === 0) {
          fadeIntervalRef.current = setTimeout(() => {
            if (gainNode.gain.value <= 0.05) {
              audio.pause();
            }
            fadeIntervalRef.current = null;
          }, duration);
        } else {
          if (audio.paused) {
            audio.play().catch((err) => {
              console.warn("Audio play failed during Web Audio fade-in:", err);
            });
          }
        }
        return;
      } catch (err) {
        console.warn("Web Audio API ramp failed, falling back to interval:", err);
      }
    }

    // Fallback: Interval-based volume fade (HTML5 audio.volume)
    const startVolume = audio.volume;
    const diff = targetVolume - startVolume;
    if (diff === 0) {
      if (targetVolume === 0) {
        audio.pause();
      }
      return;
    }

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

  // Pre-initialize and resume AudioContext on first user interaction (touch or click)
  useEffect(() => {
    const handleGesture = () => {
      initAudioGraph();
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
    };

    window.addEventListener("click", handleGesture, { once: true });
    window.addEventListener("touchstart", handleGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(err => console.log("AudioContext close error:", err));
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;

    if (isPlaying) {
      initAudioGraph();
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }

      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      } else {
        audio.volume = 0;
      }

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
      fadeVolume(0, 1000); // 1s fade-out
    }

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        clearTimeout(fadeIntervalRef.current);
      }
    };
  }, [isPlaying]);

  const handleToggleClick = () => {
    initAudioGraph();
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    onTogglePlay();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[990] flex items-center gap-3">
      {/* Hidden HTML5 Audio Element */}
      <audio ref={audioRef} src="/gensanmaier-gentle-instrumental-1-322812.mp3" preload="auto" />

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
        onClick={handleToggleClick}
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
