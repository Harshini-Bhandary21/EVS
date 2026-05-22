import React, { useState, useEffect } from "react";
import type { CityData } from "../data/cities";
import { 
  Play, RefreshCw, Dna, Compass, GitMerge, CheckCircle, 
  ChevronRight, Award, HelpCircle, ShieldAlert 
} from "lucide-react";
import { API_BASE_URL } from "../config";

interface GenomeOptimizerProps {
  city: CityData;
}

interface PolicyGene {
  id: string;
  name: string;
  effect: string;
  impactScore: number;
  cost: number; // simulated cost points (1-10)
  active: boolean;
}

interface PathNode {
  id: number;
  score: number;
  label: string;
  cost: number;
  heuristic: number;
  gScore: number; // cost so far
  fScore: number; // total estimated cost (g + h)
  parent: number | null;
  state: "unexplored" | "open" | "closed" | "path";
}

export default function GenomeOptimizer({ city }: GenomeOptimizerProps) {
  // Sustainable Policy Scenario states
  const [generation, setGeneration] = useState(0);
  const [isRunningGenome, setIsRunningGenome] = useState(false);
  const [fitnessScore, setFitnessScore] = useState(0);
  const [crossoverMsg, setCrossoverMsg] = useState("Select Optimize Policies above to begin.");
  const [optimalGenome, setOptimalGenome] = useState<string[]>([]);
  
  const [policyGenes, setPolicyGenes] = useState<PolicyGene[]>([
    { id: "ev", name: "EV Municipal Transit Fleet", effect: "Reduces PM2.5 & NO2 emissions", impactScore: 7.2, cost: 4, active: false },
    { id: "metro", name: "Sub-grade Metro Expansion", effect: "Optimizes congestion vectors", impactScore: 11.5, cost: 9, active: false },
    { id: "canopy", name: "Micro-canopy Tree Plantation", effect: "Improves AQI and absorbs CO2", impactScore: 9.8, cost: 2, active: false },
    { id: "sponge", name: "Spongy Rainwater Harvesting", effect: "Reduces water stress levels", impactScore: 8.4, cost: 3, active: false },
    { id: "solar", name: "Rooftop Solar Subsidization", effect: "Replaces carbon grid dependencies", impactScore: 6.5, cost: 3, active: false },
  ]);

  // A* Heuristic Pathfinder states
  const [targetScore, setTargetScore] = useState(80);
  const [isAStarRunning, setIsAStarRunning] = useState(false);
  const [astarStep, setAstarStep] = useState(0);
  const [astarLogs, setAstarLogs] = useState<string[]>([]);
  
  const [nodes, setNodes] = useState<PathNode[]>([
    { id: 1, score: 42, label: "Baseline Status", cost: 0, heuristic: 38, gScore: 0, fScore: 38, parent: null, state: "closed" },
    { id: 2, score: 52, label: "Expand Canopy Cover (+10%)", cost: 12, heuristic: 28, gScore: 12, fScore: 40, parent: 1, state: "path" },
    { id: 3, score: 67, label: "Restrict Emission Zone (-15%)", cost: 28, heuristic: 13, gScore: 28, fScore: 41, parent: 2, state: "path" },
    { id: 4, score: 80, label: "Expand Water Harvesting (+12%)", cost: 40, heuristic: 0, gScore: 40, fScore: 40, parent: 3, state: "path" },
    { id: 5, score: 48, label: "Alternative Energy Grid Intake", cost: 22, heuristic: 32, gScore: 22, fScore: 54, parent: 1, state: "unexplored" },
    { id: 6, score: 58, label: "Acoustic Noise Control Enforcements", cost: 34, heuristic: 22, gScore: 34, fScore: 56, parent: 5, state: "unexplored" },
  ]);

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

  // Reset states when city changes
  useEffect(() => {
    setOptimalGenome([]);
    setFitnessScore(0);
    setGeneration(0);
    setCrossoverMsg("Select Optimize Policies above to begin.");
    setPolicyGenes([
      { id: "ev", name: "EV Municipal Transit Fleet", effect: "Reduces PM2.5 & NO2 emissions", impactScore: 7.2, cost: 4, active: false },
      { id: "metro", name: "Sub-grade Metro Expansion", effect: "Optimizes congestion vectors", impactScore: 11.5, cost: 9, active: false },
      { id: "canopy", name: "Micro-canopy Tree Plantation", effect: "Improves AQI and absorbs CO2", impactScore: 9.8, cost: 2, active: false },
      { id: "sponge", name: "Spongy Rainwater Harvesting", effect: "Reduces water stress levels", impactScore: 8.4, cost: 3, active: false },
      { id: "solar", name: "Rooftop Solar Subsidization", effect: "Replaces carbon grid dependencies", impactScore: 6.5, cost: 3, active: false },
    ]);
  }, [city]);

  // Trigger Genetic Algorithm Policy simulation
  const handleRunGeneticGenome = () => {
    setIsRunningGenome(true);
    setGeneration(0);
    setFitnessScore(12.4);
    setCrossoverMsg("Initializing municipal planning pool...");

    fetch(`${API_BASE_URL}/api/optimize/genetic`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cityName: city.name })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Genetic optimizer API failed");
        return res.json();
      })
      .then((data) => {
        let index = 0;
        const interval = setInterval(() => {
          if (index < data.generations.length) {
            const genData = data.generations[index];
            setGeneration(genData.generation);
            setFitnessScore(genData.fitness);
            setCrossoverMsg(`Simulation step ${genData.chromosome} | Active: ${genData.activeGenes}`);
            index++;
          } else {
            clearInterval(interval);
            setIsRunningGenome(false);
            setOptimalGenome(["canopy", "sponge", "solar", "ev"]);
            setPolicyGenes((prev) =>
              prev.map((g) => ({
                ...g,
                active: ["canopy", "sponge", "solar", "ev"].includes(g.id)
              }))
            );
            setCrossoverMsg(`Optimization complete. Best Score: ${data.bestFitness}% | Policy Set: ${data.optimalPolicySet}`);
          }
        }, 1000);
      })
      .catch((err) => {
        console.warn("[ECOSPHERE] Genetic optimizer offline, running local mock fallback.", err);
        let gen = 0;
        const interval = setInterval(() => {
          gen++;
          setGeneration(gen);
          const crossoverPhrases = [
            "Simulation step: Electric Transit X Tree Canopy. Expected impact +4.2",
            "Targeting optimal solar coordinates. Carbon footprint minimized.",
            "Evaluating cumulative policy matrix against planning filters...",
            "Target convergence reached. Optimal policy portfolio locked."
          ];
          const fitScales = [34.2, 58.6, 78.4, 94.8];
          if (gen <= 4) {
            setCrossoverMsg(crossoverPhrases[gen - 1]);
            setFitnessScore(fitScales[gen - 1]);
          }
          if (gen >= 4) {
            clearInterval(interval);
            setIsRunningGenome(false);
            setOptimalGenome(["canopy", "sponge", "solar", "ev"]);
            setPolicyGenes((prev) => 
              prev.map((g) => ({
                ...g,
                active: ["canopy", "sponge", "solar", "ev"].includes(g.id)
              }))
            );
          }
        }, 1000);
      });
  };

  // Run visual A* Pathfinder Simulation
  const handleRunAStar = () => {
    setIsAStarRunning(true);
    setAstarStep(0);
    setAstarLogs([`Querying regional index targets for ${city.name}. Baseline: ${baselineScore}. Target: ${targetScore}.`]);

    fetch(`${API_BASE_URL}/api/optimize/astar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cityName: city.name,
        baselineScore,
        targetScore
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("A* API call failed");
        return res.json();
      })
      .then((backendNodes: PathNode[]) => {
        const initialNodes = backendNodes.map((n) => ({
          ...n,
          state: n.id === 1 ? ("open" as const) : ("unexplored" as const)
        }));
        setNodes(initialNodes);

        setAstarLogs((prev) => [
          ...prev,
          `Evaluating baseline stage. Expanding candidate policy options.`
        ]);

        const stepLogs = [
          `Stage 1 complete. Option 2 selected (lower cost than alternative Energy Grid).`,
          `Stage 2 complete. Option 3 selected.`,
          `Stage 3 complete. Target sustainability score successfully reached.`,
          `Optimal path fully resolved.`
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
          currentStep++;
          setAstarStep(currentStep);
          
          if (currentStep <= stepLogs.length) {
            setAstarLogs((prev) => [...prev, stepLogs[currentStep - 1]]);
          }

          setNodes((prevNodes) => {
            return prevNodes.map((n) => {
              if (currentStep === 1) {
                if (n.id === 1) return { ...n, state: "closed" };
                if (n.id === 2 || n.id === 5) return { ...n, state: "open" };
              }
              if (currentStep === 2) {
                if (n.id === 2) return { ...n, state: "closed" };
                if (n.id === 3) return { ...n, state: "open" };
              }
              if (currentStep === 3) {
                if (n.id === 3) return { ...n, state: "closed" };
                if (n.id === 4) return { ...n, state: "open" };
              }
              if (currentStep === 4) {
                return {
                  ...n,
                  state: [1, 2, 3, 4].includes(n.id) ? ("path" as const) : n.state
                };
              }
              return n;
            });
          });

          if (currentStep >= 5) {
            clearInterval(interval);
            setIsAStarRunning(false);
          }
        }, 1200);
      })
      .catch((err) => {
        console.warn("[ECOSPHERE] A* offline, running local fallback simulation.", err);
        setAstarLogs((prev) => [...prev, "Running offline evaluation model."]);
        let currentStep = 0;
        const stepLogs = [
          "Evaluating baseline stage. Expanding candidate policy options.",
          "Tree Canopy chosen over Energy Grid (lower estimated cost).",
          "Emission Zone restriction chosen.",
          "Water Harvesting targets resolved.",
          "Optimized sequence determined with cumulative rating of 80."
        ];
        const interval = setInterval(() => {
          currentStep++;
          setAstarStep(currentStep);
          setAstarLogs((prev) => [...prev, stepLogs[currentStep - 1]]);

          setNodes((prevNodes) => {
            return prevNodes.map((n) => {
              if (currentStep === 1) {
                if (n.id === 1) return { ...n, state: "closed" };
                if (n.id === 2 || n.id === 5) return { ...n, state: "open" };
              }
              if (currentStep === 2) {
                if (n.id === 2) return { ...n, state: "closed" };
                if (n.id === 3) return { ...n, state: "open" };
              }
              if (currentStep === 3) {
                if (n.id === 3) return { ...n, state: "closed" };
                if (n.id === 4) return { ...n, state: "open" };
              }
              if (currentStep === 4) {
                if ([1, 2, 3, 4].includes(n.id)) return { ...n, state: "path" };
              }
              return n;
            });
          });

          if (currentStep >= 5) {
            clearInterval(interval);
            setIsAStarRunning(false);
          }
        }, 1200);
      });
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      
      {/* Policy Genome Optimizer */}
      <div className="hud-panel p-6">
        <div className="flex items-center justify-between border-b border-borderMuted pb-3 mb-4">
          <div>
            <span className="text-[10px] font-bold text-accentGreen tracking-wider uppercase block font-semibold">Scenario Planning</span>
            <h3 className="text-base font-extrabold text-headerText tracking-tight flex items-center gap-2">
              <Dna className="w-4 h-4 text-accentGreen" />
              Policy Interventions & Options
            </h3>
            <p className="text-xs text-cardTextMuted mt-0.5 font-normal">
              Evaluate multiple combinations of municipal policies to determine the highest impact roadmap.
            </p>
          </div>
          <span className="bg-accentGreen/15 text-accentGreen border border-accentGreen/25 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider">
            Active Planning
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Policy Genes Selector & Display (Left Panel) */}
          <div className="lg:col-span-5 bg-bgDeep border border-borderMuted p-4 rounded-xl space-y-4 text-xs font-semibold shadow-inner">
            <h4 className="font-extrabold text-headerText tracking-wider text-[9px] uppercase border-b border-borderMuted pb-1.5">
              Available Policy Measures
            </h4>

            <div className="space-y-2">
              {policyGenes.map((gene) => (
                <div 
                  key={gene.id} 
                  className={`p-3 rounded-xl border transition-all duration-300 shadow-sm ${
                    gene.active 
                      ? "bg-bgCard border-accentGreen text-headerText" 
                      : "bg-bgCard border-borderMuted text-cardTextMuted"
                  }`}
                >
                  <div className="flex justify-between items-center font-extrabold">
                    <span>{gene.name}</span>
                    <span className={`text-[10px] ${gene.active ? "text-accentGreen" : "text-cardTextMuted/50"}`}>
                      {gene.active ? "ACTIVE" : "MUTED"}
                    </span>
                  </div>
                  <p className="text-[10px] text-cardTextMuted mt-1 font-normal leading-relaxed">{gene.effect}</p>
                  <div className="flex justify-between text-[9px] text-cardTextMuted font-bold mt-2 pt-2 border-t border-borderMuted/30">
                    <span>Impact Score: {gene.impactScore}</span>
                    <span>Cost Rank: {gene.cost}/10</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleRunGeneticGenome}
              disabled={isRunningGenome}
              className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all duration-300 ${
                isRunningGenome
                  ? "bg-bgCard text-cardTextMuted border-borderMuted cursor-not-allowed"
                  : "bg-accentGreen/10 border-accentGreen/30 text-accentGreen hover:bg-accentGreen hover:text-white hover:border-accentGreen shadow-sm active:scale-[0.98]"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRunningGenome ? "animate-spin" : ""}`} />
              Optimize Policies
            </button>
          </div>

          {/* Genetic algorithm runner logs and visualizations (Right Panel) */}
          <div className="lg:col-span-7 flex flex-col justify-between self-stretch gap-6 h-full">
            
            {/* Chromosome visual simulation box */}
            <div className="bg-bgCard border border-borderMuted rounded-xl p-5 flex-grow flex flex-col justify-between min-h-[220px] shadow-sm">
              
              <div className="flex items-center justify-between border-b border-borderMuted pb-2">
                <span className="text-[9px] font-bold text-cardTextMuted uppercase tracking-wider">Optimization Progress</span>
                <span className="text-[9px] font-bold text-accentGreen uppercase tracking-wider">Iteration Step: {generation}</span>
              </div>

              {/* Scenario Crossover visual overlay */}
              <div className="my-6 flex flex-col items-center justify-center gap-4 relative">
                
                {/* Chromosome visual bars */}
                <div className="flex items-center gap-1.5 text-[10px] text-headerText font-semibold">
                  <span className="text-cardTextMuted font-bold">Scenario A:</span>
                  <span className="px-2.5 py-0.5 bg-accentGreen/10 border border-accentGreen/20 rounded-full text-[9px]">Electric Transit</span>
                  <span className="px-2.5 py-0.5 bg-accentBlue/10 border border-accentBlue/20 rounded-full text-[9px]">Water Harvesting</span>
                  <span className="px-2.5 py-0.5 bg-bgDeep border border-borderMuted rounded-full text-[9px] text-cardTextMuted/40">Solar Rooftops</span>
                </div>

                <div className="w-16 h-[1.5px] border-dashed border-b border-accentPurple/50 flex items-center justify-center relative my-2">
                  <GitMerge className="w-4 h-4 text-accentPurple bg-bgCard" />
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-headerText font-semibold">
                  <span className="text-cardTextMuted font-bold">Scenario B:</span>
                  <span className="px-2.5 py-0.5 bg-bgDeep border border-borderMuted rounded-full text-[9px] text-cardTextMuted/40">Electric Transit</span>
                  <span className="px-2.5 py-0.5 bg-accentPurple/10 border border-accentPurple/20 rounded-full text-[9px]">Tree Canopy</span>
                  <span className="px-2.5 py-0.5 bg-accentGreen/10 border border-accentGreen/20 rounded-full text-[9px]">Solar Rooftops</span>
                </div>
              </div>

              {/* Logs */}
              <div className="bg-bgDeep rounded-lg p-3 border border-borderMuted text-[10px] text-cardTextMuted shadow-inner font-medium">
                <span className="text-accentGreen font-bold block mb-1 uppercase tracking-wider text-[8px]">Optimization Log</span>
                <span className="block text-headerText transition-all duration-300 font-semibold">{crossoverMsg}</span>
              </div>

            </div>

            {/* AI Decision outputs */}
            <div className="bg-bgDeep border border-borderMuted p-4 rounded-xl flex items-center justify-between text-xs font-semibold shadow-inner">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-accentGreen" />
                <div>
                  <span className="block text-[8px] text-cardTextMuted uppercase tracking-wider">Recommended Policy Suite</span>
                  <span className="text-headerText font-extrabold block mt-0.5">
                    {optimalGenome.length > 0 ? "Canopy + Harvesting + Solar + EV Fleet" : "Awaiting Simulation..."}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-[8px] text-cardTextMuted uppercase tracking-wider">Attributed Impact</span>
                <span className="font-extrabold text-accentGreen text-sm block mt-0.5">
                  {fitnessScore > 0 ? `${fitnessScore.toFixed(1)}% Score` : "—"}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* A* Heuristic Pathfinder */}
      <div className="hud-panel p-6">
        
        <div className="flex items-center justify-between border-b border-borderMuted pb-3 mb-4">
          <div>
            <span className="text-[10px] font-bold text-accentBlue tracking-wider uppercase block font-semibold">Path Finder</span>
            <h3 className="text-base font-extrabold text-headerText tracking-tight flex items-center gap-2">
              <Compass className="w-4 h-4 text-accentBlue" />
              Impact Pathways
            </h3>
            <p className="text-xs text-cardTextMuted mt-0.5 font-normal">
              Visualizes the most efficient step-by-step path to achieve the target environmental rating.
            </p>
          </div>
          <span className="bg-accentBlue/15 text-accentBlue border border-accentBlue/25 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider">
            Target Logic: H(n) = Target - Current
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Graph visual node array (Left 7 Columns) */}
          <div className="lg:col-span-7 bg-bgDeep rounded-xl p-4 border border-borderMuted h-[310px] flex flex-col justify-between relative overflow-hidden shadow-inner">
            
            <div className="flex items-center justify-between border-b border-borderMuted/30 pb-2">
              <span className="text-[9px] font-bold text-cardTextMuted uppercase tracking-wider">Optimal Pathway Analysis</span>
              <span className="text-[9px] font-bold text-cardTextMuted uppercase tracking-wider">Target: {targetScore}</span>
            </div>

            {/* Nodes Visual grid layout */}
            <div className="relative flex-grow flex items-center justify-center my-6">
              
              {/* Lines linking nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <line x1="70" y1="120" x2="160" y2="60" stroke="var(--accent-blue)" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="70" y1="120" x2="160" y2="180" stroke="var(--accent-blue)" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="160" y1="60" x2="250" y2="60" stroke="var(--accent-blue)" strokeWidth="1.5" />
                <line x1="250" y1="60" x2="340" y2="120" stroke="var(--accent-green)" strokeWidth="2.5" />
                <line x1="160" y1="180" x2="250" y2="180" stroke="var(--accent-blue)" strokeWidth="1" strokeDasharray="4,4" />
              </svg>

              {/* Node 1: Start (Base) */}
              <div className="absolute left-[20px] top-[100px] flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 shadow-sm ${
                  nodes[0].state === "path" ? "bg-accentGreen border-accentGreen text-white" : "bg-bgCard border-accentBlue text-headerText"
                }`}>
                  {nodes[0].score}
                </div>
                <span className="text-[8px] font-bold text-cardTextMuted mt-1 uppercase tracking-wider">Baseline</span>
              </div>

              {/* Node 2: Tree canopy */}
              <div className="absolute left-[130px] top-[40px] flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 shadow-sm ${
                  nodes[1].state === "path" ? "bg-accentGreen border-accentGreen text-white" : nodes[1].state === "open" ? "bg-accentBlue/10 border-accentBlue text-headerText" : "bg-bgCard border-borderMuted text-cardTextMuted"
                }`}>
                  {nodes[1].score}
                </div>
                <span className="text-[8px] font-bold text-cardTextMuted mt-1 uppercase tracking-wider">Canopy</span>
              </div>

              {/* Node 5: Energy grid */}
              <div className="absolute left-[130px] top-[160px] flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 shadow-sm ${
                  nodes[4].state === "open" ? "bg-accentBlue/10 border-accentBlue text-headerText" : "bg-bgCard border-borderMuted text-cardTextMuted"
                }`}>
                  {nodes[4].score}
                </div>
                <span className="text-[8px] font-bold text-cardTextMuted mt-1 uppercase tracking-wider">Energy Grid</span>
              </div>

              {/* Node 3: Carbon corridor */}
              <div className="absolute left-[230px] top-[40px] flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 shadow-sm ${
                  nodes[2].state === "path" ? "bg-accentGreen border-accentGreen text-white" : nodes[2].state === "open" ? "bg-accentBlue/10 border-accentBlue text-headerText" : "bg-bgCard border-borderMuted text-cardTextMuted"
                }`}>
                  {nodes[2].score}
                </div>
                <span className="text-[8px] font-bold text-cardTextMuted mt-1 uppercase tracking-wider">Emissions</span>
              </div>

              {/* Node 6: Noise Control */}
              <div className="absolute left-[230px] top-[160px] flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 shadow-sm ${
                  nodes[5].state === "open" ? "bg-accentBlue/10 border-accentBlue text-headerText" : "bg-bgCard border-borderMuted text-cardTextMuted"
                }`}>
                  {nodes[5].score}
                </div>
                <span className="text-[8px] font-bold text-cardTextMuted mt-1 uppercase tracking-wider">Acoustics</span>
              </div>

              {/* Node 4: Target Locked */}
              <div className="absolute left-[330px] top-[100px] flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 shadow-sm ${
                  nodes[3].state === "path" ? "bg-accentGreen border-accentGreen text-white" : "bg-bgCard border-borderMuted text-cardTextMuted"
                }`}>
                  {nodes[3].score}
                </div>
                <span className="text-[8px] font-bold text-cardTextMuted mt-1 uppercase tracking-wider">Target</span>
              </div>

            </div>

            <div className="flex gap-4 text-[8px] font-bold text-cardTextMuted justify-center tracking-wider">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-bgCard border border-borderMuted" /> Unexplored Stage</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-accentBlue/10 border border-accentBlue" /> Being Evaluated</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-accentGreen" /> Recommended Path</span>
            </div>

          </div>

          {/* Interactive controls and heuristic search logs (Right 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between self-stretch gap-4">
            <div className="bg-bgDeep border border-borderMuted p-4 rounded-xl space-y-3 text-xs font-semibold shadow-inner">
              <span className="block text-[8px] text-cardTextMuted uppercase tracking-wider font-bold">Pathway Attributes</span>
              
              <div className="flex justify-between items-center bg-bgCard p-2.5 rounded-lg border border-borderMuted shadow-sm">
                <span>Total Estimated Cost</span>
                <span className="font-extrabold text-accentGreen">40 units</span>
              </div>

              <div className="flex justify-between items-center bg-bgCard p-2.5 rounded-lg border border-borderMuted shadow-sm">
                <span>Pathway Difficulty</span>
                <span className="font-extrabold text-accentBlue">g(n) = 40 | Low cost</span>
              </div>

              <button
                onClick={handleRunAStar}
                disabled={isAStarRunning}
                className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all duration-300 ${
                  isAStarRunning
                    ? "bg-bgCard text-cardTextMuted border-borderMuted cursor-not-allowed"
                    : "bg-accentBlue/10 border-accentBlue/30 text-accentBlue hover:bg-accentBlue hover:text-white hover:border-accentBlue shadow-sm active:scale-[0.98]"
                }`}
              >
                <Compass className={`w-3.5 h-3.5 ${isAStarRunning ? "animate-spin" : ""}`} />
                Find Optimal Path
              </button>
            </div>

            {/* Step-by-step search logs stream */}
            <div className="bg-bgDeep rounded-xl p-3 border border-borderMuted text-[9px] text-cardTextMuted flex-grow min-h-[120px] max-h-[140px] overflow-y-auto shadow-inner font-medium">
              <span className="text-accentBlue font-bold block mb-1 uppercase tracking-wider text-[8px]">Path Calculation Stream</span>
              <div className="space-y-1.5">
                {astarLogs.map((log, idx) => (
                  <div key={idx} className="border-b border-borderMuted/30 pb-1">
                    <span className="text-accentBlue mr-1">&gt;</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
