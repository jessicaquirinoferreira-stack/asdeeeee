import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
  logoUrl: string;
}

interface ParticleNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  alpha: number;
  pulseOffset: number;
  isWireframe: boolean;
  cluster: 'cortex' | 'temporal' | 'frontal' | 'occipital' | 'stem' | 'core';
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [phase, setPhase] = useState(0); // 0: Start, 1: Neural Ignite, 2: Expanding Synapses, 3: Full Emergence

  useEffect(() => {
    // 6 seconds total duration
    const totalDuration = 6000;
    const intervalTime = 30;
    const stepIncrement = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + stepIncrement;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    const p1 = setTimeout(() => setPhase(1), 400);  // Ignite neural mesh
    const p2 = setTimeout(() => setPhase(2), 1500); // Expanding waves
    const p3 = setTimeout(() => setPhase(3), 2800); // Reveal typography
    const p4 = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 600);
    }, 5400);

    return () => {
      clearInterval(timer);
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(p4);
    };
  }, [onComplete]);

  // Particle Canvas Simulation for the Free Floating Triangle Brain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let particles: ParticleNode[] = [];

    const colors = [
      '#ffb829', // Saffron gold
      '#fbbf24', // Amber
      '#8052ff', // Electric iris
      '#9333ea', // Violet
      '#15846e', // Verdant
      '#06b6d4', // Cyan
      '#ffffff', // White
      '#fcd34d', // Light gold
      '#c084fc', // Lilac
    ];

    // Brain boundary checking function (lateral profile representation)
    const isInsideBrain = (nx: number, ny: number): { inside: boolean; cluster: ParticleNode['cluster'] } => {
      // (nx, ny) in range [-1.1, 1.1]
      // Main cerebral mass
      const dx1 = nx;
      const dy1 = ny + 0.1;
      const r1 = (dx1 * dx1) / 0.85 + (dy1 * dy1) / 0.55;

      // Frontal lobe expansion (left side)
      const dxFront = nx + 0.45;
      const dyFront = ny + 0.15;
      const rFront = (dxFront * dxFront) / 0.35 + (dyFront * dyFront) / 0.25;

      // Occipital / Visual cortex (right side back)
      const dxOcc = nx - 0.45;
      const dyOcc = ny + 0.05;
      const rOcc = (dxOcc * dxOcc) / 0.35 + (dyOcc * dyOcc) / 0.3;

      // Cerebellum & Stem (bottom right)
      const dxCereb = nx - 0.35;
      const dyCereb = ny - 0.45;
      const rCereb = (dxCereb * dxCereb) / 0.2 + (dyCereb * dyCereb) / 0.12;

      // Temporal lobe (bottom center-left)
      const dxTemp = nx + 0.1;
      const dyTemp = ny - 0.25;
      const rTemp = (dxTemp * dxTemp) / 0.25 + (dyTemp * dyTemp) / 0.12;

      // Exclude empty bottom-left indent
      if (nx < -0.3 && ny < -0.35) {
        return { inside: false, cluster: 'stem' };
      }

      if (r1 <= 1.05 || rFront <= 0.95 || rOcc <= 0.95 || rCereb <= 0.9 || rTemp <= 0.95) {
        if (rCereb <= 0.9) return { inside: true, cluster: 'stem' };
        if (dxOcc > 0.2) return { inside: true, cluster: 'occipital' };
        if (dxFront < -0.2) return { inside: true, cluster: 'frontal' };
        if (dyTemp < 0 && Math.abs(dxTemp) < 0.3) return { inside: true, cluster: 'temporal' };
        if (Math.hypot(nx, ny) < 0.25) return { inside: true, cluster: 'core' };
        return { inside: true, cluster: 'cortex' };
      }

      return { inside: false, cluster: 'cortex' };
    };

    const initParticles = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      particles = [];
      const particleCount = width < 640 ? 550 : 950;
      const scale = Math.min(width * 0.42, height * 0.42);
      const cx = width / 2;
      const cy = height * 0.44;

      let attempts = 0;
      while (particles.length < particleCount && attempts < 10000) {
        attempts++;
        const nx = (Math.random() - 0.5) * 2.2;
        const ny = (Math.random() - 0.5) * 1.8;
        const check = isInsideBrain(nx, ny);

        if (check.inside) {
          const baseX = cx + nx * scale;
          const baseY = cy - ny * scale; // invert Y for canvas
          
          // Color distribution mirroring the uploaded photo:
          // Gold & amber prominent on outer perimeter and frontal/bottom,
          // Electric violet and cyan on upper cortex and core,
          // White sparkling prisms throughout the visual path.
          let col = colors[Math.floor(Math.random() * colors.length)];
          if (check.cluster === 'occipital') {
            col = Math.random() > 0.4 ? '#8052ff' : (Math.random() > 0.5 ? '#ffb829' : '#ffffff');
          } else if (check.cluster === 'stem') {
            col = Math.random() > 0.3 ? '#ffb829' : '#15846e';
          } else if (check.cluster === 'core') {
            col = Math.random() > 0.3 ? '#ffffff' : '#8052ff';
          }

          particles.push({
            x: baseX + (Math.random() - 0.5) * 12,
            y: baseY + (Math.random() - 0.5) * 12,
            baseX,
            baseY,
            size: Math.random() * (width < 640 ? 4.5 : 6.5) + 2.5,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02,
            color: col,
            alpha: Math.random() * 0.6 + 0.35,
            pulseOffset: Math.random() * Math.PI * 2,
            isWireframe: Math.random() > 0.3, // mix of filled and crisp wireframe triangles
            cluster: check.cluster,
          });
        }
      }
    };

    initParticles();
    window.addEventListener('resize', initParticles);

    // Draw an equilateral/sharp geometric triangle
    const drawTriangle = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      color: string,
      alpha: number,
      wireframe: boolean
    ) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(angle);
      pCtx.beginPath();

      const h = size * 1.15;
      pCtx.moveTo(0, -h * 0.66);
      pCtx.lineTo(size * 0.6, h * 0.34);
      pCtx.lineTo(-size * 0.6, h * 0.34);
      pCtx.closePath();

      pCtx.globalAlpha = Math.max(0, Math.min(1, alpha));
      if (wireframe) {
        pCtx.strokeStyle = color;
        pCtx.lineWidth = 1.2;
        pCtx.stroke();
      } else {
        pCtx.fillStyle = color;
        pCtx.fill();
      }
      pCtx.restore();
    };

    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.44;
      const scale = Math.min(width * 0.42, height * 0.42);

      // 1. Draw subtle neural synaptic links between neighboring triangle nodes
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i += 4) {
        const p1 = particles[i];
        for (let j = i + 1; j < Math.min(i + 8, particles.length); j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 28) {
            const linkAlpha = (1 - dist / 28) * 0.25 * p1.alpha;
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = linkAlpha;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Render all brain triangle particles with organic micro-drift & breathing wave
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Harmonic wave oscillation
        const wave = Math.sin(elapsed * 1.8 + p.pulseOffset);
        const breath = Math.sin(elapsed * 0.8) * 4;
        
        // Expanding radial wave ripples from visual core
        const distFromCenter = Math.hypot(p.baseX - cx, p.baseY - cy);
        const ripple = Math.sin(elapsed * 3.5 - distFromCenter * 0.03) * 3;

        p.rotation += p.rotSpeed;
        p.x = p.baseX + Math.cos(elapsed + p.pulseOffset) * 2 + (p.baseX - cx) * 0.015 * breath;
        p.y = p.baseY + Math.sin(elapsed * 1.2 + p.pulseOffset) * 2 + (p.baseY - cy) * 0.015 * breath;

        const dynamicSize = Math.max(1, p.size + wave * 0.8 + (ripple > 1.5 ? 1 : 0));
        const dynamicAlpha = Math.max(0.15, Math.min(0.95, p.alpha + wave * 0.2));

        drawTriangle(
          ctx,
          p.x,
          p.y,
          dynamicSize,
          p.rotation,
          p.color,
          dynamicAlpha,
          p.isWireframe
        );
      }

      // 3. Central Glowing Neuro-Visual Focus (Olho / Núcleo Visual dentro do cérebro de triângulos)
      const corePulse = Math.sin(elapsed * 2.5);
      const coreX = cx - scale * 0.05;
      const coreY = cy - scale * 0.02;

      // Radiant Core Halo
      const coreGrad = ctx.createRadialGradient(coreX, coreY, 2, coreX, coreY, 65 + corePulse * 10);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      coreGrad.addColorStop(0.3, 'rgba(128, 82, 255, 0.45)');
      coreGrad.addColorStop(0.7, 'rgba(255, 184, 41, 0.2)');
      coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = coreGrad;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 70 + corePulse * 10, 0, Math.PI * 2);
      ctx.fill();

      // Sparkling diamond eye glint in the center
      drawTriangle(ctx, coreX, coreY, 14 + corePulse * 2, elapsed * 0.5, '#ffffff', 0.95, false);
      drawTriangle(ctx, coreX, coreY, 20 + corePulse * 3, -elapsed * 0.5, '#ffb829', 0.8, true);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', initParticles);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-white text-slate-900 transition-all duration-700 ease-out overflow-hidden select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105 blur-sm' : 'opacity-100'
      }`}
    >
      {/* Dynamic Background Atmospheric Beams */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Soft Multi-color Ambient Radial Blur */}
        <div className="absolute w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] bg-gradient-to-tr from-[#8052ff]/12 via-[#ffb829]/12 to-[#15846e]/12 rounded-full blur-[100px] animate-pulse duration-1000"></div>

        {/* Expanding Subtle Wave Rings */}
        <div className={`absolute w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full border border-[#8052ff]/20 transition-all duration-1000 ${
          phase >= 2 ? 'animate-ping opacity-35' : 'opacity-0 scale-50'
        }`}></div>
        <div className={`absolute w-[540px] sm:w-[720px] h-[540px] sm:h-[720px] rounded-full border border-[#ffb829]/25 transition-all duration-1000 ${
          phase >= 2 ? 'scale-110 opacity-40 animate-pulse' : 'opacity-0 scale-75'
        }`}></div>
      </div>

      {/* Main Free Floating Canvas Particle Brain (NO CIRCLE, NO BOX, TOTALLY FREE) */}
      <div className="relative w-full h-[62vh] sm:h-[68vh] flex items-center justify-center z-10">
        <canvas
          ref={canvasRef}
          className={`w-full h-full transform transition-all duration-1000 ease-out ${
            phase >= 1 ? 'scale-100 opacity-100' : 'scale-85 opacity-0'
          }`}
          style={{
            filter: phase >= 2 ? 'drop-shadow(0 15px 35px rgba(128, 82, 255, 0.18))' : 'none'
          }}
        />
      </div>

      {/* Bottom Section: Typography 'Estimulação Visual' & Progress */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-lg pb-10 space-y-4">
        
        {/* Typography Reveal */}
        <div className="space-y-1.5 transition-all duration-700">
          <h1
            className={`text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-slate-900 transition-all duration-1000 ${
              phase >= 3
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-6 opacity-0 scale-95'
            }`}
          >
            <span>Estimulação</span>{' '}
            <span className="bg-gradient-to-r from-[#8052ff] via-[#6e3df0] to-[#15846e] bg-clip-text text-transparent">
              Visual
            </span>
          </h1>

          <p
            className={`text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-slate-500 transition-all duration-1000 ${
              phase >= 3
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            DARLENE KLOSTER • NEUROVISÃO
          </p>

          {/* Dynamic Expanding Glowing Line */}
          <div className="flex justify-center pt-2">
            <div
              className={`h-1 rounded-full bg-gradient-to-r from-[#8052ff] via-[#ffb829] to-[#15846e] transition-all duration-1000 ${
                phase >= 3 ? 'w-48 opacity-100' : 'w-0 opacity-0'
              }`}
            ></div>
          </div>
        </div>

        {/* Minimalist 6-Second Smooth Progress Bar */}
        <div className="w-64 max-w-[80vw] space-y-1.5 pt-2">
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200/80">
            <div
              className="h-full bg-gradient-to-r from-[#8052ff] via-[#ffb829] to-[#15846e] transition-all duration-75 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[10.5px] text-slate-400 font-semibold px-1">
            <span>Iniciando experiência</span>
            <span>{Math.min(100, Math.round(progress))}%</span>
          </div>
        </div>

      </div>

      {/* Discrete Skip Button on Top-Right */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-30 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-105"
      >
        <span>Pular</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
