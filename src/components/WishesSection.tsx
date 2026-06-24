import React from 'react';
import { motion } from 'motion/react';
import { Gift, Heart, Sparkles, Smile, Compass, Flame } from 'lucide-react';

interface WishCard {
  text: string;
  icon: React.ReactNode;
  bgGlow: string;
}

export default function WishesSection() {
  const wishes: WishCard[] = [
    {
      text: 'May your life always be filled with happiness.',
      icon: <Gift className="text-rose-400" size={24} />,
      bgGlow: 'from-rose-500/10 to-transparent',
    },
    {
      text: 'May your dreams become reality.',
      icon: <Sparkles className="text-pink-400" size={24} />,
      bgGlow: 'from-pink-500/10 to-transparent',
    },
    {
      text: 'May success follow you everywhere.',
      icon: <Compass className="text-purple-400" size={24} />,
      bgGlow: 'from-purple-500/10 to-transparent',
    },
    {
      text: 'May your smile never fade.',
      icon: <Smile className="text-amber-400" size={24} />,
      bgGlow: 'from-amber-500/10 to-transparent',
    },
    {
      text: 'May peace and joy always be with you.',
      icon: <Heart className="text-fuchsia-400" size={24} />,
      bgGlow: 'from-fuchsia-500/10 to-transparent',
    },
  ];

  return (
    <section
      id="wishes-section"
      className="relative w-full py-24 px-4 md:px-8 bg-slate-950/20 overflow-hidden"
    >
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Heading */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            My Wishes For You
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"
          />
          <p className="text-sm md:text-base text-rose-200/50 max-w-md mx-auto font-sans">
            My most authentic and heartfelt prayers for your path ahead.
          </p>
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {wishes.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`relative overflow-hidden p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between space-y-6 hover:border-rose-500/20 group cursor-default shadow-lg`}
            >
              {/* Highlight background radial overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${wish.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              {/* Decorative sparkle in card background */}
              <div className="absolute top-2 right-2 text-rose-500/5 group-hover:text-rose-500/10 pointer-events-none select-none">
                <Heart size={48} fill="currentColor" strokeWidth={0} />
              </div>

              {/* Icon */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 shadow-inner self-start relative z-10">
                {wish.icon}
              </div>

              {/* Wish text */}
              <p className="text-sm sm:text-base text-rose-100/70 font-light leading-relaxed font-sans relative z-10 group-hover:text-white transition-colors duration-300">
                "{wish.text}"
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
