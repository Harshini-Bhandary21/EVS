import React, { useState } from "react";
import type { CityData } from "../data/cities";
import { 
  Calendar, BookOpen, ChevronRight, Award, Compass, 
  Wind, ShieldCheck, HelpCircle, Activity 
} from "lucide-react";

interface TimelineAndResearchProps {
  city: CityData;
}

export default function TimelineAndResearch({ city }: TimelineAndResearchProps) {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [activeTab, setActiveTab] = useState<"timeline" | "research">("timeline");

  const activeYearData = city.history.find((h) => h.year === selectedYear) || city.history[city.history.length - 1];

  const researchTopics = [
    {
      title: "National Ambient Air Quality Standards (NAAQS)",
      desc: "Specifies PM2.5 ceiling standard limits. Identifies acceptable PM2.5 levels under 40 µg/m³ annually, PM10 under 60 µg/m³, and NO2 under 40 µg/m³ to preserve cardiorespiratory health.",
      metric: "Target: PM2.5 < 40 µg/m³"
    },
    {
      title: "Central Pollution Control Board Noise Regulations",
      desc: "Limits day/night noise limits across urban zoning: Industrial (75/70 dB), Commercial (65/55 dB), Residential (55/45 dB), and Silence Zones (50/40 dB) to combat acoustic stress.",
      metric: "Silence limit: < 50 dB Day"
    },
    {
      title: "Environmental Impact Assessment (EIA) Framework",
      desc: "Mandates multi-stage evaluations for developmental projects: Screening, Scoping, Impact Analysis, Mitigation Planning, Public Hearing, and Post-Project Monitoring.",
      metric: "ISO 14001 Compliant"
    },
    {
      title: "Carbon Offset & Sequestration Algorithms",
      desc: "Calculates carbon capacity index. A single mature tree absorbs roughly 22kg CO2 annually. 1 hectare of urban park sequestering 12.8 tonnes of greenhouse emissions annually.",
      metric: "Sequestration: ~22kg/tree/yr"
    }
  ];

  return (
    <div className="hud-panel p-6 flex flex-col gap-6">
      
      {/* Sub-tab Navigation */}
      <div className="flex items-center justify-between border-b border-borderMuted pb-3">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`text-sm font-bold pb-2 transition-all border-b-2 ${
              activeTab === "timeline"
                ? "text-accentGreen border-accentGreen"
                : "text-cardTextMuted border-transparent hover:text-headerText"
            }`}
          >
            Environmental Timeline
          </button>
          
          <button
            onClick={() => setActiveTab("research")}
            className={`text-sm font-bold pb-2 transition-all border-b-2 ${
              activeTab === "research"
                ? "text-accentBlue border-accentBlue"
                : "text-cardTextMuted border-transparent hover:text-headerText"
            }`}
          >
            Standards & Guidelines
          </button>
        </div>

        <span className="text-[10px] font-semibold text-cardTextMuted uppercase hidden md:inline tracking-wider">
          {activeTab === "timeline" ? "Data coverage: 2000 → 2026" : "Regulatory Standards"}
        </span>
      </div>

      {activeTab === "timeline" ? (
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-bold text-accentGreen tracking-wider uppercase block">Development Trend</span>
            <h3 className="text-base font-extrabold text-headerText tracking-tight">
              {city.name} Historical Environmental Trend
            </h3>
            <p className="text-xs text-cardTextMuted mt-1">
              Select a year below to view historical changes in air quality, tree canopy density, and annual carbon emissions.
            </p>
          </div>

          {/* Interactive Horizontal Timeline Bar */}
          <div className="flex justify-between items-center bg-bgDeep/40 p-4 rounded-xl border border-borderMuted relative my-4 overflow-x-auto gap-4">
            <div className="absolute left-6 right-6 h-[1.5px] bg-borderMuted top-1/2 -translate-y-1/2 pointer-events-none" />
            
            {city.history.map((h) => {
              const isActive = selectedYear === h.year;
              return (
                <button
                  key={h.year}
                  onClick={() => setSelectedYear(h.year)}
                  className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center text-[11px] font-bold border transition-all duration-200 ${
                    isActive 
                      ? "bg-accentGreen border-accentGreen text-white scale-[1.08] shadow-sm" 
                      : "bg-bgCard border-borderMuted text-cardTextMuted hover:border-accentGreen/30 hover:text-headerText"
                  }`}
                >
                  {h.year}
                </button>
              );
            })}
          </div>

          {/* Chronological Coordinates Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-bgDeep/30 rounded-xl p-5 border border-borderMuted text-xs items-center">
            
            <div className="text-center md:text-left">
              <span className="text-[9px] font-bold text-accentGreen uppercase block tracking-wider">Timeline Horizon</span>
              <span className="text-2xl font-black text-headerText mt-1 block">{activeYearData.year}</span>
              <span className="text-[8px] text-cardTextMuted uppercase block mt-1 tracking-wider">Report Year</span>
            </div>

            <div className="bg-bgCard p-3 rounded-lg border border-borderMuted text-center shadow-sm">
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Average Air Quality</span>
              <span className="text-sm font-extrabold text-headerText mt-1 block">{activeYearData.aqi} AQI</span>
              <span className={`text-[8.5px] font-bold mt-1 block ${
                activeYearData.aqi > 120 ? "text-rose-600" : "text-accentGreen"
              }`}>
                {activeYearData.aqi > 120 ? "Action Needed" : "Compliant"}
              </span>
            </div>

            <div className="bg-bgCard p-3 rounded-lg border border-borderMuted text-center shadow-sm">
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Tree Canopy cover</span>
              <span className="text-sm font-extrabold text-headerText mt-1 block">{activeYearData.greenCover}%</span>
              <span className="text-[8.5px] text-cardTextMuted block mt-1">Ecosystem Health</span>
            </div>

            <div className="bg-bgCard p-3 rounded-lg border border-borderMuted text-center shadow-sm">
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">CO2 Emissions</span>
              <span className="text-sm font-extrabold text-headerText mt-1 block">{activeYearData.carbonEmissions}M tCO2e</span>
              <span className="text-[8.5px] text-cardTextMuted block mt-1">Annual Footprint</span>
            </div>

          </div>

          {/* Academic evolutionary commentary */}
          <div className="bg-bgDeep/50 p-4 rounded-xl border border-borderMuted flex gap-3 text-[11px] text-cardTextMuted leading-relaxed">
            <Activity className="w-5 h-5 text-accentGreen shrink-0" />
            <div>
              <span className="text-headerText font-extrabold block uppercase text-[9px] tracking-wider">Trend Summary</span>
              Between 2000 and 2026, {city.name} recorded a {Math.round((activeYearData.carbonEmissions - city.history[0].carbonEmissions) / city.history[0].carbonEmissions * 100)}% greenhouse emission spike due to road density expansion. However, recent urban forest canopy enforcements mitigate extreme surface heating.
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-bold text-accentBlue tracking-wider uppercase block">Reference Center</span>
            <h3 className="text-base font-extrabold text-headerText tracking-tight">
              Sustainability Guidelines & Standards Reference Library
            </h3>
            <p className="text-xs text-cardTextMuted mt-1">
              Curated regulatory frameworks, pollution caps, and environmental impact methodologies for researchers and architects.
            </p>
          </div>

          {/* Guidelines Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchTopics.map((topic, idx) => (
              <div key={idx} className="bg-bgCard p-4 rounded-xl border border-borderMuted space-y-2 flex flex-col justify-between h-[150px] shadow-sm">
                <div>
                  <h4 className="text-xs font-bold text-headerText uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-accentBlue" />
                    {topic.title}
                  </h4>
                  <p className="text-[10px] text-cardTextMuted mt-1.5 leading-relaxed overflow-hidden text-ellipsis line-clamp-3 font-normal">
                    {topic.desc}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-borderMuted pt-2 text-[9px] text-accentBlue font-medium">
                  <span>Official Standard</span>
                  <span className="font-bold bg-accentBlue/5 px-2 py-0.5 rounded border border-accentBlue/10">{topic.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
