import React, { useEffect, useRef } from 'react';

// Simple floating particles animation that follows mouse movement
const NUM_PARTICLES = 18;
const COLORS = ['#1595b6', '#61dafb', '#8cc84b', '#fff', '#b0b2c3'];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const FloatingParticles = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    // Initialize particles
    particles.current = Array.from({ length: NUM_PARTICLES }, () => ({
      x: randomBetween(0, window.innerWidth),
      y: randomBetween(0, window.innerHeight),
      r: randomBetween(12, 32),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      dx: randomBetween(-0.2, 0.2),
      dy: randomBetween(-0.2, 0.2),
      float: randomBetween(0.5, 1.5),
    }));

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const draw = () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.current.forEach((p, i) => {
        // Move particles slightly towards mouse
        p.x += (mouse.current.x - p.x) * 0.003 * p.float + p.dx;
        p.y += (mouse.current.y - p.y) * 0.003 * p.float + p.dy;
        // Wrap around screen
        if (p.x < -p.r) p.x = window.innerWidth + p.r;
        if (p.x > window.innerWidth + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = window.innerHeight + p.r;
        if (p.y > window.innerHeight + p.r) p.y = -p.r;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color + '55'; // semi-transparent
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
      }}
      width={window.innerWidth}
      height={window.innerHeight}
      aria-hidden="true"
    />
  );
};

export default FloatingParticles;
