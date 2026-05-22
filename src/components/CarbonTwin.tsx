import React, { useRef, useEffect, useState } from "react";
import type { EnvironmentalMetrics } from "../data/cities";
import { Leaf, Flame, TreePine, Timer, Building2, Car, ShieldAlert } from "lucide-react";

interface CarbonTwinProps {
  metrics: EnvironmentalMetrics;
  cityName: string;
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  size: number;
  alpha: number;
  color: string;
  state: "carbon" | "oxygen";
  progress: number;
}

export default function CarbonTwin({ metrics, cityName }: CarbonTwinProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [countdown, setCountdown] = useState({ years: 0, days: 0, hours: 0, seconds: 0 });

  // Compute countdown to carbon neutrality target year
  useEffect(() => {
    const calculateCountdown = () => {
      const currentYear = new Date().getFullYear();
      const targetYear = metrics.carbonNeutralityTargetYear;
      
      if (targetYear <= currentYear) {
        setCountdown({ years: 0, days: 0, hours: 0, seconds: 0 });
        return;
      }
      
      const yearsDiff = targetYear - currentYear - 1;
      const futureDate = new Date(`January 1, ${targetYear} 00:00:00`);
      const now = new Date();
      const currentEnd = new Date(`December 31, ${currentYear} 23:59:59`);
      const diffMs = currentEnd.getTime() - now.getTime();
      
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setCountdown({ years: yearsDiff, days, hours, seconds });
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [metrics]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = 460;
    let height = canvas.height = 240;

    const nodes = {
      industry: { x: 50, y: 160, label: "Industrial Area", icon: Flame, color: "#8b5cf6" },
      vehicles: { x: 150, y: 70, label: "Transit Corridor", icon: Car, color: "#3b82f6" },
      buildings: { x: 260, y: 160, label: "Commercial Zone", icon: Building2, color: "#8b5cf6" },
      forest: { x: 380, y: 100, label: "Forest & Canopy Cover", icon: TreePine, color: "#10b981" }
    };

    let particles: Particle[] = [];
    let animId: number;

    const createParticle = (sourceKey: "industry" | "vehicles" | "buildings") => {
      const source = nodes[sourceKey];
      const target = nodes.forest;
      
      return {
        x: source.x + (Math.random() - 0.5) * 20,
        y: source.y + (Math.random() - 0.5) * 10,
        targetX: target.x,
        targetY: target.y,
        speed: 0.005 + Math.random() * 0.005,
        size: 2 + Math.random() * 2,
        alpha: 1.0,
        color: sourceKey === "industry" ? "#8b5cf6" : sourceKey === "vehicles" ? "#3b82f6" : "#8b5cf6",
        state: "carbon" as const,
        progress: 0
      };
    };

    // Pre-populate particles
    for (let i = 0; i < 20; i++) {
      const keys: Array<"industry" | "vehicles" | "buildings"> = ["industry", "vehicles", "buildings"];
      particles.push(createParticle(keys[Math.floor(Math.random() * keys.length)]));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines (subtle & elegant)
      ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
      ctx.lineWidth = 1;
      const gSize = 20;
      for (let x = 0; x < width; x += gSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw elegant dashed pathways
      ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.15;
      ctx.setLineDash([4, 4]);
      
      ctx.beginPath();
      ctx.moveTo(nodes.industry.x, nodes.industry.y);
      ctx.lineTo(nodes.forest.x, nodes.forest.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(nodes.vehicles.x, nodes.vehicles.y);
      ctx.lineTo(nodes.forest.x, nodes.forest.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(nodes.buildings.x, nodes.buildings.y);
      ctx.lineTo(nodes.forest.x, nodes.forest.y);
      ctx.stroke();

      ctx.setLineDash([]); // Reset
      ctx.globalAlpha = 1.0;

      // Draw Nodes
      Object.entries(nodes).forEach(([key, node]) => {
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Inner core
        ctx.fillStyle = "#1e293b";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Label annotation
        ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
        ctx.font = "bold 9px 'Inter', sans-serif";
        ctx.fillText(node.label, node.x - 36, node.y + 20);
      });

      // Animate and render Carbon flow particles
      particles.forEach((p, idx) => {
        p.progress += p.speed;

        if (p.progress >= 1.0) {
          const keys: Array<"industry" | "vehicles" | "buildings"> = ["industry", "vehicles", "buildings"];
          particles[idx] = createParticle(keys[Math.floor(Math.random() * keys.length)]);
          return;
        }

        const currentX = p.x + (p.targetX - p.x) * p.progress;
        const currentY = p.y + (p.targetY - p.y) * p.progress;

        if (p.progress > 0.70 && p.state === "carbon") {
          p.state = "oxygen";
          p.color = "#10b981";
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Sequestration efficiency status
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 9px 'Inter', sans-serif";
      ctx.fillText("Carbon Absorption Active", 295, 25);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [metrics]);

  const carbonRatio = Math.round((metrics.carbonAbsorbed / metrics.carbonEmissions) * 100);

  return (
    <div className="hud-panel p-6 flex flex-col md:flex-row items-center gap-6 animate-fadeIn">
      {/* Canvas Particle Simulation */}
      <div className="relative bg-bgDeep border border-borderMuted rounded-xl p-2 shrink-0 shadow-inner">
        <div className="absolute top-2 left-2 bg-accentPurple/10 border border-accentPurple/25 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-accentPurple flex items-center gap-1.5 shadow-sm">
          <Flame className="w-3 h-3" />
          Emission & Absorption Flow
        </div>
        <canvas ref={canvasRef} className="w-[380px] h-[220px]" />
      </div>

      {/* Urban Carbon Twin HUD Data */}
      <div className="flex-grow space-y-4 font-semibold text-xs text-headerText">
        <div>
          <span className="text-[10px] font-bold text-accentPurple tracking-wider uppercase block">Carbon Balance & Net Zero</span>
          <h3 className="text-xl font-extrabold text-headerText tracking-tight mt-0.5">
            {cityName} Carbon Balance
          </h3>
          <p className="text-xs text-cardTextMuted mt-1 leading-relaxed font-normal">
            Visualizing annual greenhouse gas emissions from urban activities versus absorption by local canopy reserves.
          </p>
        </div>

        {/* Dynamic Net Zero Countdown Indicator */}
        <div className="bg-bgDeep border border-borderMuted rounded-xl p-3 flex items-center justify-between gap-4 shadow-inner">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-accentPurple" />
            <div>
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Time Remaining to Net Zero Target</span>
              <span className="text-xs font-extrabold text-headerText uppercase mt-0.5 block">
                {countdown.years}y {countdown.days}d {countdown.hours}h {countdown.seconds}s
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Absorption Rate</span>
            <span className="text-sm font-extrabold text-accentGreen block mt-0.5">{carbonRatio}% Absorbed</span>
          </div>
        </div>

        {/* Carbon stats breakdowns */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl shadow-inner">
            <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Annual Emissions</span>
            <span className="text-base font-extrabold text-rose-600 mt-0.5 block">{metrics.carbonEmissions}M tCO2e</span>
          </div>
          <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl shadow-inner">
            <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Annual Absorption</span>
            <span className="text-base font-extrabold text-accentGreen mt-0.5 block">{metrics.carbonAbsorbed}M tCO2e</span>
          </div>
        </div>

      </div>
    </div>
  );
}
