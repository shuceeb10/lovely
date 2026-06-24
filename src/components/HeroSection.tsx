import React from 'react';
import { motion } from 'motion/react';
import { Heart, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onNextSection: () => void;
}

export default function HeroSection({ onNextSection }: HeroSectionProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-8 py-16 overflow-hidden select-none"
    >
      {/* Soft overlay gradients to frame the typography beautifully */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 pointer-events-none z-10" />

      {/* Decorative large light circles in background */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-rose-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-20 max-w-3xl text-center space-y-8 flex flex-col items-center">
        {/* Floating Heart Icon Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 80,
            delay: 0.2,
          }}
          className="relative w-20 h-20 flex items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20 backdrop-blur-md shadow-lg shadow-rose-500/5"
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-rose-500"
          >
            <Heart size={36} fill="currentColor" strokeWidth={1} />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white font-sans drop-shadow-sm"
          >
            To My Beloved{' '}
            <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">
              NAEMA ❤️
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl text-rose-100/70 font-light leading-relaxed max-w-xl mx-auto font-sans"
          >
            Every moment with you is a beautiful memory, every smile of yours lights up my world.
          </motion.p>
        </div>

        {/* Buttons and call to action */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="pt-6"
        >
          <button
            onClick={onNextSection}
            className="relative group overflow-hidden px-8 py-4 rounded-full font-medium tracking-wide text-white transition-all duration-300 transform active:scale-95 shadow-[0_4px_20px_rgba(244,63,94,0.3)] bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:shadow-[0_4px_30px_rgba(244,63,94,0.55)] cursor-pointer text-base md:text-lg border border-white/10"
          >
            {/* Glossy shine overlay */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            <span className="flex items-center gap-2">
              Open My Heart ❤️
            </span>
          </button>
        </motion.div>
      </div>

      {/* Pulsing down-arrow at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        onClick={onNextSection}
        className="absolute bottom-8 cursor-pointer z-20 text-rose-300/40 hover:text-rose-300/80 transition-colors p-2"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
