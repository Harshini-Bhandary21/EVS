import React, { useState, useEffect } from "react";
import { 
  PUNE_REGIONS, 
  type PuneRegionData 
} from "../data/puneRegions";
import { 
  MapPin, Search, Wind, Droplets, Thermometer, 
  Flame, Leaf, CheckCircle2, CloudSun, AlertTriangle, 
  Compass, ArrowRight, ShieldCheck
} from "lucide-react";

export default function PuneMicroPulse() {
  const [selectedRegionId, setSelectedRegionId] = useState<string>("hinjawadi");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [liveRegions, setLiveRegions] = useState<PuneRegionData[]>(PUNE_REGIONS);

  const selectedRegion = liveRegions.find(r => r.id === selectedRegionId) || liveRegions[0];

  // Periodic mock live weather fluctuation to make the dashboard feel "alive"
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRegions(prevRegions => 
        prevRegions.map(region => {
          // Micro-fluctuations
          const tempDelta = (Math.random() - 0.5) * 0.4;
          const aqiDelta = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          const windDelta = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          
          return {
            ...region,
            weather: {
              ...region.weather,
              temp: parseFloat((region.weather.temp + tempDelta).toFixed(1)),
              windSpeed: Math.max(2, Math.min(45, region.weather.windSpeed + windDelta)),
              aqi: Math.max(30, Math.min(450, region.weather.aqi + aqiDelta))
            }
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Filter regions based on search
  const filteredRegions = liveRegions.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegionClick = (id: string) => {
    setSelectedRegionId(id);
  };

  // Get AQI quality evaluation
  const getAqiCategory = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "text-accentGreen bg-accentGreen/10 border-accentGreen/20" };
    if (aqi <= 100) return { label: "Satisfactory", color: "text-accentBlue bg-accentBlue/10 border-accentBlue/20" };
    if (aqi <= 150) return { label: "Moderate", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
    return { label: "Poor Alert", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" };
  };

  const currentAqiEval = getAqiCategory(selectedRegion.weather.aqi);

  return (
    <div className="hud-panel p-6 flex flex-col gap-6 animate-fadeIn">
      
      {/* Header Info */}
      <div className="border-b border-borderMuted pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-accentGreen tracking-wider uppercase block">Micro-Climatic Intelligence</span>
          <h3 className="text-xl font-extrabold text-headerText tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-accentGreen" />
            Pune Micro-Pulse Dashboard
          </h3>
          <p className="text-xs text-cardTextMuted mt-0.5 font-normal">
            Analyze neighborhood sustainability, carbon loads, preventative measures, and live micro-weather.
          </p>
        </div>

        {/* Search & Select input dropdown */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cardTextMuted pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search neighborhood (e.g. Kothrud...)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-bgDeep border border-borderMuted rounded-xl text-xs text-headerText placeholder-cardTextMuted/60 focus:outline-none focus:border-accentGreen shadow-inner font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Interactive Vector Map & Selector */}
        <div className="lg:col-span-6 bg-bgDeep border border-borderMuted rounded-xl p-5 flex flex-col justify-between shadow-inner min-h-[420px]">
          <div>
            <div className="flex justify-between items-center border-b border-borderMuted pb-2.5 mb-4">
              <span className="text-[10px] font-bold text-cardTextMuted uppercase tracking-wider">Spatial Coordinate Map</span>
              <span className="text-[9px] font-bold text-accentGreen bg-accentGreen/10 px-2 py-0.5 rounded border border-accentGreen/20 uppercase tracking-widest animate-pulse">
                Live Telemetry Active
              </span>
            </div>
            
            <p className="text-[10px] text-cardTextMuted font-semibold leading-relaxed mb-4">
              Select any highlighted beacon pin directly on the spatial map coordinate outline to audit that specific Pune sector:
            </p>
          </div>

          {/* Stylized Vector SVG Pune Map Canvas */}
          <div className="relative flex-grow flex items-center justify-center bg-bgCard border border-borderMuted rounded-xl p-2 min-h-[250px] shadow-sm overflow-hidden">
            
            {/* Background cyber grid layout for high tech look */}
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle, var(--neutral-text) 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }} />

            {/* Simulated River / Natural Valley SVG layout path overlay (Elegance nature style) */}
            <svg viewBox="0 0 500 380" className="w-full h-full max-h-[300px] z-10">
              
              {/* Rivers (Mula-Mutha river outline mock representation) */}
              <path 
                d="M 20 160 Q 150 140 250 200 T 480 240" 
                fill="none" 
                stroke="var(--accent-blue)" 
                strokeWidth="6" 
                strokeLinecap="round"
                className="opacity-20"
              />
              <path 
                d="M 120 40 Q 200 120 250 200" 
                fill="none" 
                stroke="var(--accent-blue)" 
                strokeWidth="4" 
                strokeLinecap="round"
                className="opacity-15"
              />

              {/* Natural forest hill belts polygons */}
              <path 
                d="M 50 240 Q 120 290 180 340 L 40 360 Z" 
                fill="var(--accent-green)" 
                className="opacity-[0.05]"
              />
              <circle cx="160" cy="330" r="45" fill="var(--accent-green)" className="opacity-[0.04]" />

              {/* Dotted sector division connections */}
              {liveRegions.map((r) => (
                <line 
                  key={`line-${r.id}`}
                  x1="250" 
                  y1="200" 
                  x2={r.x} 
                  y2={r.y} 
                  stroke="var(--border-muted)" 
                  strokeWidth="1" 
                  strokeDasharray="4,4" 
                  className="opacity-40"
                />
              ))}

              {/* Central base node line rings */}
              <circle cx="250" cy="200" r="15" fill="none" stroke="var(--accent-green)" strokeWidth="1.2" strokeDasharray="3,3" className="opacity-40" />

              {/* Neighborhood polygon path boundaries (gorgeous glowing areas) */}
              {liveRegions.map((r) => {
                const isActive = r.id === selectedRegionId;
                return (
                  <g key={`area-${r.id}`} className="cursor-pointer" onClick={() => handleRegionClick(r.id)}>
                    {/* Semi-transparent glow polygon surrounding coordinates */}
                    <circle 
                      cx={r.x} 
                      cy={r.y} 
                      r={isActive ? "35" : "25"} 
                      fill={isActive ? "var(--accent-green)" : "var(--accent-blue)"} 
                      className={`transition-all duration-300 ${
                        isActive ? "opacity-[0.09]" : "opacity-[0.02] hover:opacity-[0.06]"
                      }`}
                    />
                    
                    {/* Node link connector pin */}
                    <g className="transition-all duration-300 hover:scale-[1.15]">
                      <circle 
                        cx={r.x} 
                        cy={r.y} 
                        r="6" 
                        fill={isActive ? "var(--accent-green)" : "color-mix(in srgb, var(--neutral-text) 25%, transparent)"}
                        className="transition-all duration-300"
                      />
                      <circle 
                        cx={r.x} 
                        cy={r.y} 
                        r="2.5" 
                        fill="#FFFFFF"
                      />
                      
                      {/* Outer pulse animation on active beacon */}
                      {isActive && (
                        <circle 
                          cx={r.x} 
                          cy={r.y} 
                          r="12" 
                          fill="none" 
                          stroke="var(--accent-green)" 
                          strokeWidth="1.5"
                          className="animate-ping opacity-60"
                        />
                      )}
                    </g>

                    {/* Sector Text Labels */}
                    <text 
                      x={r.x} 
                      y={r.y - 12} 
                      textAnchor="middle" 
                      className={`text-[9px] font-sans font-bold select-none transition-all duration-300 ${
                        isActive ? "fill-accentGreen font-black scale-[1.05]" : "fill-cardTextMuted/70"
                      }`}
                    >
                      {r.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
            
            {/* Visual floating compass marker */}
            <div className="absolute bottom-3 right-3 bg-bgDeep border border-borderMuted px-2 py-1 rounded text-[8px] font-bold text-cardTextMuted tracking-wider flex items-center gap-1 shadow-inner pointer-events-none uppercase">
              <Compass className="w-3 h-3 text-accentGreen" />
              Scale: 1:35,000 WGS84
            </div>
          </div>

          {/* Quick list filter selector chip grid */}
          <div className="mt-4 flex flex-wrap gap-1.5 justify-start">
            {filteredRegions.map((r) => {
              const isActive = r.id === selectedRegionId;
              return (
                <button
                  key={r.id}
                  onClick={() => handleRegionClick(r.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all duration-200 ${
                    isActive 
                      ? "bg-accentGreen text-white border-accentGreen shadow-sm" 
                      : "bg-bgCard text-cardTextMuted border-borderMuted hover:border-accentGreen/30 hover:text-headerText"
                  }`}
                >
                  {r.name}
                </button>
              );
            })}
            
            {filteredRegions.length === 0 && (
              <span className="text-[10px] text-red-500 font-semibold italic">No Pune neighborhoods match search filter...</span>
            )}
          </div>

        </div>

        {/* Right Side: Environmental Diagnostics Dashboard */}
        <div className="lg:col-span-6 flex flex-col gap-5 justify-between">
          
          {/* Section 1: Active selected region header cards */}
          <div className="bg-bgCard border border-borderMuted rounded-xl p-5 shadow-sm space-y-4">
            
            <div className="flex justify-between items-start border-b border-borderMuted pb-3">
              <div>
                <span className="text-[9px] font-bold text-accentGreen uppercase tracking-wider bg-accentGreen/10 px-2.5 py-0.5 rounded-full border border-accentGreen/15">
                  {selectedRegion.type}
                </span>
                <h4 className="text-base font-extrabold text-headerText tracking-tight mt-1.5 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accentGreen" />
                  {selectedRegion.name}
                </h4>
                <span className="text-[9px] font-bold text-cardTextMuted font-mono block mt-0.5">
                  LAT/LNG: {selectedRegion.lat}° N, {selectedRegion.lng}° E
                </span>
              </div>

              {/* circular radial score indicator */}
              <div className="bg-bgDeep border border-borderMuted w-16 h-16 rounded-xl flex flex-col justify-center items-center text-center shadow-inner relative overflow-hidden">
                <span className="block text-[7px] text-cardTextMuted uppercase tracking-wider font-extrabold">ECO SCORE</span>
                <span className="text-base font-black text-accentGreen leading-none mt-1">
                  {selectedRegion.sustainabilityScore}
                </span>
                <span className="text-[8px] text-cardTextMuted font-bold mt-0.5">/100</span>
              </div>
            </div>

            {/* Footprint & Canopy Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
              
              {/* Carbon Footprint Card */}
              <div className="bg-bgDeep p-3 rounded-xl border border-borderMuted flex items-center gap-3 shadow-inner">
                <div className="w-8 h-8 rounded-lg bg-accentPurple/10 border border-accentPurple/25 flex items-center justify-center text-accentPurple shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[8px] text-cardTextMuted uppercase tracking-wider">Carbon Footprint</span>
                  <span className="text-sm font-extrabold text-headerText block mt-0.5">{selectedRegion.carbonFootprint} tCO2e</span>
                  <span className="text-[8px] text-accentPurple font-bold">Annual Greenhouse Load</span>
                </div>
              </div>

              {/* Canopy Cover Card */}
              <div className="bg-bgDeep p-3 rounded-xl border border-borderMuted flex items-center gap-3 shadow-inner">
                <div className="w-8 h-8 rounded-lg bg-accentGreen/10 border border-accentGreen/25 flex items-center justify-center text-accentGreen shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[8px] text-cardTextMuted uppercase tracking-wider">Tree Canopy Cover</span>
                  <span className="text-sm font-extrabold text-headerText block mt-0.5">{selectedRegion.treeCover}%</span>
                  <span className="text-[8px] text-accentGreen font-bold">Biomass Mitigation Ratio</span>
                </div>
              </div>

            </div>

          </div>

          {/* Section 2: Live Weather Diagnostics HUD (Elegance nature theme styling) */}
          <div className="bg-bgCard border border-borderMuted rounded-xl p-5 shadow-sm space-y-4">
            
            <div className="flex justify-between items-center border-b border-borderMuted pb-2.5">
              <h4 className="text-xs font-extrabold text-headerText tracking-wider flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-accentGreen" />
                Live Atmosphere & Weather Telemetry
              </h4>
              <span className="text-[8px] font-extrabold text-cardTextMuted uppercase tracking-wider">
                Region-Specific Sensor
              </span>
            </div>

            {/* Weather Metric Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              
              {/* Temperature */}
              <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl shadow-inner flex flex-col justify-between">
                <div className="flex items-center justify-center gap-1 text-cardTextMuted">
                  <Thermometer className="w-3.5 h-3.5 text-accentGreen" />
                  <span className="text-[8px] font-bold uppercase tracking-wider">Temp</span>
                </div>
                <span className="text-base font-extrabold text-headerText mt-2 block">{selectedRegion.weather.temp}°C</span>
                <span className="text-[8px] text-accentGreen font-bold mt-1 block">Fluctuating Live</span>
              </div>

              {/* Humidity */}
              <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl shadow-inner flex flex-col justify-between">
                <div className="flex items-center justify-center gap-1 text-cardTextMuted">
                  <Droplets className="w-3.5 h-3.5 text-accentBlue" />
                  <span className="text-[8px] font-bold uppercase tracking-wider">Humidity</span>
                </div>
                <span className="text-base font-extrabold text-headerText mt-2 block">{selectedRegion.weather.humidity}%</span>
                <span className="text-[8px] text-cardTextMuted font-bold mt-1 block">Atmospheric Moisture</span>
              </div>

              {/* Wind Vector */}
              <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl shadow-inner flex flex-col justify-between">
                <div className="flex items-center justify-center gap-1 text-cardTextMuted">
                  <Wind className="w-3.5 h-3.5 text-accentGreen" />
                  <span className="text-[8px] font-bold uppercase tracking-wider">Wind</span>
                </div>
                <span className="text-base font-extrabold text-headerText mt-2 block">
                  {selectedRegion.weather.windSpeed} <span className="text-[9px] font-bold text-cardTextMuted">km/h</span>
                </span>
                <span className="text-[8px] text-cardTextMuted font-bold mt-1 block">Vector: {selectedRegion.weather.windDir}</span>
              </div>

              {/* Local AQI Sensor */}
              <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl shadow-inner flex flex-col justify-between">
                <div className="flex items-center justify-center gap-1 text-cardTextMuted">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[8px] font-bold uppercase tracking-wider">PM2.5 AQI</span>
                </div>
                <span className="text-base font-extrabold text-headerText mt-2 block">{selectedRegion.weather.aqi}</span>
                <span className={`text-[8.5px] font-bold px-1 py-0.5 rounded mt-1.5 block uppercase tracking-wider ${currentAqiEval.color}`}>
                  {currentAqiEval.label}
                </span>
              </div>

            </div>

            {/* Weather status summary badge */}
            <div className="bg-bgDeep p-3 rounded-xl border border-borderMuted flex items-center justify-between text-xs font-semibold shadow-inner">
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-accentGreen" />
                <div>
                  <span className="block text-[8px] text-cardTextMuted uppercase tracking-wider">Local Atmospheric Outlook</span>
                  <span className="text-headerText font-extrabold">{selectedRegion.weather.condition} conditions reported.</span>
                </div>
              </div>
              <div className="text-[9px] font-bold text-cardTextMuted uppercase tracking-wider">
                Refreshed 4s ago
              </div>
            </div>

          </div>

          {/* Section 3: Contextual Suggestive Preventative Measures */}
          <div className="bg-bgCard border border-borderMuted rounded-xl p-5 shadow-sm flex-grow flex flex-col justify-between space-y-4">
            
            <div>
              <div className="flex justify-between items-center border-b border-borderMuted pb-2.5 mb-3">
                <h4 className="text-xs font-extrabold text-headerText tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accentGreen" />
                  Suggestive Ecological Measures
                </h4>
                <span className="text-[8px] font-extrabold text-accentGreen uppercase tracking-wider">
                  Preventative Guidelines
                </span>
              </div>

              <p className="text-[10px] text-cardTextMuted font-semibold leading-relaxed mb-3">
                Enforcing target municipal interventions based on the zone classification:
              </p>

              {/* Bullet checklist */}
              <div className="space-y-2">
                {selectedRegion.suggestiveMeasures.map((measure, idx) => (
                  <div key={idx} className="flex gap-2 text-[11px] leading-relaxed text-neutralText font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-accentGreen shrink-0 mt-0.5" />
                    <span>{measure}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Small nature alert sign */}
            <div className="bg-bgDeep border border-borderMuted p-3 rounded-xl flex gap-2 text-[10px] text-cardTextMuted leading-relaxed shadow-inner mt-2">
              <Leaf className="w-4 h-4 text-accentGreen shrink-0" />
              <div>
                Implementing these actions reduces localized greenhouse emission intensities by up to 28% and helps stabilize the neighborhood's urban water resilient aquifer indexes.
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
