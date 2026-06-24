import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageCircle, Heart, Star } from 'lucide-react';

interface TimelineEvent {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function LoveStorySection() {
  const events: TimelineEvent[] = [
    {
      title: 'The Unexpected Beginning',
      description: 'Sometimes the most beautiful stories begin unexpectedly. Meeting you was a turning point that changed everything for the better.',
      icon: <Sparkles size={18} />,
      color: 'from-rose-500 to-pink-500',
    },
    {
      title: 'Connecting Hearts',
      description: 'Every conversation, every late-night exchange, and every shared joke brought a sense of peace, happiness, and profound inspiration into my life.',
      icon: <MessageCircle size={18} />,
      color: 'from-pink-500 to-purple-500',
    },
    {
      title: 'Treasured Moments',
      description: 'Every single smile of yours, and every shared moment we have created together has become a treasured memory deeply rooted in my heart.',
      icon: <Heart size={18} />,
      color: 'from-purple-500 to-fuchsia-500',
    },
    {
      title: 'Our Unwritten Chapters',
      description: 'This story continues to grow, and every single chapter becomes more beautiful because of you. Excited for all our beautiful tomorrows.',
      icon: <Star size={18} />,
      color: 'from-fuchsia-500 to-rose-500',
    },
  ];

  return (
    <section
      id="story-section"
      className="relative w-full py-24 px-4 md:px-8 bg-slate-950/40 overflow-hidden"
    >
      {/* Decorative gradients */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-rose-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            Our Story ❤️
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-rose-500 to-purple-500 mx-auto rounded-full"
          />
          <p className="text-sm md:text-base text-rose-200/50 max-w-md mx-auto">
            A beautiful journey filled with happiness, inspiration, and shared smiles.
          </p>
        </div>

        {/* Story Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-slate-900/40 border border-rose-500/10 backdrop-blur-md text-center max-w-2xl mx-auto space-y-4 shadow-xl"
        >
          <p className="text-base sm:text-lg text-rose-100/90 font-light leading-relaxed font-sans italic">
            "Meeting you brought happiness, peace, and inspiration into my life. Every conversation, every smile, and every shared moment became a treasured memory. This story continues to grow, and every chapter becomes more beautiful because of you."
          </p>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical central path line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-rose-500/80 via-pink-500/40 to-purple-500/20 -translate-x-1/2" />

          <div className="space-y-12">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } items-start md:items-center relative`}
                >
                  {/* Bullet Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <motion.div
                      whileInView={{ scale: [0.8, 1.2, 1] }}
                      viewport={{ once: true }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center text-white shadow-lg shadow-rose-500/20 border-2 border-slate-950`}
                    >
                      {event.icon}
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div className="w-full md:w-[45%] pl-16 md:pl-0">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6 }}
                      className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-white/5 shadow-xl hover:border-rose-500/20 hover:bg-slate-900/80 transition-all group backdrop-blur-sm"
                    >
                      <h3 className="text-lg md:text-xl font-bold text-white font-sans flex items-center gap-2">
                        {event.title}
                      </h3>
                      <p className="mt-3 text-sm md:text-base text-rose-100/60 font-light leading-relaxed font-sans">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden md:block w-[10%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
