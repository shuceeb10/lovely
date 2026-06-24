import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen, Mail, Sparkles } from 'lucide-react';

export default function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="letter-section"
      className="relative w-full py-24 px-4 md:px-8 bg-slate-950/20"
    >
      <div className="max-w-4xl mx-auto space-y-12 flex flex-col items-center">
        {/* Title */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            A Letter From My Heart
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"
          />
          <p className="text-sm md:text-base text-rose-200/50 max-w-md mx-auto font-sans">
            A small token of my deep admiration, care, and heartfelt feelings.
          </p>
        </div>

        {/* Interactive Envelope and Letter Container */}
        <div className="w-full max-w-2xl relative flex flex-col items-center select-none">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED ENVELOPE state */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsOpen(true)}
                className="w-full aspect-[16/10] sm:aspect-[1.6] rounded-3xl p-6 md:p-8 bg-gradient-to-br from-rose-950/60 via-slate-900/90 to-rose-950/50 border border-rose-500/30 backdrop-blur-md shadow-[0_15px_40px_rgba(244,63,94,0.15)] flex flex-col items-center justify-center cursor-pointer hover:border-rose-400 group transition-all duration-500 overflow-hidden"
              >
                {/* Decorative border outlines */}
                <div className="absolute inset-4 rounded-2xl border border-rose-500/10 pointer-events-none group-hover:border-rose-500/20 transition-all duration-500" />
                <div className="absolute inset-5 rounded-2xl border border-dashed border-rose-500/5 pointer-events-none" />

                {/* Sparkling elements */}
                <div className="absolute top-8 left-8 text-rose-500/20 group-hover:text-rose-500/40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Sparkles size={24} />
                </div>
                <div className="absolute bottom-8 right-8 text-pink-500/20 group-hover:text-pink-500/40 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                  <Sparkles size={20} />
                </div>

                <div className="space-y-6 flex flex-col items-center text-center relative z-10">
                  {/* Wax Seal Circle */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-950 border border-white/20 relative group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all duration-500"
                  >
                    <Mail size={32} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                  </motion.div>

                  <div className="space-y-2">
                    <p className="text-sm tracking-widest font-mono text-rose-400/80 group-hover:text-rose-300 transition-colors">
                      FOR NAEMA'S EYES ONLY
                    </p>
                    <p className="text-xs text-rose-300/40 font-light font-sans group-hover:text-rose-300/60 transition-colors">
                      Click to unlock the letter from my heart
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* OPENED LETTER state */
              <motion.div
                key="open-letter"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="w-full rounded-3xl p-8 md:p-12 bg-gradient-to-br from-rose-950/40 via-slate-900/90 to-slate-950 border border-rose-500/20 backdrop-blur-md shadow-2xl relative overflow-hidden"
              >
                {/* Vintage/Premium inner border frame */}
                <div className="absolute inset-4 rounded-2xl border border-rose-500/10 pointer-events-none" />
                <div className="absolute inset-5 rounded-2xl border border-dashed border-rose-500/5 pointer-events-none" />

                {/* Close Button / Fold Back */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 hover:bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:border-rose-500/40 transition-all cursor-pointer text-xs flex items-center gap-1.5 font-medium tracking-wider"
                >
                  <Mail size={14} />
                  <span>Fold Back</span>
                </button>

                {/* Letter Content */}
                <div className="space-y-6 md:space-y-8 font-sans relative z-10 text-left">
                  {/* Letter Header */}
                  <div className="border-b border-rose-500/10 pb-4">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                      My Dear NAEMA,
                      <span className="text-rose-500 animate-pulse">❤️</span>
                    </h3>
                  </div>

                  {/* Letter Paragraphs */}
                  <div className="space-y-4 text-rose-100/80 leading-relaxed font-light text-sm md:text-base">
                    <p>
                      There are people we meet in life who leave a mark on our hearts forever. Your kindness, beauty, and wonderful personality make every moment brighter. Your smile can turn an ordinary day into a special one.
                    </p>
                    <p>
                      You inspire me in ways words cannot fully describe. Every memory we create becomes something I cherish deeply. Thank you for being the incredible person you are.
                    </p>
                    <p>
                      May happiness always surround you, may your dreams come true, and may your beautiful smile never fade.
                    </p>
                  </div>

                  {/* Letter Signature */}
                  <div className="pt-6 border-t border-rose-500/10 flex flex-col items-start space-y-1">
                    <span className="text-xs tracking-wider text-rose-400/60 uppercase font-mono">
                      With admiration and affection,
                    </span>
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-2xl text-rose-500"
                    >
                      ❤️
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
