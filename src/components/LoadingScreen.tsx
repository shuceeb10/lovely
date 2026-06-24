import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Increment progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25); // ~2.5 seconds total

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small delay before transition
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center p-6 text-center select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Decorative radial ambient light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.15)_0%,transparent_70%)] pointer-events-none" />

          {/* Animated Heart Group */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Pulsating Glow 1 */}
            <motion.div
              className="absolute w-24 h-24 bg-rose-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Pulsating Glow 2 */}
            <motion.div
              className="absolute w-16 h-16 bg-pink-500/30 rounded-full blur-lg"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.8, 0.3, 0.8],
              }}
              transition={{
                duration: 1.5,
                delay: 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Glowing Center Heart */}
            <motion.div
              className="relative z-10 text-rose-500 cursor-default"
              animate={{
                scale: [1, 1.22, 1],
                filter: ['drop-shadow(0 0 10px rgba(244,63,94,0.6))', 'drop-shadow(0 0 25px rgba(244,63,94,0.9))', 'drop-shadow(0 0 10px rgba(244,63,94,0.6))'],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart size={64} fill="currentColor" strokeWidth={1} />
            </motion.div>
          </div>

          {/* Loading Text */}
          <motion.div
            className="mt-8 space-y-3 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-xl md:text-2xl font-semibold tracking-wide text-rose-100 font-sans">
              Preparing Something Special
            </h1>
            <p className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 font-sans">
              For NAEMA ❤️
            </p>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="mt-8 w-64 h-1.5 bg-slate-900/80 rounded-full overflow-hidden border border-rose-500/10 backdrop-blur-md relative z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Progress Percent Text */}
          <motion.span
            className="mt-2 text-xs font-mono text-rose-300/40 tracking-widest z-10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {progress}% COMPLETED
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
