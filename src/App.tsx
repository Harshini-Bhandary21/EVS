import React, { useState, useEffect } from "react";
import { CITIES_DATA, type CityData } from "./data/cities";
import IndiaPulse from "./components/IndiaPulse";
import MissionControl from "./components/MissionControl";
import DnaHelix from "./components/DnaHelix";
import CarbonTwin from "./components/CarbonTwin";
import DigitalTwinStudio from "./components/DigitalTwinStudio";
import ScoreAndPipeline from "./components/ScoreAndPipeline";
import GenomeOptimizer from "./components/GenomeOptimizer";
import TimelineAndResearch from "./components/TimelineAndResearch";
import AIAssistantAndReport from "./components/AIAssistantAndReport";
import PuneMicroPulse from "./components/PuneMicroPulse";
import NatureParticleBackground from "./components/NatureParticleBackground";
import IndiaMap from "./components/IndiaMap";
import { 
  Globe2, Cpu, Radio, Shield, HelpCircle, 
  Activity, ArrowRight, Grid, Zap, Server, Sun, Moon, Leaf
} from "lucide-react";
import { API_BASE_URL } from "./config";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [citiesList, setCitiesList] = useState<CityData[]>(CITIES_DATA);
  const [selectedCity, setSelectedCity] = useState<CityData>(CITIES_DATA[0]); // default: Pune
  const [viewMode, setViewMode] = useState<"landing" | "workspace">("landing");
  const [activeTab, setActiveTab] = useState<"control" | "twin" | "studio" | "pipeline" | "genome" | "systems" | "pune-micro">("control");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cities`)
      .then((res) => {
        if (!res.ok) throw new Error("Backend response error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCitiesList(data);
          setSelectedCity((prev) => {
            const found = data.find((c) => c.id === prev.id);
            return found || data[0];
          });
        }
      })
      .catch((err) => {
        console.warn("[ECOSPHERE] Backend offline or proxy error, using static local fallback.", err);
      });
  }, []);

  const enterWorkspace = () => {
    setViewMode("workspace");
    setTimeout(() => {
      document.getElementById("workspace-hub")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const activeAverageScore = Math.round(
    (selectedCity.dna.environmentalHealth + 
     selectedCity.dna.waterResilience + 
     selectedCity.dna.carbonBalance + 
     selectedCity.dna.climateReadiness + 
     selectedCity.dna.urbanEfficiency) / 5
  );

  return (
    <div className="min-h-screen bg-bgDeep text-neutralText relative overflow-x-hidden selection:bg-accentGreen/30 selection:text-white font-sans">
      
      {/* Nature organic glowing ambient background elements */}
      <div className="absolute top-[10%] left-[5%] nature-glowing-blob-1 pointer-events-none" />
      <div className="absolute bottom-[25%] right-[5%] nature-glowing-blob-2 pointer-events-none" />
      <div className="absolute top-[55%] left-[50%] -translate-x-1/2 nature-glowing-blob-1 pointer-events-none" style={{ opacity: 0.35 }} />

      {/* Living Forest Breeze Spores physics canvas animation overlay */}
      <NatureParticleBackground />

      {/* --- CINEMATIC LANDING HERO EXPERIENCE --- */}
      {viewMode === "landing" && (
        <section className="min-h-screen flex flex-col justify-between items-center relative z-10 px-6 py-8">
          {/* Header */}
          <header className="w-full max-w-[80vw] flex items-center justify-between border-b border-borderMuted pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-accentGreen/10 border border-accentGreen/20 flex items-center justify-center text-accentGreen">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-brand text-lg font-extrabold text-headerText tracking-tight">EcoSphere</span>
                <span className="block text-[10px] font-sans font-medium text-cardTextMuted tracking-tight">Urban Sustainability & Environmental Intelligence</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 font-sans text-xs text-cardTextMuted font-medium">
              <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-accentGreen" /> Environmental Registry Active</span>
              <span className="flex items-center gap-1.5"><Server className="w-4 h-4 text-accentBlue" /> Real-Time Data Feed</span>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={enterWorkspace} className="btn-cyber font-bold">
                <Cpu className="w-4 h-4" />
                Launch Platform
              </button>

              <button
                onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
                className="w-10 h-10 rounded-lg border border-borderMuted bg-bgCard hover:bg-neutralText/10 text-neutralText flex items-center justify-center transition-all duration-300 shadow-sm"
                title="Toggle Theme"
              >
                {theme === "light" ? <Moon className="w-5 h-5 text-accentPurple" /> : <Sun className="w-5 h-5 text-accentGreen" />}
              </button>
            </div>
          </header>

          {/* Immersive Landing Maps */}
          <main className="w-full max-w-[80vw] flex-grow flex flex-col justify-center my-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
              
              {/* Text Callouts */}
              <div className="lg:col-span-5 text-left space-y-6 animate-fadeInUp">
                <span className="bg-accentGreen/10 text-accentGreen border border-accentGreen/20 px-3.5 py-1 rounded-full font-sans text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accentGreen" />
                  Urban Environmental Intelligence
                </span>
                <h1 className="text-4xl md:text-5xl font-brand font-black text-headerText tracking-tight leading-tight">
                  Transforming Cities Through <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accentGreen via-accentBlue to-accentPurple animate-gradientFlow">
                    Advanced Environmental & Carbon Modeling
                  </span>
                </h1>
                <p className="text-sm font-sans text-cardTextMuted max-w-xl leading-relaxed">
                  Real-time environmental diagnostics, sustainability indexing, predictive carbon scoring, and policy simulation tools designed for planners, civic bodies, and regional officers.
                </p>
                
                {/* Landing page triggers */}
                <div className="flex flex-wrap justify-start gap-4 pt-2 text-xs font-semibold">
                  <button onClick={enterWorkspace} className="btn-cyber-blue py-3 px-8 text-sm font-bold flex items-center gap-2 shadow-lg shadow-accentBlue/20">
                    Explore Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Interactive Stylized India Map with Beacons */}
              <div className="lg:col-span-7 w-full animate-scaleIn">
                <IndiaMap 
                  selectedCity={selectedCity} 
                  onSelectCity={(city) => {
                    setSelectedCity(city);
                    enterWorkspace();
                  }} 
                />
              </div>

            </div>
          </main>

          {/* Footer Telemetries */}
          <footer className="w-full max-w-[80vw] border-t border-borderMuted pt-4 flex flex-col md:flex-row items-start justify-between gap-6 font-sans text-[11px] text-cardTextMuted font-medium">
            <div className="flex flex-col gap-1">
              <span className="font-extrabold text-[12px] text-headerText">MITAOE</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-1 text-[10.5px]">
                <span>Madhura Patil (202401040094)</span>
                <span>Harshini Bhandary (202401040151)</span>
                <span>Om Shinkar (202401040177)</span>
                <span>Parth Shingane (202401040210)</span>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1 shrink-0 text-[10.5px]">
              <span>Data Source: Central Pollution Control Board (CPCB)</span>
              <span>© 2026 EcoSphere. Built for clean and resilient cities.</span>
            </div>
          </footer>
        </section>
      )}

      {/* --- WORKSPACE COMMAND CENTER HUB --- */}
      {viewMode === "workspace" && (
        <section id="workspace-hub" className="min-h-screen relative z-10 flex flex-col justify-between px-6 py-6 max-w-[80vw] mx-auto w-full gap-8">
          
          {/* Main workspace header */}
          <header className="w-full flex flex-col md:flex-row items-center justify-between border-b border-borderMuted pb-4 gap-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode("landing")}>
              <Globe2 className="w-7 h-7 text-accentGreen shrink-0" />
              <div>
                <h2 className="font-brand text-lg font-extrabold text-headerText tracking-tight">EcoSphere</h2>
                <span className="block text-[10px] font-sans font-medium text-cardTextMuted tracking-tight">Urban Sustainability & Environmental Intelligence</span>
              </div>
            </div>

            {/* City Selection dynamic controls */}
            <div className="flex flex-wrap items-center gap-4 bg-bgCard border border-borderMuted px-4 py-2 rounded-xl">
              <span className="font-sans text-[10px] font-bold text-cardTextMuted uppercase tracking-wider">Active Region:</span>
              <div className="flex gap-2">
                {citiesList.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1 rounded-full font-sans text-xs font-bold border transition-all duration-200 ${
                      selectedCity.id === city.id
                        ? "bg-bgDeep text-accentGreen border-accentGreen"
                        : "bg-bgCard text-cardTextMuted border-borderMuted hover:text-headerText hover:border-accentGreen/30"
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setViewMode("landing")} className="btn-cyber px-4 py-2 font-bold">
                ➔ Back to Overview
              </button>

              <button
                onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
                className="w-10 h-10 rounded-lg border border-borderMuted bg-bgCard hover:bg-neutralText/10 text-neutralText flex items-center justify-center transition-all duration-300 shadow-sm"
                title="Toggle Theme"
              >
                {theme === "light" ? <Moon className="w-5 h-5 text-accentPurple" /> : <Sun className="w-5 h-5 text-accentGreen" />}
              </button>
            </div>
          </header>

          {/* Main workspace layout container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full flex-grow">
            
            {/* Sidebar Navigation Capsule Deck */}
            <div className="lg:col-span-3 nav-capsule-deck-vertical font-sans">
              <span className="text-[9px] font-black text-accentGreen uppercase tracking-widest px-2.5 mb-2.5 block border-b border-borderMuted pb-2 select-none">
                Navigation Systems
              </span>
              <button
                onClick={() => setActiveTab("control")}
                className={`nav-capsule-btn-vertical ${
                  activeTab === "control" ? "nav-capsule-btn-vertical-active" : ""
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-accentGreen shrink-0" />
                <span>Operations Center</span>
              </button>
              <button
                onClick={() => setActiveTab("twin")}
                className={`nav-capsule-btn-vertical ${
                  activeTab === "twin" ? "nav-capsule-btn-vertical-active" : ""
                }`}
              >
                <Radio className="w-3.5 h-3.5 text-accentBlue shrink-0" />
                <span>Resilience & Carbon</span>
              </button>
              <button
                onClick={() => setActiveTab("studio")}
                className={`nav-capsule-btn-vertical ${
                  activeTab === "studio" ? "nav-capsule-btn-vertical-active" : ""
                }`}
              >
                <Grid className="w-3.5 h-3.5 text-accentPurple shrink-0" />
                <span>Resource Scenarios</span>
              </button>
              <button
                onClick={() => setActiveTab("pipeline")}
                className={`nav-capsule-btn-vertical ${
                  activeTab === "pipeline" ? "nav-capsule-btn-vertical-active" : ""
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-accentBlue shrink-0" />
                <span>Predictive Modeling</span>
              </button>
              <button
                onClick={() => setActiveTab("genome")}
                className={`nav-capsule-btn-vertical ${
                  activeTab === "genome" ? "nav-capsule-btn-vertical-active" : ""
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-accentPurple shrink-0" />
                <span>Policy Optimization</span>
              </button>
              <button
                onClick={() => setActiveTab("systems")}
                className={`nav-capsule-btn-vertical ${
                  activeTab === "systems" ? "nav-capsule-btn-vertical-active" : ""
                }`}
              >
                <Server className="w-3.5 h-3.5 text-accentGreen shrink-0" />
                <span>Research & Assistance</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("pune-micro");
                  const puneCity = citiesList.find((c) => c.id === "pune");
                  if (puneCity) {
                    setSelectedCity(puneCity);
                  }
                }}
                className={`nav-capsule-btn-vertical ${
                  activeTab === "pune-micro" ? "nav-capsule-btn-vertical-active" : ""
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-accentGreen shrink-0" />
                <span>Pune Micro-Pulse</span>
              </button>
            </div>

            {/* Core workspace display panels */}
            <main className="lg:col-span-9 w-full relative z-10 transition-all duration-300 animate-fadeInUp">
              {activeTab === "control" && (
                <MissionControl selectedCity={selectedCity} onSelectCity={setSelectedCity} />
              )}
              
              {activeTab === "twin" && (
                <div className="flex flex-col gap-6">
                  <DnaHelix dna={selectedCity.dna} cityName={selectedCity.name} />
                  <CarbonTwin metrics={selectedCity.metrics} cityName={selectedCity.name} />
                </div>
              )}
              
              {activeTab === "studio" && (
                <DigitalTwinStudio city={selectedCity} />
              )}
              
              {activeTab === "pipeline" && (
                <ScoreAndPipeline city={selectedCity} />
              )}
              
              {activeTab === "genome" && (
                <GenomeOptimizer city={selectedCity} />
              )}
              
              {activeTab === "systems" && (
                <div className="flex flex-col gap-6">
                  <AIAssistantAndReport city={selectedCity} />
                  <TimelineAndResearch city={selectedCity} />
                </div>
              )}

              {activeTab === "pune-micro" && (
                <PuneMicroPulse />
              )}
            </main>
          </div>

          {/* Workspace Footer */}
          <footer className="w-full border-t border-borderMuted pt-4 flex flex-col md:flex-row items-start justify-between gap-6 font-semibold text-[10px] text-cardTextMuted mt-6">
            <div className="flex flex-col gap-1">
              <span className="font-black text-[11px] text-headerText">MITAOE</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-[9.5px]">
                <span>Madhura Patil (202401040094)</span>
                <span>Harshini Bhandary (202401040151)</span>
                <span>Om Shinkar (202401040177)</span>
                <span>Parth Shingane (202401040210)</span>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1 shrink-0 text-left md:text-right">
              <div className="flex items-center gap-4">
                <span>Active Region: {selectedCity.name}</span>
                <span>Aggregate Index: {activeAverageScore}%</span>
              </div>
              <span>Scale: WGS84 Reference | Model Level: Verified ESG Standard</span>
            </div>
          </footer>
        </section>
      )}

    </div>
  );
}
