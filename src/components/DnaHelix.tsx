import React, { useRef, useEffect } from "react";
import type { CityDNA } from "../data/cities";
import { Award, Cpu } from "lucide-react";

interface DnaHelixProps {
  dna: CityDNA;
  cityName: string;
}

export default function DnaHelix({ dna, cityName }: DnaHelixProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = 460;
    let height = canvas.height = 360;
    let rotation = 0;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Soft Grid Background
      ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.2;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      rotation += 0.02;

      const centerX = width / 2;
      const numNodes = 20;
      const helixRadius = 70;
      const verticalSpacing = 14;
      const topOffset = (height - (numNodes * verticalSpacing)) / 2;

      // Draw Helix connections & dots
      for (let i = 0; i < numNodes; i++) {
        const y = topOffset + i * verticalSpacing;
        const baseAngle = rotation + (i * Math.PI) / 8;

        // Helix 1 (Green Side)
        const x1 = centerX + Math.cos(baseAngle) * helixRadius;
        const z1 = Math.sin(baseAngle); // depth indicator: -1 to 1

        // Helix 2 (Blue/Purple Side)
        const x2 = centerX - Math.cos(baseAngle) * helixRadius;
        const z2 = -Math.sin(baseAngle);

        // Map colors according to depth
        const opacity1 = (z1 + 1) / 2 * 0.7 + 0.3; // 0.3 to 1.0
        const opacity2 = (z2 + 1) / 2 * 0.7 + 0.3;

        // Size indicators
        const r1 = (z1 + 1) / 2 * 4.5 + 2.5;
        const r2 = (z2 + 1) / 2 * 4.5 + 2.5;

        // Rung base connections (Draw behind nodes)
        ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
        ctx.globalAlpha = Math.min(opacity1, opacity2) * 0.15;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Node base-pair links
        if (i % 4 === 0) {
          const geneIdx = Math.floor(i / 4);
          let color = "#10b981";
          if (geneIdx === 1) color = "#3b82f6";
          else if (geneIdx === 2) color = "#8b5cf6";
          else if (geneIdx === 3) color = "#8b5cf6";
          else if (geneIdx === 4) color = "#10b981";

          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = Math.min(opacity1, opacity2) * 0.8;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }

        // Draw node 1
        ctx.fillStyle = `rgba(16, 185, 129, ${opacity1})`;
        ctx.beginPath();
        ctx.arc(x1, y, r1, 0, Math.PI * 2);
        ctx.fill();

        // Draw node 2
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity2})`;
        ctx.beginPath();
        ctx.arc(x2, y, r2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw active telemetry pointers & annotations
      const indicators = [
        { label: "Env. Health", val: dna.environmentalHealth, y: topOffset + 2 * verticalSpacing },
        { label: "Water Resilience", val: dna.waterResilience, y: topOffset + 6 * verticalSpacing },
        { label: "Carbon Balance", val: dna.carbonBalance, y: topOffset + 10 * verticalSpacing },
        { label: "Climate Readiness", val: dna.climateReadiness, y: topOffset + 14 * verticalSpacing },
        { label: "Urban Efficiency", val: dna.urbanEfficiency, y: topOffset + 18 * verticalSpacing }
      ];

      indicators.forEach((ind) => {
        const sideAngle = rotation + ((ind.y - topOffset) / verticalSpacing * Math.PI) / 8;
        const outerX = centerX + Math.cos(sideAngle) * helixRadius;
        
        ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(outerX, ind.y);
        
        // Draw callout pointer lines
        const isRightSide = Math.cos(sideAngle) > 0;
        const elbowX = isRightSide ? width - 120 : 20;

        ctx.lineTo(elbowX, ind.y);
        ctx.stroke();

        ctx.fillStyle = isRightSide ? "#10b981" : "#3b82f6";
        ctx.beginPath();
        ctx.arc(outerX, ind.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // HUD annotations
      ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
      ctx.font = "bold 9px 'Inter', sans-serif";
      ctx.fillText("Resilience Model Stable", 15, 20);
      ctx.fillText("System Reference Active", 15, 32);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [dna]);

  // Aggregate average score
  const avgDna = Math.round(
    (dna.environmentalHealth + dna.waterResilience + dna.carbonBalance + dna.climateReadiness + dna.urbanEfficiency) / 5
  );

  return (
    <div className="hud-panel p-6 flex flex-col md:flex-row items-center gap-6 animate-fadeIn">
      {/* Canvas DNA Double Helix */}
      <div className="relative bg-bgDeep border border-borderMuted rounded-xl p-2 shrink-0 shadow-inner">
        <div className="absolute top-2 left-2 bg-accentGreen/10 border border-accentGreen/25 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-accentGreen flex items-center gap-1.5 uppercase tracking-wider">
          <Cpu className="w-3 h-3" />
          Resilience Helix Profile
        </div>
        <canvas ref={canvasRef} className="w-[380px] h-[300px]" />
      </div>

      {/* DNA Helix Parameters */}
      <div className="flex-grow space-y-4 w-full text-xs font-semibold text-headerText">
        <div>
          <span className="text-[10px] font-bold text-accentGreen tracking-wider uppercase block">Pillars of Resilience</span>
          <h3 className="text-xl font-extrabold text-headerText tracking-tight">
            {cityName} Resilience Pillars
          </h3>
          <p className="text-xs text-cardTextMuted mt-1 leading-relaxed font-normal">
            These indexes evaluate the integrated environmental resilience of a city. They reflect resource sustainability, canopy cooling limits, and ecological balance.
          </p>
        </div>

        {/* Gauges */}
        <div className="space-y-3">
          
          <div>
            <div className="flex justify-between text-accentGreen mb-1">
              <span>Environmental Health</span>
              <span>{dna.environmentalHealth}%</span>
            </div>
            <div className="w-full bg-bgDeep h-2 rounded overflow-hidden border border-borderMuted shadow-inner">
              <div className="bg-accentGreen h-full rounded transition-all duration-500" style={{ width: `${dna.environmentalHealth}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-accentBlue mb-1">
              <span>Water Resilience</span>
              <span>{dna.waterResilience}%</span>
            </div>
            <div className="w-full bg-bgDeep h-2 rounded overflow-hidden border border-borderMuted shadow-inner">
              <div className="bg-accentBlue h-full rounded transition-all duration-500" style={{ width: `${dna.waterResilience}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-accentPurple mb-1">
              <span>Carbon Balance</span>
              <span>{dna.carbonBalance}%</span>
            </div>
            <div className="w-full bg-bgDeep h-2 rounded overflow-hidden border border-borderMuted shadow-inner">
              <div className="bg-accentPurple h-full rounded transition-all duration-500" style={{ width: `${dna.carbonBalance}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-rose-600 mb-1">
              <span>Climate Readiness</span>
              <span>{dna.climateReadiness}%</span>
            </div>
            <div className="w-full bg-bgDeep h-2 rounded overflow-hidden border border-borderMuted shadow-inner">
              <div className="bg-rose-600 h-full rounded transition-all duration-500" style={{ width: `${dna.climateReadiness}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-amber-600 mb-1">
              <span>Urban Efficiency</span>
              <span>{dna.urbanEfficiency}%</span>
            </div>
            <div className="w-full bg-bgDeep h-2 rounded overflow-hidden border border-borderMuted shadow-inner">
              <div className="bg-amber-600 h-full rounded transition-all duration-500" style={{ width: `${dna.urbanEfficiency}%` }} />
            </div>
          </div>

        </div>

        {/* Genome Score Callout Badge */}
        <div className="border-t border-borderMuted pt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accentGreen shrink-0" />
            <div>
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Average Resilience</span>
              <span className="text-xs font-extrabold text-headerText">
                {avgDna > 75 ? "High Performance" : avgDna > 55 ? "Moderate Resilience" : "Critical Attention Needed"}
              </span>
            </div>
          </div>
          
          <div className="bg-bgDeep border border-borderMuted px-4 py-2 rounded-xl text-center shadow-inner shrink-0">
            <span className="block text-[9px] font-bold text-cardTextMuted uppercase tracking-wider">Resilience Score</span>
            <span className="text-base font-extrabold text-accentGreen">
              {(avgDna / 100).toFixed(2)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
