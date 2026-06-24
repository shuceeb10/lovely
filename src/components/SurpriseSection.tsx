import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, X, Volume2 } from 'lucide-react';

interface SurpriseSectionProps {
  onTriggerMusic: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  type: 'spark' | 'heart' | 'confetti';
}

export default function SurpriseSection({ onTriggerMusic }: SurpriseSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Start background romantic music immediately for the surprise
    if (audioRef.current) {
      audioRef.current.volume = 0.9;
      audioRef.current.play().catch((err) => {
        console.warn('Autoplay prevented by browser:', err);
      });
    }
    // Also trigger the main player state if connected
    onTriggerMusic();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Resize Canvas to Full Screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const colors = [
      '#f43f5e', // rose-500
      '#ec4899', // pink-500
      '#d946ef', // fuchsia-500
      '#a855f7', // purple-500
      '#fb7185', // rose-400
      '#fbcfe8', // pink-200
      '#ffffff',
    ];

    // Helper to generate a burst
    const createFirework = (x: number, y: number) => {
      const count = 100 + Math.floor(Math.random() * 50);
      const fireworkColor = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        const particleType = Math.random() < 0.4 ? 'heart' : Math.random() < 0.5 ? 'confetti' : 'spark';
        const size = particleType === 'heart' ? Math.random() * 8 + 4 : Math.random() * 3 + 1;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          color: Math.random() < 0.3 ? colors[Math.floor(Math.random() * colors.length)] : fireworkColor,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.008,
          gravity: 0.06,
          type: particleType,
        });
      }
    };

    // Draw custom heart particle helper
    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(-size / 2, -size / 2, -size, topCurveHeight, 0, size);
      c.bezierCurveTo(size, topCurveHeight, size / 2, -size / 2, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    // Spawn regular random fireworks
    let lastSpawn = 0;
    const spawnInterval = 1200; // ms

    // Animation Loop
    const animate = (timestamp: number) => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.25)'; // slight clear path trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Random trigger
      if (timestamp - lastSpawn > spawnInterval) {
        createFirework(
          Math.random() * (canvas.width - 200) + 100,
          Math.random() * (canvas.height / 2) + 100
        );
        lastSpawn = timestamp;
      }

      // Constantly rise subtle hearts from the bottom
      if (Math.random() < 0.1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -(Math.random() * 3 + 1),
          size: Math.random() * 12 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.005 + 0.002,
          gravity: -0.01,
          type: 'heart',
        });
      }

      // Update and draw particles
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(index, 1);
          return;
        }

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha);
        } else if (p.type === 'confetti') {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size * 2, p.size);
          ctx.restore();
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial blast
    createFirework(canvas.width / 2, canvas.height / 3);
    createFirework(canvas.width / 4, canvas.height / 2);
    createFirework((3 * canvas.width) / 4, canvas.height / 2);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const closeSurprise = () => {
    setIsOpen(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <section
      id="surprise-section"
      className="relative w-full py-24 px-4 md:px-8 bg-slate-950 flex flex-col items-center justify-center select-none"
    >
      {/* Decorative ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-[140px] pointer-events-none" />

      {/* Hidden Audio element for the surprise climax */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
        loop
      />

      <div className="max-w-xl text-center space-y-8 flex flex-col items-center z-10">
        
        {/* Surprise Icon */}
        <div className="p-4 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-lg shadow-rose-950/20">
          <Sparkles size={32} className="animate-pulse" />
        </div>

        {/* Surprise description */}
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">
            Ready For A Surprise?
          </h3>
          <p className="text-sm md:text-base text-rose-200/50 leading-relaxed font-light font-sans">
            Click the heart button below to unlock a magical, romantic celebration crafted with deep affection.
          </p>
        </div>

        {/* Trigger Button */}
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-6 rounded-full border border-rose-500/30 bg-slate-900/60 hover:bg-slate-900 shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-center justify-center gap-3 cursor-pointer text-base md:text-lg text-rose-100 hover:text-white hover:border-rose-500 transition-all duration-300"
        >
          {/* Pulsating background ring */}
          <span className="absolute -inset-1 rounded-full bg-rose-500/10 blur-sm group-hover:bg-rose-500/20 transition-all duration-300 animate-ping pointer-events-none" />
          
          <Heart size={20} fill="currentColor" className="text-rose-500 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-semibold tracking-wide font-sans">Click Here NAEMA ❤️</span>
        </motion.button>
      </div>

      {/* Immersive Surprise Celebration Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden"
          >
            {/* The Climax Celebratory Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

            {/* Close Button */}
            <button
              onClick={closeSurprise}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-900/80 hover:bg-rose-500/20 text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer z-50"
              title="Close surprise"
            >
              <X size={20} />
            </button>

            {/* Immersive Glowing Text Panel */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 80, damping: 15 }}
              className="relative z-20 max-w-xl w-full p-8 md:p-12 rounded-3xl bg-slate-950/70 border border-rose-500/30 backdrop-blur-md shadow-[0_0_50px_rgba(244,63,94,0.3)] text-center space-y-6 flex flex-col items-center"
            >
              {/* Spinning heart ring */}
              <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20 shadow-inner">
                <Heart size={28} fill="currentColor" className="text-rose-500 animate-bounce" />
              </div>

              {/* Glowing title */}
              <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 font-sans tracking-tight drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                NAEMA ❤️
              </h2>

              {/* Central emotional message */}
              <div className="space-y-4">
                <p className="text-xl md:text-2xl font-semibold text-rose-100 font-sans">
                  You Are Truly Special
                </p>
                <p className="text-base md:text-lg text-rose-300/80 font-light leading-relaxed font-sans max-w-md mx-auto">
                  And You Mean More Than Words Can Express.
                </p>
              </div>

              {/* Music playing feedback indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400/60 animate-pulse bg-rose-500/5 px-3 py-1 rounded-full border border-rose-500/10">
                <Volume2 size={12} />
                <span>PLAYING CELEBRATORY MELODY</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
