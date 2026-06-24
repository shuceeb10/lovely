import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function QuotesSection() {
  const quotes = [
    'Every love story is beautiful, but ours is my favorite.',
    'You are my today and all of my tomorrows.',
    'Your smile is the sunshine of my life.',
    'In a world full of people, my heart found you.',
    'You make ordinary moments feel magical.',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds autoplay
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
    resetTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
    resetTimer();
  };

  const handleDotClick = (idx: number) => {
    setCurrentIndex(idx);
    resetTimer();
  };

  return (
    <section
      id="quotes-section"
      className="relative w-full py-24 px-4 md:px-8 bg-slate-950 overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900/60 to-slate-950/80 border border-rose-500/10 backdrop-blur-md rounded-3xl p-10 md:p-14 text-center space-y-8 shadow-2xl overflow-hidden min-h-[280px] flex flex-col justify-center items-center">
          
          {/* Faded Large Quote Icon Background */}
          <div className="absolute -top-4 -left-4 text-rose-500/5 select-none pointer-events-none">
            <Quote size={160} strokeWidth={1} />
          </div>
          <div className="absolute -bottom-10 -right-10 text-rose-500/5 rotate-180 select-none pointer-events-none">
            <Quote size={160} strokeWidth={1} />
          </div>

          {/* Quotation Icon header */}
          <div className="p-3 rounded-full bg-rose-500/10 text-rose-400 relative z-10">
            <Quote size={28} />
          </div>

          {/* Slide Quote Text with Transition */}
          <div className="relative w-full overflow-hidden flex-grow flex items-center justify-center min-h-[100px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -15 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="text-xl sm:text-2xl md:text-3xl font-light text-rose-100/90 leading-relaxed font-sans"
              >
                "{quotes[currentIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Quick Manual Arrows */}
          <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-slate-950/80 hover:bg-rose-500/20 text-rose-300 border border-white/5 backdrop-blur-md transition-all active:scale-95 pointer-events-auto cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-slate-950/80 hover:bg-rose-500/20 text-rose-300 border border-white/5 backdrop-blur-md transition-all active:scale-95 pointer-events-auto cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Indicator Dot Navigation */}
          <div className="flex items-center gap-2.5 pt-4 relative z-10">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-gradient-to-r from-rose-500 to-pink-500' : 'w-2.5 bg-rose-500/20 hover:bg-rose-500/40'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
