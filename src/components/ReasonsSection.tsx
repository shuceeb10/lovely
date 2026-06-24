import React from 'react';
import { motion } from 'motion/react';
import { Smile, Heart, Sparkles, HandHeart, Gem, Crown, Flame, Sun } from 'lucide-react';

interface ReasonCard {
  title: string;
  emoji: string;
  description: string;
  icon: React.ReactNode;
  bgGlow: string;
  borderColor: string;
}

export default function ReasonsSection() {
  const reasons: ReasonCard[] = [
    {
      title: 'Your Beautiful Smile',
      emoji: '😊',
      description: 'Your smile lights up the room and has a magical way of turning any ordinary moment into a beautiful memory.',
      icon: <Smile size={24} className="text-rose-400" />,
      bgGlow: 'group-hover:bg-rose-500/10',
      borderColor: 'hover:border-rose-500/30',
    },
    {
      title: 'Your Kind Heart',
      emoji: '❤️',
      description: 'The pure warmth and love you radiate make the world feel safe, welcoming, and infinitely brighter.',
      icon: <Heart size={24} className="text-pink-400" />,
      bgGlow: 'group-hover:bg-pink-500/10',
      borderColor: 'hover:border-pink-500/30',
    },
    {
      title: 'Your Intelligence',
      emoji: '🌹',
      description: 'Brilliant and deep, your perspectives are inspiring and your wisdom is a guiding light that commands deep respect.',
      icon: <Sparkles size={24} className="text-amber-400" />,
      bgGlow: 'group-hover:bg-amber-500/10',
      borderColor: 'hover:border-amber-500/30',
    },
    {
      title: 'Your Caring Nature',
      emoji: '💕',
      description: 'You protect, heal, and care for those you love, showing selfless thoughtfulness that is rare to find.',
      icon: <HandHeart size={24} className="text-fuchsia-400" />,
      bgGlow: 'group-hover:bg-fuchsia-500/10',
      borderColor: 'hover:border-fuchsia-500/30',
    },
    {
      title: 'Your Honesty',
      emoji: '✨',
      description: 'True, transparent, and completely honest. Your integrity shines and builds a deep, unbreakable trust.',
      icon: <Gem size={24} className="text-emerald-400" />,
      bgGlow: 'group-hover:bg-emerald-500/10',
      borderColor: 'hover:border-emerald-500/30',
    },
    {
      title: 'Your Amazing Personality',
      emoji: '👑',
      description: 'The unique blend of grace, joy, humor, and elegance makes you a crown jewel, completely unforgettable.',
      icon: <Crown size={24} className="text-yellow-400" />,
      bgGlow: 'group-hover:bg-yellow-500/10',
      borderColor: 'hover:border-yellow-500/30',
    },
    {
      title: 'Your Strength',
      emoji: '💪',
      description: 'The graceful resilience with which you overcome life’s hurdles is inspiring and truly admirable.',
      icon: <Flame size={24} className="text-orange-400" />,
      bgGlow: 'group-hover:bg-orange-500/10',
      borderColor: 'hover:border-orange-500/30',
    },
    {
      title: 'The Happiness You Bring',
      emoji: '🌸',
      description: 'Your mere presence is therapeutic, bringing instant happiness, comfort, and a soothing sense of joy.',
      icon: <Sun size={24} className="text-sky-400" />,
      bgGlow: 'group-hover:bg-sky-500/10',
      borderColor: 'hover:border-sky-500/30',
    },
  ];

  return (
    <section
      id="reasons-section"
      className="relative w-full py-24 px-4 md:px-8 bg-slate-950"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            Reasons Why You Are Special
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full"
          />
          <p className="text-sm md:text-base text-rose-200/50 max-w-md mx-auto font-sans">
            Every little thing about you is a reason to celebrate how wonderfully special you are.
          </p>
        </div>

        {/* Bento/Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between space-y-4 cursor-default ${reason.borderColor}`}
            >
              {/* Radial subtle ambient background glow on hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${reason.bgGlow}`} />

              <div className="space-y-4 relative z-10">
                {/* Header with icon and emoji */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 shadow-inner">
                    {reason.icon}
                  </div>
                  <span className="text-2xl filter drop-shadow-sm animate-pulse">{reason.emoji}</span>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-rose-300 transition-colors duration-300 font-sans">
                    {reason.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-100/50 leading-relaxed font-light font-sans group-hover:text-rose-100/70 transition-colors duration-300">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
