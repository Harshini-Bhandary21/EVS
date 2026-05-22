import React, { useState, useEffect } from "react";
import type { CityData } from "../data/cities";
import { Sliders, RefreshCw, BarChart2, ShieldCheck, HelpCircle, AlertTriangle } from "lucide-react";
import { API_BASE_URL } from "../config";

interface DigitalTwinStudioProps {
  city: CityData;
}

export default function DigitalTwinStudio({ city }: DigitalTwinStudioProps) {
  // Simulator input parameters
  const [treeCover, setTreeCover] = useState(city.metrics.greenCover);
  const [trafficReduction, setTrafficReduction] = useState(0); // in percent change
  const [waterHarvesting, setWaterHarvesting] = useState(25); // initial simulated level
  const [solarAdoption, setSolarAdoption] = useState(city.metrics.renewableEnergy);
  const [populationGrowth, setPopulationGrowth] = useState(20); // projected percent growth for 2050

  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [simLogs, setSimLogs] = useState<string>("");

  // Simulated Outputs
  const [projectedScore, setProjectedScore] = useState(70);
  const [projectedCarbon, setProjectedCarbon] = useState(city.metrics.carbonEmissions);
  const [projectedWater, setProjectedWater] = useState(city.metrics.waterConsumption);
  const [projectedAqi, setProjectedAqi] = useState(city.metrics.aqi);
  const [climateRisk, setClimateRisk] = useState("Moderate");

  // Baseline score calculation
  const getBaselineScore = () => {
    return Math.round(
      (city.dna.environmentalHealth + 
       city.dna.waterResilience + 
       city.dna.carbonBalance + 
       city.dna.climateReadiness + 
       city.dna.urbanEfficiency) / 5
    );
  };

  const baselineScore = getBaselineScore();

  // Reset inputs when selected city changes
  useEffect(() => {
    setTreeCover(city.metrics.greenCover);
    setSolarAdoption(city.metrics.renewableEnergy);
    setTrafficReduction(0);
    setWaterHarvesting(25);
    setPopulationGrowth(20);
    
    // Automatically trigger run on load to show baseline simulation
    runSimulationLogic(city.metrics.greenCover, 0, 25, city.metrics.renewableEnergy, 20);
  }, [city]);

  const runSimulationLogic = (
    green: number,
    traffic: number,
    water: number,
    solar: number,
    pop: number
  ) => {
    const treeImpact = (green - city.metrics.greenCover) * 1.2;
    const trafficImpact = traffic * -0.8; 
    const waterImpact = water * 0.4;
    const solarImpact = (solar - city.metrics.renewableEnergy) * 0.5;
    const popImpact = pop * -0.4;

    const scoreDelta = treeImpact + trafficImpact + waterImpact + solarImpact + popImpact;
    const finalScore = Math.max(10, Math.min(99, Math.round(baselineScore + scoreDelta)));

    const aqiDelta = -(green - city.metrics.greenCover) * 1.5 - traffic * 1.2 + pop * 0.6;
    const finalAqi = Math.max(30, Math.min(450, Math.round(city.metrics.aqi + aqiDelta)));

    const carbonDelta = -(green - city.metrics.greenCover) * 0.15 + traffic * 0.10 - (solar - city.metrics.renewableEnergy) * 0.08 + pop * 0.06;
    const finalCarbon = parseFloat(Math.max(1.5, city.metrics.carbonEmissions + carbonDelta).toFixed(1));

    const waterDelta = -(water - 25) * 0.5 + pop * 0.4;
    const finalWater = Math.max(80, Math.round(city.metrics.waterConsumption + waterDelta));

    setProjectedScore(finalScore);
    setProjectedAqi(finalAqi);
    setProjectedCarbon(finalCarbon);
    setProjectedWater(finalWater);

    if (finalScore > 75) setClimateRisk("Low");
    else if (finalScore > 55) setClimateRisk("Moderate");
    else setClimateRisk("High");
  };

  const handleSimulateClick = () => {
    setIsSimulating(true);
    setSimProgress(0);
    setSimLogs("Loading parameters...");

    const logSteps = [
      "Analyzing canopy ratios...",
      "Modeling vehicular emission cutbacks...",
      "Evaluating water harvesting capacity...",
      "Processing solar target projections...",
      "Finalizing multi-variable forecasts..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          fetch(`${API_BASE_URL}/api/predict/sustainability`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              treeCover,
              trafficReduction,
              waterHarvesting,
              solarAdoption,
              populationGrowth,
              baselineScore,
              baselineCarbon: city.metrics.carbonEmissions,
              baselineWater: city.metrics.waterConsumption,
              baselineAqi: city.metrics.aqi
            })
          })
            .then((res) => {
              if (!res.ok) throw new Error("Simulation endpoint failed");
              return res.json();
            })
            .then((data) => {
              setProjectedScore(data.score);
              setProjectedCarbon(data.carbon);
              setProjectedWater(data.water);
              setProjectedAqi(data.aqi);
              setClimateRisk(data.climateRisk);
              setIsSimulating(false);
            })
            .catch((err) => {
              console.warn("[ECOSPHERE] Simulation endpoint offline, running local mock fallback.", err);
              runSimulationLogic(treeCover, trafficReduction, waterHarvesting, solarAdoption, populationGrowth);
              setIsSimulating(false);
            });
          
          return 100;
        }
        
        if (prev % 20 === 0 && currentStep < logSteps.length) {
          setSimLogs(logSteps[currentStep]);
          currentStep++;
        }

        return prev + 5;
      });
    }, 80);
  };

  return (
    <div className="hud-panel p-6 flex flex-col gap-6">
      <div className="border-b border-borderMuted pb-4">
        <span className="text-[10px] font-bold text-accentGreen tracking-wider uppercase block">Interactive Modeling</span>
        <h3 className="text-base font-extrabold text-headerText tracking-tight flex items-center gap-2">
          <Sliders className="w-4 h-4 text-accentGreen" />
          Impact Simulator
        </h3>
        <p className="text-xs text-cardTextMuted mt-0.5 font-normal">
          Simulate future environmental outcomes by adjusting regional urban planning policies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders Controls (Left Panel) */}
        <div className="lg:col-span-6 bg-bgDeep border border-borderMuted p-5 rounded-xl space-y-5 text-xs font-semibold shadow-inner">
          
          <h4 className="font-extrabold text-headerText tracking-wider text-[10px] uppercase border-b border-borderMuted pb-2 flex items-center justify-between">
            <span>Planning Parameters</span>
            <span className="text-accentGreen">Interactive Controls</span>
          </h4>

          {/* Slider 1: Tree Cover */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span className="text-accentGreen">● Tree Canopy Cover</span>
              <span className="text-headerText">{treeCover}% (Base: {city.metrics.greenCover}%)</span>
            </div>
            <input 
              type="range" 
              min={city.metrics.greenCover} 
              max="65" 
              value={treeCover}
              onChange={(e) => setTreeCover(parseInt(e.target.value))}
              disabled={isSimulating}
              className="w-full accent-accentGreen bg-bgCard border border-borderMuted rounded h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[8px] text-cardTextMuted font-bold tracking-wider">
              <span>CURRENT LEVEL</span>
              <span>MAX TARGET</span>
            </div>
          </div>

          {/* Slider 2: Traffic reduction */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span className="text-rose-600">● Traffic Emission Reduction</span>
              <span className="text-headerText">{Math.abs(trafficReduction)}% Reduced</span>
            </div>
            <input 
              type="range" 
              min="-40" 
              max="0" 
              value={trafficReduction}
              onChange={(e) => setTrafficReduction(parseInt(e.target.value))}
              disabled={isSimulating}
              className="w-full accent-rose-600 bg-bgCard border border-borderMuted rounded h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[8px] text-cardTextMuted font-bold tracking-wider">
              <span>MAX REDUCTION (-40%)</span>
              <span>NO INTERVENTION (0%)</span>
            </div>
          </div>

          {/* Slider 3: Water Harvesting */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span className="text-accentBlue">● Rainwater Harvesting Expansion</span>
              <span className="text-headerText">+{waterHarvesting}% CAPACITY</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={waterHarvesting}
              onChange={(e) => setWaterHarvesting(parseInt(e.target.value))}
              disabled={isSimulating}
              className="w-full accent-accentBlue bg-bgCard border border-borderMuted rounded h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[8px] text-cardTextMuted font-bold tracking-wider">
              <span>NO ACTION</span>
              <span>MAXIMUM CAPACITY</span>
            </div>
          </div>

          {/* Slider 4: Solar rooftops */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span className="text-accentPurple">● Solar Rooftop Target</span>
              <span className="text-headerText">{solarAdoption}% (Base: {city.metrics.renewableEnergy}%)</span>
            </div>
            <input 
              type="range" 
              min={city.metrics.renewableEnergy} 
              max="80" 
              value={solarAdoption}
              onChange={(e) => setSolarAdoption(parseInt(e.target.value))}
              disabled={isSimulating}
              className="w-full accent-accentPurple bg-bgCard border border-borderMuted rounded h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[8px] text-cardTextMuted font-bold tracking-wider">
              <span>CURRENT LEVEL</span>
              <span>GRID LIMIT CAP (80%)</span>
            </div>
          </div>

          {/* Slider 5: Population Growth */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span className="text-amber-600">● Projected Population Growth</span>
              <span className="text-headerText">+{populationGrowth}% GROWTH</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={populationGrowth}
              onChange={(e) => setPopulationGrowth(parseInt(e.target.value))}
              disabled={isSimulating}
              className="w-full accent-amber-600 bg-bgCard border border-borderMuted rounded h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[8px] text-cardTextMuted font-bold tracking-wider">
              <span>STAGNANT</span>
              <span>RAPID DENSITY (+100%)</span>
            </div>
          </div>

          {/* Simulate Action Button */}
          <button
            onClick={handleSimulateClick}
            disabled={isSimulating}
            className={`w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 border transition-all duration-300 ${
              isSimulating
                ? "bg-bgCard text-cardTextMuted border-borderMuted cursor-not-allowed"
                : "bg-accentGreen/10 border-accentGreen/30 text-accentGreen hover:bg-accentGreen hover:text-white hover:border-accentGreen shadow-sm active:scale-[0.98]"
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isSimulating ? "animate-spin" : ""}`} />
            {isSimulating ? "Running Projections..." : "Simulate Outcomes"}
          </button>

        </div>

        {/* Dynamic Simulation Outputs (Right Panel) */}
        <div className="lg:col-span-6 flex flex-col gap-5 justify-between self-stretch h-full">
          
          {isSimulating ? (
            <div className="bg-bgDeep border border-borderMuted rounded-xl p-6 flex-grow flex flex-col justify-center items-center h-[330px] shadow-inner">
              <RefreshCw className="w-12 h-12 text-accentGreen animate-spin mb-4" />
              <h4 className="text-sm font-bold text-headerText tracking-widest uppercase">Running Projections</h4>
              <p className="text-[10px] text-accentGreen mt-2 tracking-wide animate-pulse font-semibold">
                {simLogs}
              </p>
              
              <div className="w-[85%] bg-bgCard h-2 rounded-full overflow-hidden mt-6 border border-borderMuted shadow-sm">
                <div 
                  className="bg-accentGreen h-full rounded transition-all duration-100" 
                  style={{ width: `${simProgress}%` }}
                />
              </div>
              <span className="text-[11px] text-cardTextMuted mt-1 font-bold">{simProgress}% COMPLETE</span>
            </div>
          ) : (
            <div className="bg-bgCard border border-borderMuted rounded-xl p-5 space-y-4 flex-grow flex flex-col justify-between shadow-sm">
              
              <div className="flex items-center justify-between border-b border-borderMuted pb-2.5">
                <h4 className="text-xs font-bold text-headerText tracking-wider flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-accentGreen" />
                  Projected Outcomes
                </h4>
                <span className="text-[9px] font-bold bg-accentGreen/10 text-accentGreen border border-accentGreen/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Simulation Active
                </span>
              </div>

              {/* Grid indicators (Baseline vs Projected) */}
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                
                {/* Score Dial */}
                <div className="bg-bgDeep p-3 rounded-xl border border-borderMuted text-center flex flex-col justify-between shadow-inner">
                  <span className="block text-[9px] text-cardTextMuted uppercase tracking-wider">Overall Resilience</span>
                  <div className="flex items-baseline justify-center gap-1.5 my-2">
                    <span className="text-2xl font-extrabold text-headerText">{projectedScore}</span>
                    <span className="text-[10px] text-cardTextMuted">/100</span>
                  </div>
                  <span className={`text-[9px] font-bold ${
                    projectedScore > baselineScore ? "text-accentGreen" : projectedScore === baselineScore ? "text-cardTextMuted/70" : "text-red-500"
                  }`}>
                    {projectedScore > baselineScore ? `+${projectedScore - baselineScore} pts Improvement` : projectedScore === baselineScore ? "No Change" : `${projectedScore - baselineScore} pts Decrease`}
                  </span>
                </div>

                {/* AQI Indicator */}
                <div className="bg-bgDeep p-3 rounded-xl border border-borderMuted text-center flex flex-col justify-between shadow-inner">
                  <span className="block text-[9px] text-cardTextMuted uppercase tracking-wider">Projected AQI</span>
                  <span className="text-2xl font-extrabold text-headerText my-2">{projectedAqi}</span>
                  <span className={`text-[9px] font-bold ${
                    projectedAqi < city.metrics.aqi ? "text-accentGreen" : projectedAqi === city.metrics.aqi ? "text-cardTextMuted/70" : "text-red-500"
                  }`}>
                    {projectedAqi < city.metrics.aqi ? `${city.metrics.aqi - projectedAqi} AQI Drop` : projectedAqi === city.metrics.aqi ? "No Change" : `+${projectedAqi - city.metrics.aqi} AQI Increase`}
                  </span>
                </div>

                {/* Carbon Footprint */}
                <div className="bg-bgDeep p-3 rounded-xl border border-borderMuted text-center flex flex-col justify-between shadow-inner">
                  <span className="block text-[9px] text-cardTextMuted uppercase tracking-wider">Projected Carbon</span>
                  <span className="text-2xl font-extrabold text-headerText my-2">{projectedCarbon} Mt</span>
                  <span className={`text-[9px] font-bold ${
                    projectedCarbon < city.metrics.carbonEmissions ? "text-accentGreen" : projectedCarbon === city.metrics.carbonEmissions ? "text-cardTextMuted/70" : "text-red-500"
                  }`}>
                    {projectedCarbon < city.metrics.carbonEmissions ? "Reduced Footprint" : "Increased Footprint"}
                  </span>
                </div>

                {/* Water Availability */}
                <div className="bg-bgDeep p-3 rounded-xl border border-borderMuted text-center flex flex-col justify-between shadow-inner">
                  <span className="block text-[9px] text-cardTextMuted uppercase tracking-wider">Projected Water</span>
                  <span className="text-2xl font-extrabold text-headerText my-2">{projectedWater} Lpd</span>
                  <span className={`text-[9px] font-bold ${
                    projectedWater < city.metrics.waterConsumption ? "text-accentGreen" : "text-red-500"
                  }`}>
                    {projectedWater < city.metrics.waterConsumption ? "Reduced Demand" : "Increased Demand"}
                  </span>
                </div>

              </div>

              {/* Climate Risk Index HUD */}
              <div className="bg-bgDeep p-3.5 rounded-xl border border-borderMuted flex items-center justify-between text-xs font-semibold shadow-inner">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${
                    climateRisk === "High" ? "text-red-600" : climateRisk === "Moderate" ? "text-amber-600" : "text-accentGreen"
                  }`} />
                  <div>
                    <span className="block text-[8px] text-cardTextMuted uppercase tracking-wider">Climate Risk Classification</span>
                    <span className="text-headerText font-extrabold">{climateRisk} Danger Level</span>
                  </div>
                </div>
                <div className="bg-bgCard px-3 py-1 rounded-full border border-borderMuted font-bold text-headerText uppercase text-[9px] shadow-sm tracking-wider">
                  {climateRisk === "Low" ? "Stable" : "Attention Required"}
                </div>
              </div>

            </div>
          )}

          {/* Decision Support system notes */}
          <div className="bg-bgDeep border border-borderMuted p-4 rounded-xl flex gap-3 text-[11px] text-cardTextMuted leading-relaxed shadow-inner">
            <ShieldCheck className="w-5 h-5 text-accentGreen shrink-0" />
            <div>
              <span className="text-headerText font-extrabold block uppercase text-[9px] tracking-wider">Planning Guidance</span>
              Achieving the carbon neutrality target requires maintaining green cover above 35% and enforcing strict vehicle corridors.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
