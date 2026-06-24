import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

export default function FinalSection() {
  return (
    <footer
      id="final-section"
      className="relative w-full py-32 px-4 md:px-8 bg-slate-950 flex flex-col items-center justify-center overflow-hidden border-t border-rose-500/5"
    >
      {/* Immersive bottom radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[350px] bg-[radial-gradient(ellipse_at_bottom,rgba(244,63,94,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl text-center space-y-12 flex flex-col items-center relative z-10 select-none">
        
        {/* Floating Heart Ring Icon */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-rose-500/10 rounded-full blur-md"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-rose-500 relative z-10"
          >
            <Heart size={32} fill="currentColor" strokeWidth={1} />
          </motion.div>
        </div>

        {/* Huge dramatic heading */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, type: 'spring', stiffness: 50 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-400 to-purple-500 tracking-wider font-sans drop-shadow-[0_0_20px_rgba(244,63,94,0.35)]"
          >
            I LOVE YOU NAEMA ❤️
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-sm sm:text-base md:text-lg text-rose-100/60 font-light max-w-xl mx-auto font-sans leading-relaxed"
          >
            This website was created especially for you with admiration, care, and heartfelt appreciation.
          </motion.p>
        </div>

        {/* Small floating sparkles around text */}
        <div className="absolute top-1/2 left-4 md:-left-8 text-rose-500/20 animate-bounce">
          <Sparkles size={20} />
        </div>
        <div className="absolute top-1/3 right-4 md:-right-8 text-pink-500/20 animate-pulse">
          <Sparkles size={24} />
        </div>

        {/* Divider */}
        <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent pt-12" />

        {/* Legal and emotional Footer Credit */}
        <div className="space-y-1 pt-6 text-[11px] font-mono tracking-widest text-rose-400/40 uppercase">
          <p>Made With ❤️ For NAEMA</p>
          <p className="text-[9px] opacity-50">All Rights Dedicated To Her Smile</p>
        </div>

      </div>
    </footer>
  );
}
