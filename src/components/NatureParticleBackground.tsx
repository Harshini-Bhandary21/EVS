import React, { useEffect, useRef } from "react";

interface Spore {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  angle: number;
  swaySpeed: number;
  swayRange: number;
  opacity: number;
  color: string;
}

export default function NatureParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let spores: Spore[] = [];
    const count = 75;

    // Detect if dark theme is active
    const isDarkTheme = () => document.documentElement.classList.contains("dark");

    const getParticleColor = () => {
      // Dark mode: vibrant glowing emerald and mint. Light mode: soft herbal greens.
      const darkColors = [
        "rgba(34, 197, 94, ",   // Green-500
        "rgba(16, 185, 129, ",  // Emerald-500
        "rgba(132, 204, 22, "   // Lime-500
      ];
      const lightColors = [
        "rgba(21, 128, 61, ",   // Forest Green
        "rgba(5, 150, 105, ",   // Emerald Deep
        "rgba(101, 163, 13, "   // Lime Deep
      ];
      const selectedSet = isDarkTheme() ? darkColors : lightColors;
      return selectedSet[Math.floor(Math.random() * selectedSet.length)];
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSpores();
    };

    const initSpores = () => {
      spores = [];
      for (let i = 0; i < count; i++) {
        spores.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1.2,
          speedY: -(Math.random() * 0.4 + 0.15),
          angle: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.015 + 0.005,
          swayRange: Math.random() * 25 + 8,
          opacity: Math.random() * 0.35 + 0.15,
          color: getParticleColor()
        });
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < spores.length; i++) {
        const p = spores[i];

        // Update Spores
        p.y += p.speedY;
        p.angle += p.swaySpeed;
        
        // Sway movement horizontally
        let currentX = p.x + Math.sin(p.angle) * p.swayRange;

        // Mouse interaction: push particles gently away
        if (mx !== null && my !== null) {
          const dx = currentX - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const activeRadius = 130;

          if (dist < activeRadius) {
            const force = (activeRadius - dist) / activeRadius;
            const angleToMouse = Math.atan2(dy, dx);
            
            // Push vector
            currentX += Math.cos(angleToMouse) * force * 4.5;
            p.y += Math.sin(angleToMouse) * force * 4.5;
          }
        }

        // Boundary checks
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        // Draw Spore Spore
        ctx.beginPath();
        // Leaf style drawing (tiny ellipse or circle)
        ctx.arc(currentX, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.shadowBlur = isDarkTheme() ? 8 : 0;
        ctx.shadowColor = isDarkTheme() ? "rgba(34, 197, 94, 0.4)" : "transparent";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
