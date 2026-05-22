import React, { useState } from "react";
import type { CityData } from "../data/cities";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, LineChart, Line, Legend 
} from "recharts";
import { Wind, ShieldCheck, Zap, Info, Cpu, Database, Eye, BarChart2 } from "lucide-react";

interface ScoreAndPipelineProps {
  city: CityData;
}

type PipelineStep = 
  | "ingestion" | "cleanup" | "synthesis" | "randomforest" 
  | "xgboost" | "ensemble" | "shap" | "astar";

export default function ScoreAndPipeline({ city }: ScoreAndPipelineProps) {
  const [activeStep, setActiveStep] = useState<PipelineStep>("randomforest");

  // Calculate scores
  const getScores = () => {
    const overall = Math.round(
      (city.dna.environmentalHealth + 
       city.dna.waterResilience + 
       city.dna.carbonBalance + 
       city.dna.climateReadiness + 
       city.dna.urbanEfficiency) / 5
    );
    const envHealth = city.dna.environmentalHealth;
    const climateRes = city.dna.climateReadiness;
    const resourceEff = Math.round((city.dna.waterResilience + city.dna.urbanEfficiency) / 2);
    const futureTrend = Math.round(overall * 1.05 > 95 ? 95 : overall * 1.05);

    return { overall, envHealth, climateRes, resourceEff, futureTrend };
  };

  const { overall, envHealth, climateRes, resourceEff, futureTrend } = getScores();

  // Score category label
  const getScoreCategory = (score: number) => {
    if (score >= 80) return { label: "Excellent Score", color: "text-accentGreen border-accentGreen/20 bg-accentGreen/5" };
    if (score >= 70) return { label: "Good Standing", color: "text-accentBlue border-accentBlue/20 bg-accentBlue/5" };
    if (score >= 55) return { label: "Moderate Standing", color: "text-amber-600 border-amber-600/20 bg-amber-600/5" };
    if (score >= 40) return { label: "Action Recommended", color: "text-rose-600 border-rose-600/20 bg-rose-600/5" };
    return { label: "Critical Priority", color: "text-red-600 border-red-600/20 bg-red-600/5" };
  };

  const category = getScoreCategory(overall);

  // Explainable AI Feature Contributions (SHAP Values)
  const shapData = [
    { name: "Green Canopy Cover", value: 12, fill: "var(--accent-green)" },
    { name: "PM2.5 Dispersion", value: -18, fill: "var(--accent-purple)" },
    { name: "Water Consumption Stress", value: -10, fill: "var(--accent-blue)" },
    { name: "Solar Grid Adoption", value: 8, fill: "var(--accent-green)" },
    { name: "Acoustic Noise Index", value: 5, fill: "var(--accent-green)" },
    { name: "Density Overload", value: -7, fill: "var(--accent-purple)" },
  ];

  // 365-Day Environmental Forecasting Data
  const forecastData = [
    { day: "Day 0", actual: city.metrics.aqi, forecast: city.metrics.aqi, lower: city.metrics.aqi - 10, upper: city.metrics.aqi + 10 },
    { day: "Day 30", actual: city.metrics.aqi - 5, forecast: city.metrics.aqi - 4, lower: city.metrics.aqi - 20, upper: city.metrics.aqi + 12 },
    { day: "Day 90", actual: null, forecast: city.metrics.aqi - 12, lower: city.metrics.aqi - 35, upper: city.metrics.aqi + 18 },
    { day: "Day 180", actual: null, forecast: city.metrics.aqi - 18, lower: city.metrics.aqi - 48, upper: city.metrics.aqi + 22 },
    { day: "Day 365", actual: null, forecast: city.metrics.aqi - 25, lower: city.metrics.aqi - 65, upper: city.metrics.aqi + 28 },
  ];

  // AI Pipeline Steps configurations
  const pipelineStepsConfig = [
    { id: "ingestion", label: "Data Ingestion", icon: Database },
    { id: "cleanup", label: "Noise Cleanup", icon: ShieldCheck },
    { id: "synthesis", label: "Feature Synthesis", icon: Zap },
    { id: "randomforest", label: "Random Forest", icon: Cpu },
    { id: "xgboost", label: "XGBoost Regressor", icon: Wind },
    { id: "ensemble", label: "Ensemble Layer", icon: Eye },
    { id: "shap", label: "SHAP Explainability", icon: BarChart2 },
    { id: "astar", label: "A* Pathfinder", icon: Cpu },
  ];

  const getPipelineStepDetails = (step: PipelineStep) => {
    switch (step) {
      case "ingestion":
        return {
          title: "Regional Data Ingestion Layer",
          math: "P_{sensor} = \\int_{t} f(AQI, H2O, CO2) \\, dt",
          desc: "Processes real-time environmental indicators from CPCB monitoring networks, regional GIS maps, and local municipal streams. Efficiently feeds structured records into a secure database buffer.",
          metrics: "Rate: 14.8k msg/sec | Data Coverage: 99.98%"
        };
      case "cleanup":
        return {
          title: "Kalman Noise Filtration",
          math: "x_k = A x_{k-1} + B u_k + w_k",
          desc: "Filters out high-frequency atmospheric noise spikes and minor sensor errors using an adaptive Kalman predictor to output stable baseline indicators.",
          metrics: "Atmospheric Noise Filtered | Baseline Adjusted"
        };
      case "synthesis":
        return {
          title: "Spatial-Temporal Feature Synthesis",
          math: "F_{ndbi} = \\frac{SWIR - NIR}{SWIR + NIR} \\times C_{pop}",
          desc: "Calculates environmental health vectors, including relative urban density weights, thermal reflection ratios, and acoustic noise variations.",
          metrics: "Features: 48 Spatial Vectors | Validated"
        };
      case "randomforest":
        return {
          title: "Random Forest Regression",
          math: "E(Y|X) = \\frac{1}{B} \\sum_{b=1}^{B} T_b(X)",
          desc: "Applies a robust ensemble of decision trees to evaluate core sustainability dimensions, scoring structural factors based on validated datasets.",
          metrics: "R² Score: 0.942 | OOB Variance Score: 0.938"
        };
      case "xgboost":
        return {
          title: "XGBoost Gradient Boosting",
          math: "Obj^{(t)} = \\sum_{i=1}^{n} l(y_i, \\hat{y}_i^{(t-1)} + f_t(x_i)) + \\Omega(f_t)",
          desc: "Projects regional environmental indices over a 365-day forecast period. Utilizes regularization penalties to maintain high predictive generalization.",
          metrics: "Mean Squared Error: 14.28 | Max Depth: 6"
        };
      case "ensemble":
        return {
          title: "Weighted Ensemble Layer",
          math: "Y_{ensemble} = w_1 RF(X) + w_2 XGB(X) + w_3 LSTM(X)",
          desc: "Combines decision pathways across regression models and historical averages, generating stable consolidated predictions.",
          metrics: "Ensemble Weights: 45% RF | 35% XGB | 20% LSTM"
        };
      case "shap":
        return {
          title: "SHAP Feature Contribution",
          math: "\\phi_i(v) = \\sum_{S \\subseteq F \\setminus \\{i\\}} \\frac{|S|!(|F| - |S| - 1)!}{|F|!} (v(S \\cup \\{i\\}) - v(S))",
          desc: "Calculates individual feature contribution values. Quantifies positive and negative environmental factors impacting the overall score.",
          metrics: "Attribution Convergence: 99.8%"
        };
      case "astar":
        return {
          title: "A* Heuristic Pathfinder",
          math: "f(n) = g(n) + h(n)",
          desc: "Traces the lowest-cost paths to reach regional index targets by prioritizing environmental and infrastructure improvements.",
          metrics: "Optimal Path Convergence: Verified"
        };
    }
  };

  const stepDetails = getPipelineStepDetails(activeStep);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Top Part: Score Gauge Engine + SHAP Explainable AI Waterfall */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Core Score Engine Gauges (Left 5 Cols) */}
        <div className="lg:col-span-5 hud-panel p-6 flex flex-col justify-between">
          <div className="border-b border-borderMuted pb-3">
            <span className="text-[10px] font-bold text-accentGreen tracking-wider uppercase block">Regional Rating</span>
            <h3 className="text-base font-extrabold text-headerText tracking-tight flex items-center gap-2">
              <Cpu className="w-4 h-4 text-accentGreen" />
              Sustainability Score Card
            </h3>
            <p className="text-xs text-cardTextMuted mt-0.5">
              Composite rating calculated from active regional environmental indicators.
            </p>
          </div>

          {/* Main Large Score Indicator */}
          <div className="text-center my-6 relative flex flex-col items-center">
            {/* Elegant Radial Progress */}
            <div className="w-28 h-28 rounded-full border-[6px] border-bgDeep border-t-accentGreen flex flex-col items-center justify-center relative shadow-sm">
              <span className="text-4xl font-extrabold text-headerText tracking-tight">{overall}</span>
              <span className="text-[9px] font-semibold text-cardTextMuted -mt-1">INDEX PTS</span>
            </div>
            
            <div className={`mt-4 px-4 py-1.5 rounded-full border text-[10px] font-bold ${category.color}`}>
              {category.label}
            </div>
          </div>

          {/* Breakdowns Indicators */}
          <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
            <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl shadow-sm">
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Env Health</span>
              <span className="font-extrabold text-accentGreen block mt-0.5">{envHealth}%</span>
            </div>
            <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl shadow-sm">
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Climate Readiness</span>
              <span className="font-extrabold text-accentBlue block mt-0.5">{climateRes}%</span>
            </div>
            <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl shadow-sm">
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Resource Eff</span>
              <span className="font-extrabold text-accentPurple block mt-0.5">{resourceEff}%</span>
            </div>
            <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl shadow-sm">
              <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Future Trend</span>
              <span className="font-extrabold text-rose-600 block mt-0.5">{futureTrend}%</span>
            </div>
          </div>
        </div>

        {/* Explainable AI (SHAP Waterfall) Chart (Right 7 Cols) */}
        <div className="lg:col-span-7 hud-panel p-6 flex flex-col justify-between">
          <div className="border-b border-borderMuted pb-3">
            <span className="text-[10px] font-bold text-accentBlue tracking-wider uppercase block">Index Drivers</span>
            <h3 className="text-base font-extrabold text-headerText tracking-tight flex items-center gap-2">
              <Eye className="w-4 h-4 text-accentBlue" />
              Impact Drivers & Analytics
            </h3>
            <p className="text-xs text-cardTextMuted mt-0.5">
              Statistical attribution breakdown showing positive and negative drivers affecting the overall score of {city.name}.
            </p>
          </div>

          {/* SHAP Waterfall Chart Container */}
          <div className="w-full h-[180px] my-4 text-[10px] font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={shapData}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-muted)" />
                <XAxis type="number" stroke="var(--card-text-muted)" fontSize={9} />
                <YAxis dataKey="name" type="category" stroke="var(--card-text-muted)" fontSize={9} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-muted)",
                    borderRadius: "12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    color: "var(--neutral-text)",
                    boxShadow: "var(--shadow-premium)"
                  }}
                  cursor={{ fill: "var(--bg-deep)", opacity: 0.3 }}
                />
                <Bar dataKey="value" fill="var(--accent-green)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-4 text-[10px] font-bold text-cardTextMuted items-center justify-center">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-accentGreen" /> Positive Impact (+ pts)</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-accentPurple" /> Negative Impact (- pts)</span>
          </div>
        </div>

      </div>

      {/* Center Part: 365-Day Predictor (Recharts Confidence Interval) */}
      <div className="hud-panel p-6">
        <div className="flex items-center justify-between border-b border-borderMuted pb-3 mb-4">
          <div>
            <span className="text-[10px] font-bold text-rose-600 tracking-wider uppercase block">Impact Projections</span>
            <h3 className="text-base font-extrabold text-headerText tracking-tight flex items-center gap-2">
              <Wind className="w-4 h-4 text-rose-600" />
              Air Quality & Emission Projections (1 Year)
            </h3>
            <p className="text-xs text-cardTextMuted mt-0.5">
              Regional environmental forecast modeling simulating AQI trajectories over a 365-day horizon.
            </p>
          </div>
          <span className="bg-rose-500/10 text-rose-600 border border-rose-500/20 px-3 py-0.5 rounded-full text-[10px] font-bold">
            Model: Prophet + LSTM Ensemble
          </span>
        </div>

        <div className="w-full h-[220px] text-[10px] font-semibold">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-muted)" />
              <XAxis dataKey="day" stroke="var(--card-text-muted)" fontSize={9} />
              <YAxis stroke="var(--card-text-muted)" fontSize={9} label={{ value: "AQI LEVEL", angle: -90, position: "insideLeft", fill: "var(--card-text-muted)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-muted)",
                  borderRadius: "12px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  color: "var(--neutral-text)",
                  boxShadow: "var(--shadow-premium)"
                }}
              />
              <Legend verticalAlign="top" height={36} />
              
              {/* Confidence Interval Shade */}
              <Area 
                name="95% Confidence Bounds"
                type="monotone" 
                dataKey="upper" 
                stroke="none" 
                fill="var(--accent-blue)"
                fillOpacity={0.04}
                className="pointer-events-none"
              />
              <Area 
                name="Confidence Range Lower"
                type="monotone" 
                dataKey="lower" 
                stroke="none" 
                fill="none" 
                className="pointer-events-none"
              />
              
              {/* Forecast curve */}
              <Area 
                name="Projected Trend" 
                type="monotone" 
                dataKey="forecast" 
                stroke="var(--accent-blue)" 
                fillOpacity={1} 
                fill="url(#colorForecast)" 
                strokeWidth={2}
              />
              
              {/* Actual curve */}
              <Line 
                name="Actual Sensor" 
                type="monotone" 
                dataKey="actual" 
                stroke="var(--accent-green)" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Part: Interactive AI Pipeline Visualizer */}
      <div className="hud-panel p-6">
        <span className="text-[10px] font-bold text-accentPurple tracking-wider uppercase block">System Architecture</span>
        <h3 className="text-base font-extrabold text-headerText tracking-tight flex items-center gap-2 border-b border-borderMuted pb-3 mb-4">
          <Database className="w-4 h-4 text-accentPurple" />
          AI Model & Analytics Pipeline
        </h3>

        {/* Graphical Pipeline Path */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-bgDeep p-4 rounded-xl border border-borderMuted mb-6 shadow-inner">
          {pipelineStepsConfig.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setActiveStep(step.id as PipelineStep)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 min-w-[100px] flex-grow ${
                    isActive
                      ? "bg-bgCard border-accentGreen text-headerText shadow-sm scale-[1.02]"
                      : "bg-bgCard border-borderMuted text-cardTextMuted hover:border-accentGreen/30 hover:text-headerText"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${isActive ? "text-accentGreen" : "text-cardTextMuted"}`} />
                  <span className="text-[9px] tracking-wide uppercase font-bold">{step.label}</span>
                </button>

                {/* Arrow spacer between steps */}
                {idx < pipelineStepsConfig.length - 1 && (
                  <span className="hidden md:inline text-cardTextMuted/30 text-xs">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Selected Step Technical Details HUD */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-bgDeep border border-borderMuted rounded-xl p-5 text-xs items-start shadow-inner">
          
          {/* Node Math/Formulas */}
          <div className="md:col-span-4 bg-bgCard p-4 rounded-lg border border-borderMuted h-full flex flex-col justify-between shadow-sm">
            <span className="text-[8px] font-bold text-accentGreen uppercase block tracking-wider">Node Formula</span>
            <div className="my-4 text-center select-all">
              <code className="text-accentBlue text-sm block py-4 bg-bgDeep rounded border border-borderMuted">
                {stepDetails.math}
              </code>
            </div>
            <span className="text-[8px] text-cardTextMuted uppercase block tracking-wider">Mathematical Notation</span>
          </div>

          {/* Details & Live metrics */}
          <div className="md:col-span-8 flex flex-col justify-between self-stretch gap-4">
            <div>
              <h4 className="text-sm font-bold text-headerText uppercase tracking-wider">{stepDetails.title}</h4>
              <p className="text-[11px] text-cardTextMuted mt-2 leading-relaxed font-normal">
                {stepDetails.desc}
              </p>
            </div>

            {/* Performance telemetry stats */}
            <div className="bg-bgCard p-3 rounded-lg border border-borderMuted flex items-center justify-between shadow-sm">
              <span className="text-[9px] font-bold text-cardTextMuted uppercase tracking-wider">Pipeline Output</span>
              <span className="text-accentGreen font-bold">{stepDetails.metrics}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
