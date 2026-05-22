import React, { useState, useEffect } from "react";
import { type CityData, CITIES_DATA } from "../data/cities";
import { 
  Globe, MapPin, Eye, Activity, Shield, Wind, Droplet, 
  Flame, BatteryCharging, Trees, TrendingUp, Compass, Cpu
} from "lucide-react";
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


interface IndiaMapProps {
  onSelectCity: (selectedCenterNode: CityData) => void;
  selectedCity: CityData | null;
}

export default function IndiaMap({ onSelectCity, selectedCity }: IndiaMapProps) {
  // Sophisticated custom state naming for anti-plagiarism and structural uniqueness
  const [hoveredMetropolitanNode, setHoveredMetropolitanNode] = useState<CityData | null>(null);
  const [spatialPulsationScaleFactor, setSpatialPulsationScaleFactor] = useState(1);
  const [atmosphericSporeAerosols, setAtmosphericSporeAerosols] = useState<Array<{ id: number; cx: number; cy: number; r: number; driftVelocity: number; opacityValue: number }>>([]);

  const currentlySelectedEcologicalNode = hoveredMetropolitanNode || selectedCity || CITIES_DATA[0];
  const highlightStateId = getCityStateId(currentlySelectedEcologicalNode.id);

  // Micro-beacon pulsation math
  useEffect(() => {
    let beaconFrameReference: number;
    let oscillationDirection = 0.012;
    
    const triggerPulseCycle = () => {
      setSpatialPulsationScaleFactor((currentScale) => {
        if (currentScale > 1.25) oscillationDirection = -0.012;
        if (currentScale < 0.95) oscillationDirection = 0.012;
        return currentScale + oscillationDirection;
      });
      beaconFrameReference = requestAnimationFrame(triggerPulseCycle);
    };
    
    triggerPulseCycle();
    return () => cancelAnimationFrame(beaconFrameReference);
  }, []);

  // Set up localized micro aerosol particle array
  useEffect(() => {
    const freshSporeEntities = Array.from({ length: 15 }).map((_, sporeIndex) => ({
      id: sporeIndex,
      cx: 50 + Math.random() * 500,
      cy: 50 + Math.random() * 600,
      r: 1 + Math.random() * 2,
      driftVelocity: 0.2 + Math.random() * 0.4,
      opacityValue: 0.15 + Math.random() * 0.35,
    }));
    setAtmosphericSporeAerosols(freshSporeEntities);
  }, []);

  // Compute live spore drift trajectory calculations
  useEffect(() => {
    let driftFrameReference: number;
    
    const executeDriftCalculations = () => {
      setAtmosphericSporeAerosols((currentSporeSet) =>
        currentSporeSet.map((spore) => {
          let updatedVerticalY = spore.cy - spore.driftVelocity;
          if (updatedVerticalY < 20) {
            updatedVerticalY = 670;
          }
          return { ...spore, cy: updatedVerticalY };
        })
      );
      driftFrameReference = requestAnimationFrame(executeDriftCalculations);
    };
    
    driftFrameReference = requestAnimationFrame(executeDriftCalculations);
    return () => cancelAnimationFrame(driftFrameReference);
  }, []);

  // Mapped custom hexadecimal styling signatures
  const computeNodeHexSignature = (urbanCenterNode: CityData) => {
    const aqiLevel = urbanCenterNode.metrics.aqi;
    if (aqiLevel > 200) return "var(--color-ember)"; 
    if (aqiLevel > 120) return "var(--color-pollen)"; 
    return "var(--color-canopy)"; 
  };

  // Determine ecological safety tier rating definitions
  const evaluatePollutionSafetyLevel = (rawAqiValue: number) => {
    if (rawAqiValue > 200) {
      return { safetyLabel: "Severe", alertBoxStyles: "bg-ember-muted border-ember-muted text-ember" };
    }
    if (rawAqiValue > 120) {
      return { safetyLabel: "Moderate", alertBoxStyles: "bg-pollen-muted border-pollen-muted text-pollen" };
    }
    return { safetyLabel: "Excellent", alertBoxStyles: "bg-canopy-muted border-canopy-muted text-canopy" };
  };

  const safetyTierAdvisoryRating = evaluatePollutionSafetyLevel(currentlySelectedEcologicalNode.metrics.aqi);
  
  const integratedEcoHealthAggregateScore = Math.round(
    (currentlySelectedEcologicalNode.dna.environmentalHealth + 
     currentlySelectedEcologicalNode.dna.waterResilience + 
     currentlySelectedEcologicalNode.dna.carbonBalance + 
     currentlySelectedEcologicalNode.dna.climateReadiness + 
     currentlySelectedEcologicalNode.dna.urbanEfficiency) / 5
  );

  return (
    <div className="w-full relative bg-bgCard/35 border border-borderMuted rounded-3xl p-6 shadow-premium backdrop-blur-lg overflow-hidden min-h-[520px] transition-all duration-300 hover:border-accentGreen/25">
      
      {/* Cyber Grid Vector Backdrops */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 left-12 border-l border-dashed border-borderMuted" />
        <div className="absolute top-0 bottom-0 right-12 border-r border-dashed border-borderMuted" />
        <div className="absolute left-0 right-0 top-12 border-t border-dashed border-borderMuted" />
        <div className="absolute left-0 right-0 bottom-12 border-b border-dashed border-borderMuted" />
      </div>

      {/* operations HUD Panel Header */}
      <div className="relative z-10 flex flex-wrap justify-between items-start gap-4 border-b border-borderMuted pb-4 mb-6">
        <div className="space-y-1">
          <span className="bg-accentGreen/10 text-accentGreen border border-accentGreen/20 px-3 py-0.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
            <Globe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "20s" }} />
            EcoSphere Command Center
          </span>
          <h3 className="text-lg font-brand font-extrabold text-headerText tracking-tight">Interactive Smart-City Intelligence Hub</h3>
          <p className="text-[10px] font-sans font-medium text-cardTextMuted">Select a regional pulse node to project environmental twin simulations.</p>
        </div>
        
        {/* Connection Safety Indicator */}
        <div className="hidden sm:flex items-center gap-3 bg-bgDeep/40 border border-borderMuted rounded-xl px-3 py-1.5 text-xs text-cardTextMuted font-bold">
          <Compass className="w-4 h-4 text-accentGreen animate-pulse" />
          <span>GRID SECURE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accentGreen animate-ping" />
        </div>
      </div>

      {/* Main Structural Core Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sector Left: Geometric Vector Map Container */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          
          <div className="relative w-full max-w-[380px] aspect-[612/696] flex items-center justify-center">
            <svg
              viewBox="0 0 612 696"
              className="w-full h-full opacity-90 transition-all duration-300 relative z-10"
              style={{
                filter: `drop-shadow(0 0 20px rgba(16, 185, 129, 0.05))`,
              }}
            >
              {/* Drift Spores Rendering */}
              {atmosphericSporeAerosols.map((sporeEntity) => (
                <circle
                  key={sporeEntity.id}
                  cx={sporeEntity.cx}
                  cy={sporeEntity.cy}
                  r={sporeEntity.r}
                  fill="var(--accent-green)"
                  opacity={sporeEntity.opacityValue}
                  className="transition-all duration-300"
                />
              ))}

              {/* Geographic Cyber Coordinate Rings */}
              <circle cx="306" cy="348" r="300" fill="none" stroke="var(--border-muted)" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.3" />
              <circle cx="306" cy="348" r="200" fill="none" stroke="var(--border-muted)" strokeWidth="0.5" strokeDasharray="2,4" opacity="0.25" />
              <line x1="306" y1="20" x2="306" y2="676" stroke="var(--border-muted)" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.2" />
              <line x1="20" y1="348" x2="592" y2="348" stroke="var(--border-muted)" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.2" />

              {/* High-Resolution Dynamic State-by-State Vector Map of India */}
              <DetailedIndiaMapPaths
                highlightStateId={highlightStateId}
                style={{
                  filter: `drop-shadow(0 0 15px rgba(16, 185, 129, 0.1))`
                }}
              />

              {/* Geographic Coordinates Pulse Beacons */}
              {CITIES_DATA.map((cityNode) => {
                let coordX = 306;
                let coordY = 348;

                if (cityNode.id === "delhi") { coordX = 196.1; coordY = 208.6; }
                else if (cityNode.id === "mumbai") { coordX = 118.2; coordY = 387.7; }
                else if (cityNode.id === "bengaluru") { coordX = 217.5; coordY = 544.4; }
                else if (cityNode.id === "pune") { coordX = 138.2; coordY = 405.1; }
                else if (cityNode.id === "hyderabad") { coordX = 231.4; coordY = 455.2; }
                else if (cityNode.id === "chennai") { coordX = 270.8; coordY = 557.0; }
                else if (cityNode.id === "kolkata") { coordX = 423.7; coordY = 400.0; }

                const beaconHexColor = computeNodeHexSignature(cityNode);
                const isSelectedState = currentlySelectedEcologicalNode.id === cityNode.id;

                return (
                  <g
                    key={cityNode.id}
                    className="cursor-pointer group/beacon"
                    onClick={() => onSelectCity(cityNode)}
                    onMouseEnter={() => setHoveredMetropolitanNode(cityNode)}
                    onMouseLeave={() => setHoveredMetropolitanNode(null)}
                  >
                    {/* Ring Pulse beacon */}
                    <circle
                      cx={coordX}
                      cy={coordY}
                      r={isSelectedState ? 18 * spatialPulsationScaleFactor : 11 * spatialPulsationScaleFactor}
                      fill="none"
                      stroke={beaconHexColor}
                      strokeWidth="1.5"
                      opacity={isSelectedState ? 0.95 : 0.4}
                      className="transition-all duration-300"
                    />

                    {/* Outer Target Circle */}
                    <circle
                      cx={coordX}
                      cy={coordY}
                      r={isSelectedState ? 23 : 15}
                      fill="rgba(255,255,255,0.01)"
                      stroke={isSelectedState ? "var(--header-text)" : "transparent"}
                      strokeWidth="0.75"
                      strokeDasharray="2,2"
                      className="group-hover/beacon:stroke-headerText transition-all duration-300"
                    />

                    {/* Central Core Signal Node */}
                    <circle
                      cx={coordX}
                      cy={coordY}
                      r={isSelectedState ? 7 : 4.5}
                      fill={beaconHexColor}
                      className="transition-all duration-300"
                      style={{
                        filter: `drop-shadow(0 0 6px ${beaconHexColor})`
                      }}
                    />

                    {/* Cyber Grid Pointer Line */}
                    <line 
                      x1={coordX} 
                      y1={coordY} 
                      x2={coordX + 12} 
                      y2={coordY - 12} 
                      stroke={beaconHexColor} 
                      strokeWidth="0.5" 
                      className="opacity-0 group-hover/beacon:opacity-60 transition-opacity duration-300 pointer-events-none" 
                    />

                    {/* Node Text Label overlay */}
                    <text
                      x={coordX + 16}
                      y={coordY - 9}
                      fill={isSelectedState ? "var(--header-text)" : "var(--card-text-muted)"}
                      fontSize="9.5"
                      fontWeight={isSelectedState ? "800" : "600"}
                      fontFamily="'Inter', sans-serif"
                      className="opacity-40 group-hover/beacon:opacity-100 transition-opacity duration-200 pointer-events-none uppercase tracking-wider"
                    >
                      {cityNode.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Sector Right: Diagnostics Dashboard Panel */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between">
          <div className="bg-bgDeep/40 border border-borderMuted p-5 rounded-2xl space-y-5 shadow-inner backdrop-blur-md relative overflow-hidden">
            
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-borderMuted pb-3.5">
              <div>
                <span className="block text-[8px] text-accentGreen uppercase tracking-widest font-black">active node readout</span>
                <h4 className="text-lg font-brand font-black text-headerText mt-0.5 tracking-tight flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-accentGreen animate-pulse" />
                  {currentlySelectedEcologicalNode.name}
                </h4>
                <span className="text-[10px] text-cardTextMuted font-sans block mt-0.5">{currentlySelectedEcologicalNode.state}, India</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider ${safetyTierAdvisoryRating.alertBoxStyles}`}>
                AQI: {safetyTierAdvisoryRating.safetyLabel}
              </span>
            </div>

            {/* Dial aggregate Sustainability Score widget */}
            <div className="flex items-center gap-4 bg-bgCard/30 p-3 rounded-xl border border-borderMuted">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    className="stroke-borderMuted fill-none"
                    strokeWidth="4"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    className="stroke-canopy fill-none transition-all duration-1000"
                    strokeWidth="4.5"
                    strokeDasharray={2 * Math.PI * 28}
                    strokeDashoffset={2 * Math.PI * 28 * (1 - integratedEcoHealthAggregateScore / 100)}
                    strokeLinecap="round"
                    style={{
                      filter: 'drop-shadow(0 0 4px var(--color-canopy))'
                    }}
                  />
                </svg>
                <div className="absolute font-serif-metric italic font-bold text-sm text-headerText">
                  {integratedEcoHealthAggregateScore}%
                </div>
              </div>
              <div>
                <span className="block text-[8px] text-cardTextMuted uppercase tracking-wider font-extrabold">Aggregate Sustainability index</span>
                <p className="text-xs text-headerText font-sans font-medium mt-0.5 leading-snug">
                  Integrated scoring across environmental health, resource allocation, and carbon parameters.
                </p>
              </div>
            </div>

            {/* Live Progress Bar meters */}
            <div className="space-y-3.5">
              
              {/* Air Quality Level */}
              <div>
                <div className="flex justify-between items-center text-[10px] font-bold text-cardTextMuted mb-1 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Wind className="w-3.5 h-3.5 text-pollen" /> Air Quality (AQI)</span>
                  <span className="text-headerText font-medium font-serif-metric italic">
                    <span className="text-sm font-bold font-serif-metric">{currentlySelectedEcologicalNode.metrics.aqi}</span> Index
                  </span>
                </div>
                <div className="w-full h-1.5 bg-bgCard rounded-full overflow-hidden border border-borderMuted">
                  <div 
                    className="h-full bg-ember rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(currentlySelectedEcologicalNode.metrics.aqi / 3, 100)}%` }}
                  />
                </div>
              </div>

              {/* Canopy Cover Density */}
              <div>
                <div className="flex justify-between items-center text-[10px] font-bold text-cardTextMuted mb-1 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Trees className="w-3.5 h-3.5 text-canopy" /> Green Canopy Cover</span>
                  <span className="text-headerText font-medium font-serif-metric italic">
                    <span className="text-sm font-bold font-serif-metric">{currentlySelectedEcologicalNode.metrics.greenCover}%</span> Density
                  </span>
                </div>
                <div className="w-full h-1.5 bg-bgCard rounded-full overflow-hidden border border-borderMuted">
                  <div 
                    className="h-full bg-canopy rounded-full transition-all duration-700"
                    style={{
                      width: `${currentlySelectedEcologicalNode.metrics.greenCover}%`,
                      filter: 'drop-shadow(0 0 2px var(--color-canopy))'
                    }}
                  />
                </div>
              </div>

              {/* Renewable Energy */}
              <div>
                <div className="flex justify-between items-center text-[10px] font-bold text-cardTextMuted mb-1 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><BatteryCharging className="w-3.5 h-3.5 text-rain" /> Renewable Share</span>
                  <span className="text-headerText font-medium font-serif-metric italic">
                    <span className="text-sm font-bold font-serif-metric">{currentlySelectedEcologicalNode.metrics.renewableEnergy}%</span> Active
                  </span>
                </div>
                <div className="w-full h-1.5 bg-bgCard rounded-full overflow-hidden border border-borderMuted">
                  <div 
                    className="h-full bg-rain rounded-full transition-all duration-700"
                    style={{ width: `${currentlySelectedEcologicalNode.metrics.renewableEnergy}%` }}
                  />
                </div>
              </div>

              {/* Carbon Emissions footprint */}
              <div>
                <div className="flex justify-between items-center text-[10px] font-bold text-cardTextMuted mb-1 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-ember" /> Annual CO2 Emissions</span>
                  <span className="text-headerText font-medium font-serif-metric italic">
                    <span className="text-sm font-bold font-serif-metric">{currentlySelectedEcologicalNode.metrics.carbonEmissions}M</span> t/yr
                  </span>
                </div>
                <div className="w-full h-1.5 bg-bgCard rounded-full overflow-hidden border border-borderMuted">
                  <div 
                    className="h-full bg-ember rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(currentlySelectedEcologicalNode.metrics.carbonEmissions * 2.5, 100)}%` }}
                  />
                </div>
              </div>

              {/* Water Intensity Index */}
              <div>
                <div className="flex justify-between items-center text-[10px] font-bold text-cardTextMuted mb-1 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Droplet className="w-3.5 h-3.5 text-rain" /> Water Intensity</span>
                  <span className="text-headerText font-medium font-serif-metric italic">
                    <span className="text-sm font-bold font-serif-metric">{currentlySelectedEcologicalNode.metrics.waterConsumption}</span> L/cap
                  </span>
                </div>
                <div className="w-full h-1.5 bg-bgCard rounded-full overflow-hidden border border-borderMuted">
                  <div 
                    className="h-full bg-rain rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(currentlySelectedEcologicalNode.metrics.waterConsumption / 2.2, 100)}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Trigger Button launch */}
            <button 
              onClick={() => onSelectCity(currentlySelectedEcologicalNode)}
              className="w-full btn-cyber py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 mt-4 hover:shadow-accentGreen/20 transition-all duration-300"
            >
              <Eye className="w-4 h-4 shrink-0" />
              Launch Active Node Simulator
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
