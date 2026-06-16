import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";

export default function Solution() {
  return (
    <section
      id="exhibitions-section"
      className="relative bg-black py-20 border-t border-border/30 px-8 md:px-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* aspect-[3/1] Video */}
        <motion.div
          {...fadeUp(0.2)}
          className="w-full aspect-[3/1] rounded-2xl overflow-hidden border border-border/20 shadow-2xl relative bg-card/5"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle vignette/fade edge overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
