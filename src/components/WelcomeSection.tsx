import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function WelcomeSection() {
  return (
    <section
      id="welcome-section"
      className="relative w-full py-20 px-4 md:px-8 flex flex-col items-center justify-center bg-slate-950/20"
    >
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="relative max-w-2xl w-full mx-auto p-8 md:p-12 rounded-3xl bg-slate-900/50 border border-rose-500/10 backdrop-blur-md shadow-2xl shadow-rose-950/10 flex flex-col items-center text-center space-y-6"
      >
        {/* Sparkle decorative badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold tracking-wider uppercase">
          <Sparkles size={14} className="animate-pulse" />
          A Special Message For You
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
          Dear{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
            NAEMA
          </span>
          ,
        </h2>

        {/* Letter body */}
        <p className="text-base sm:text-lg text-rose-100/80 font-light leading-relaxed font-sans max-w-xl">
          This website is a small gift made especially for you. Every line, every photo, and every detail here was created with love. You are one of the most beautiful blessings in my life and I wanted to create something that would always remind you how special you are.
        </p>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 pt-4 w-full justify-center">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-rose-500/30" />
          <span className="text-rose-500/50 text-sm">❤️</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-rose-500/30" />
        </div>
      </motion.div>
    </section>
  );
}
