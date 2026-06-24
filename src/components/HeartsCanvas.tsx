import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: 'heart' | 'sparkle';
  color: string;
  angle: number;
  spin: number;
}

export default function HeartsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const colors = [
      'rgba(244, 63, 94, 0.6)',   // rose-500
      'rgba(236, 72, 153, 0.5)',  // pink-500
      'rgba(217, 70, 239, 0.4)',  // fuchsia-500
      'rgba(168, 85, 247, 0.4)',  // purple-500
      'rgba(251, 113, 133, 0.5)', // rose-400
      'rgba(253, 164, 186, 0.6)', // rose-300
    ];

    const sparkleColors = [
      'rgba(255, 255, 255, 0.8)',
      'rgba(254, 240, 138, 0.7)', // yellow-100
      'rgba(251, 207, 232, 0.7)', // pink-100
    ];

    const createParticle = (isInitial = false): Particle => {
      const type = Math.random() < 0.35 ? 'heart' : 'sparkle';
      const size = type === 'heart' ? Math.random() * 12 + 6 : Math.random() * 3 + 1;
      const x = Math.random() * canvas.width;
      const y = isInitial ? Math.random() * canvas.height : canvas.height + 20;

      return {
        x,
        y,
        size,
        speedY: -(Math.random() * 1.2 + 0.4),
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        type,
        color: type === 'heart' ? colors[Math.floor(Math.random() * colors.length)] : sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
      };
    };

    // Draw heart path
    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number, angle: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.globalAlpha = opacity;
      c.fillStyle = color;
      c.beginPath();
      
      // Heart path
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // Top left curve
      c.bezierCurveTo(-size / 2, -size / 2, -size, topCurveHeight, 0, size);
      // Top right curve
      c.bezierCurveTo(size, topCurveHeight, size / 2, -size / 2, 0, topCurveHeight);
      
      c.closePath();
      c.fill();
      c.restore();
    };

    // Draw sparkle path
    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      c.save();
      c.globalAlpha = opacity;
      c.fillStyle = color;
      c.shadowBlur = size * 2;
      c.shadowColor = '#fff';
      c.beginPath();
      
      // 4-pointed star
      c.moveTo(x, y - size * 2);
      c.quadraticCurveTo(x, y, x + size * 2, y);
      c.quadraticCurveTo(x, y, x, y + size * 2);
      c.quadraticCurveTo(x, y, x - size * 2, y);
      c.quadraticCurveTo(x, y, x, y - size * 2);
      
      c.closePath();
      c.fill();
      c.restore();
    };

    // Resize observer logic
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        
        // Re-generate some particles based on size
        const count = Math.min(Math.floor((width * height) / 22000), 80);
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push(createParticle(true));
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas.parentElement || document.body);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.spin;

        // Oscillate x speed slightly for a drifting effect
        p.speedX += (Math.random() - 0.5) * 0.05;
        p.speedX = Math.max(-0.8, Math.min(0.8, p.speedX));

        // Render based on type
        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.angle);
        } else {
          // Sparkles can twinkle
          const twinkleOpacity = p.opacity * (0.6 + Math.sin(Date.now() * 0.01 + p.x) * 0.4);
          drawSparkle(ctx, p.x, p.y, p.size, p.color, twinkleOpacity);
        }

        // Reset if particles go off-screen
        if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[index] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      id="hearts-bg-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
