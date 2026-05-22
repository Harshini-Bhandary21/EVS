import React, { useState, useEffect, useRef } from "react";
import { CITIES_DATA, type CityData } from "../data/cities";
import { Activity, Shield, Droplet, Wind, Zap, Flame, Globe2, Layers, AlertTriangle } from "lucide-react";
import DetailedIndiaMapPaths from "./DetailedIndiaMapPaths";

const getCityStateId = (cityId: string) => {
  if (cityId === "delhi") return "dl";
  if (cityId === "mumbai" || cityId === "pune") return "mh";
  if (cityId === "bengaluru") return "ka";
  if (cityId === "hyderabad") return "tg";
  if (cityId === "chennai") return "tn";
  if (cityId === "kolkata") return "wb";
  return "";
};


interface IndiaPulseProps {
  onSelectCity: (city: CityData) => void;
  selectedCity: CityData;
}

type MapLayer = "aqi" | "carbon" | "green" | "water" | "rating";

export default function IndiaPulse({ onSelectCity, selectedCity }: IndiaPulseProps) {
  const [activeLayer, setActiveLayer] = useState<MapLayer>("rating");
  const [pulseScale, setPulseScale] = useState(1);
  const highlightStateId = getCityStateId(selectedCity.id);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animate the beacon pulsing
  useEffect(() => {
    let animId: number;
    let dir = 0.015;
    const animate = () => {
      setPulseScale((prev) => {
        if (prev > 1.25) dir = -0.015;
        if (prev < 0.95) dir = 0.015;
        return prev + dir;
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // 3D Canvas Globe Atmosphere Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = 400;
    let height = canvas.height = 400;
    let rotation = 0;
    let particles: Array<{ x: number; y: number; r: number; speed: number; angle: number; color: string }> = [];

    // Seed floating environmental particles around the atmosphere
    for (let i = 0; i < 40; i++) {
      const radius = 100 + Math.random() * 80;
      const angle = Math.random() * Math.PI * 2;
      particles.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        r: 1 + Math.random() * 2,
        speed: 0.003 + Math.random() * 0.005,
        angle: angle,
        color: Math.random() > 0.4 ? "var(--accent-green)" : "var(--accent-blue)",
      });
    }

    let animFrame: number;
    const renderGlobe = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw outer glowing halo (Atmosphere layers)
      const glowGrad = ctx.createRadialGradient(
        width / 2, height / 2, 100,
        width / 2, height / 2, 160
      );
      glowGrad.addColorStop(0, "rgba(5, 150, 105, 0.08)");
      glowGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.04)");
      glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 160, 0, Math.PI * 2);
      ctx.fill();

      // Draw Earth Outer Ring
      ctx.strokeStyle = "var(--border-muted)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 120, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating Inner Grid Lines (Cyber Globe structure)
      rotation += 0.005;
      ctx.strokeStyle = "var(--border-muted)";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      for (let i = 0; i < 6; i++) {
        const offset = rotation + (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.ellipse(width / 2, height / 2, 120, Math.abs(Math.sin(offset)) * 120, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Draw Equator & Longitudinal Lines
      ctx.strokeStyle = "var(--border-muted)";
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 120, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // Central core glowing sphere
      const sphereGrad = ctx.createRadialGradient(
        width / 2 - 20, height / 2 - 20, 10,
        width / 2, height / 2, 120
      );
      sphereGrad.addColorStop(0, "#0f172a");
      sphereGrad.addColorStop(0.7, "#1e293b");
      sphereGrad.addColorStop(1, "#334155");
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 120, 0, Math.PI * 2);
      ctx.fill();

      // Animated rotating satellite beacon
      const beaconAngle = rotation * 1.5;
      const bx = width / 2 + Math.cos(beaconAngle) * 120;
      const by = height / 2 + Math.sin(beaconAngle) * 40; // elliptical orbit
      ctx.fillStyle = "var(--accent-green)";
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fill();

      // satellite orbit line
      ctx.strokeStyle = "var(--border-muted)";
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, 120, 40, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // Render Floating Environmental Particles
      particles.forEach((p) => {
        p.angle += p.speed;
        const radius = 110 + Math.sin(p.angle * 2) * 30; // wavy float path
        p.x = width / 2 + Math.cos(p.angle) * radius;
        p.y = height / 2 + Math.sin(p.angle) * radius;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Pulse text indicators
      ctx.fillStyle = "var(--card-text-muted)";
      ctx.font = "bold 9px 'Inter', sans-serif";
      ctx.fillText("EcoSphere Globe Interface", 20, 25);
      ctx.fillText("Atmosphere Rotation Active", 20, 38);
      ctx.fillText("Regional Beacons Online", 20, 51);

      animFrame = requestAnimationFrame(renderGlobe);
    };

    renderGlobe();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Set colors based on active filter layer
  const getCityLayerColor = (city: CityData) => {
    switch (activeLayer) {
      case "aqi":
        if (city.metrics.aqi > 200) return "var(--accent-purple)"; 
        if (city.metrics.aqi > 120) return "var(--accent-blue)"; 
        return "var(--accent-green)"; 
      case "carbon":
        if (city.metrics.carbonEmissions > 25) return "var(--accent-purple)"; 
        if (city.metrics.carbonEmissions > 15) return "var(--accent-blue)"; 
        return "var(--accent-green)"; 
      case "green":
        if (city.metrics.greenCover > 30) return "var(--accent-green)"; 
        if (city.metrics.greenCover > 20) return "var(--accent-blue)";
        return "var(--accent-purple)"; 
      case "water":
        if (city.metrics.waterConsumption > 170) return "var(--accent-purple)"; 
        return "var(--accent-blue)"; 
      case "rating":
      default:
        const score = (city.dna.environmentalHealth + city.dna.waterResilience + city.dna.carbonBalance) / 3;
        if (score > 70) return "var(--accent-green)"; 
        if (score > 55) return "var(--accent-blue)"; 
        return "var(--accent-purple)"; 
    }
  };

  const layersList = [
    { id: "rating", label: "Resilience Rating", icon: Shield, color: "text-accentGreen" },
    { id: "aqi", label: "Air Quality", icon: Wind, color: "text-accentBlue" },
    { id: "carbon", label: "Emissions", icon: Flame, color: "text-accentPurple" },
    { id: "water", label: "Water Stress", icon: Droplet, color: "text-accentBlue" },
    { id: "green", label: "Canopy Cover", icon: Globe2, color: "text-accentGreen" },
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
      {/* 3D Globe Visualizer */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center hud-panel p-6 h-[480px] shadow-sm">
        <div className="absolute top-3 left-3 bg-bgDeep border border-borderMuted px-3 py-1 rounded-full text-[9px] font-bold text-accentGreen flex items-center gap-1.5 shadow-sm">
          <Activity className="w-3 h-3" />
          Atmospheric Modeling
        </div>
        <canvas ref={canvasRef} className="w-[300px] h-[300px] md:w-[320px] md:h-[320px] rounded-full shadow-inner" />
        <div className="mt-4 text-center">
          <h4 className="text-sm font-extrabold tracking-tight text-accentGreen uppercase">
            Advanced Regional Environmental Monitoring
          </h4>
          <p className="text-xs text-cardTextMuted mt-1 max-w-[320px] mx-auto font-normal leading-relaxed">
            Monitoring meteorological variations, ozone patterns, and carbon concentration indicators across the Indian subcontinent.
          </p>
        </div>
      </div>

      {/* Interactive India Sustainability Pulse Map (Right Column) */}
      <div className="lg:col-span-7 hud-panel p-6 h-[480px] flex flex-col justify-between shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-borderMuted pb-4">
          <div>
            <span className="text-[10px] font-bold text-accentGreen tracking-wider uppercase block">Regional Overview</span>
            <h3 className="text-base font-extrabold text-headerText tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-accentGreen" />
              Regional Sustainability Index
            </h3>
            <p className="text-xs text-cardTextMuted mt-0.5 font-normal">
              Select a region on the map to analyze localized sustainability indices.
            </p>
          </div>

          {/* Layer Selectors */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {layersList.map((layer) => {
              const Icon = layer.icon;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id as MapLayer)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-200 shadow-sm ${
                    activeLayer === layer.id
                      ? "bg-bgDeep border-accentGreen text-headerText"
                      : "bg-bgCard text-cardTextMuted border-borderMuted hover:text-headerText hover:border-accentGreen/30"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${layer.color}`} />
                  {layer.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Stylized Interactive Map Area */}
        <div className="relative flex-grow flex items-center justify-center bg-bgDeep border border-borderMuted rounded-xl overflow-hidden my-4 shadow-inner">
          
          {/* SVG Map of India */}
          <svg
            viewBox="0 0 612 696"
            className="w-[320px] h-[364px] opacity-90 transition-all duration-300"
            style={{
              filter: `drop-shadow(0 0 15px rgba(5, 150, 105, 0.03))`,
            }}
          >
            {/* Grid Coordinates (Background) */}
            <circle cx="306" cy="348" r="300" fill="none" stroke="var(--border-muted)" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="306" y1="20" x2="306" y2="676" stroke="var(--border-muted)" strokeWidth="0.5" />
            <line x1="20" y1="348" x2="592" y2="348" stroke="var(--border-muted)" strokeWidth="0.5" />

            {/* High-Resolution Dynamic State-by-State Vector Map of India */}
            <DetailedIndiaMapPaths
              highlightStateId={highlightStateId}
              highlightClass="fill-accentGreen/10 stroke-accentGreen stroke-[1.5]"
              defaultClass="fill-bgCard/30 stroke-accentGreen/15 stroke-[0.75] transition-all duration-300"
            />

            {/* Glowing Interactive Cities Beacons */}
            {CITIES_DATA.map((city) => {
              let x = 306;
              let y = 348;

              if (city.id === "delhi") { x = 196.1; y = 208.6; }
              else if (city.id === "mumbai") { x = 118.2; y = 387.7; }
              else if (city.id === "bengaluru") { x = 217.5; y = 544.4; }
              else if (city.id === "pune") { x = 138.2; y = 405.1; }
              else if (city.id === "hyderabad") { x = 231.4; y = 455.2; }
              else if (city.id === "chennai") { x = 270.8; y = 557.0; }
              else if (city.id === "kolkata") { x = 423.7; y = 400.0; }

              const color = getCityLayerColor(city);
              const isSelected = selectedCity.id === city.id;

              return (
                <g key={city.id} className="cursor-pointer group" onClick={() => onSelectCity(city)}>
                  {/* Glowing halo pulse */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 16 * pulseScale : 11 * pulseScale}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    opacity={isSelected ? 0.9 : 0.4}
                    className="transition-all duration-300"
                  />
                  {/* Interactive Outer Selection Ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 22 : 15}
                    fill="rgba(255,255,255,0.01)"
                    stroke={isSelected ? "var(--header-text)" : "transparent"}
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                    className="group-hover:stroke-headerText transition-all duration-300"
                  />
                  {/* Central glowing core */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 6.5 : 4.5}
                    fill={color}
                    className="transition-all duration-300 shadow-sm"
                  />
                  {/* Label overlay */}
                  <text
                    x={x + 12}
                    y={y + 4}
                    fill={isSelected ? "var(--header-text)" : "var(--card-text-muted)"}
                    fontSize="9.5"
                    fontWeight={isSelected ? "bold" : "600"}
                    fontFamily="'Inter', sans-serif"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none md:opacity-100"
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Compass HUD Element */}
          <div className="absolute bottom-3 right-3 bg-bgDeep border border-borderMuted px-2.5 py-1 rounded-full text-[9px] font-bold text-cardTextMuted flex items-center gap-1.5 shadow-sm">
            Scale: 1:4,200,000 | WGS84 Reference
          </div>
        </div>

        {/* Legend / Selected Indicator HUD */}
        <div className="border-t border-borderMuted pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: getCityLayerColor(selectedCity) }} />
            <div>
              <span className="text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Selected Region</span>
              <h4 className="text-sm font-extrabold text-headerText mt-0.5">
                {selectedCity.name}, {selectedCity.state}
              </h4>
            </div>
          </div>

          {/* Core Telemetry Stats */}
          <div className="flex gap-4">
            <div className="bg-bgDeep px-3 py-1.5 rounded-xl border border-borderMuted text-center min-w-[70px] shadow-inner">
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Live AQI</span>
              <span className="text-xs font-extrabold text-accentGreen mt-0.5 block">{selectedCity.metrics.aqi}</span>
            </div>
            <div className="bg-bgDeep px-3 py-1.5 rounded-xl border border-borderMuted text-center min-w-[70px] shadow-inner">
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Canopy Cover</span>
              <span className="text-xs font-extrabold text-accentBlue mt-0.5 block">{selectedCity.metrics.greenCover}%</span>
            </div>
            <div className="bg-bgDeep px-3 py-1.5 rounded-xl border border-borderMuted text-center min-w-[70px] shadow-inner">
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Annual CO2</span>
              <span className="text-xs font-extrabold text-accentPurple mt-0.5 block">{selectedCity.metrics.carbonEmissions}Mt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
