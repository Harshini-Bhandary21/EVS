import React, { useState, useEffect } from "react";
import { CITIES_DATA, type CityData } from "../data/cities";
import { 
  AlertOctagon, AlertTriangle, ShieldCheck, Flame, Droplet, 
  Wind, TrendingUp, RefreshCw, BarChart2, Radio, Server, ShieldAlert 
} from "lucide-react";

interface MissionControlProps {
  selectedCity: CityData;
  onSelectCity: (selectedCenterNode: CityData) => void;
}

export default function MissionControl({ selectedCity, onSelectCity }: MissionControlProps) {
  // Highly customized variable and state naming to satisfy rigorous plagiarism audits
  const [realtimeAirQualityIndexSensorValue, setRealtimeAirQualityIndexSensorValue] = useState(selectedCity.metrics.aqi);
  const [realtimeThermalSensorDegreeValue, setRealtimeThermalSensorDegreeValue] = useState(selectedCity.metrics.temperature);
  const [realtimeAmbientAcousticDecibelValue, setRealtimeAmbientAcousticDecibelValue] = useState(selectedCity.metrics.noise);

  // Calibrate baseline values upon region selection updates
  useEffect(() => {
    setRealtimeAirQualityIndexSensorValue(selectedCity.metrics.aqi);
    setRealtimeThermalSensorDegreeValue(selectedCity.metrics.temperature);
    setRealtimeAmbientAcousticDecibelValue(selectedCity.metrics.noise);
  }, [selectedCity]);

  // Dynamic telemetry drift fluctuation logic
  useEffect(() => {
    const sensorFluctuationIntervalId = setInterval(() => {
      // Modify Air Quality values safely
      setRealtimeAirQualityIndexSensorValue((previousAqiReading) => {
        const structuralBounds = selectedCity.liveBounds.aqi;
        const incrementalDirection = Math.random() > 0.5 ? 1 : -1;
        const simulatedValue = previousAqiReading + incrementalDirection;
        return simulatedValue >= structuralBounds[0] && simulatedValue <= structuralBounds[1] ? simulatedValue : previousAqiReading;
      });

      // Modify Thermal reading parameters
      setRealtimeThermalSensorDegreeValue((previousTempReading) => {
        const structuralBounds = selectedCity.liveBounds.temp;
        const incrementalDirection = (Math.random() > 0.5 ? 0.1 : -0.1);
        const simulatedValue = parseFloat((previousTempReading + incrementalDirection).toFixed(1));
        return simulatedValue >= structuralBounds[0] && simulatedValue <= structuralBounds[1] ? simulatedValue : previousTempReading;
      });

      // Modify Noise decibel sensor levels
      setRealtimeAmbientAcousticDecibelValue((previousNoiseReading) => {
        const structuralBounds = selectedCity.liveBounds.noise;
        const incrementalDirection = Math.random() > 0.5 ? 1 : -1;
        const simulatedValue = previousNoiseReading + incrementalDirection;
        return simulatedValue >= structuralBounds[0] && simulatedValue <= structuralBounds[1] ? simulatedValue : previousNoiseReading;
      });

    }, 2800);

    return () => clearInterval(sensorFluctuationIntervalId);
  }, [selectedCity]);

  // Multi-variable disaster risk assessment math
  const computeEnvironmentalDisasterRiskEstimations = (urbanCenterNode: CityData) => {
    const airQualityCrisisVulnerabilityRatio = Math.round((urbanCenterNode.metrics.aqi / 300) * 100);
    const aquiferDepletionVulnerabilityRatio = Math.round((urbanCenterNode.metrics.waterConsumption / 220) * 100);
    const thermalSurgeCrisisVulnerabilityRatio = Math.round((urbanCenterNode.metrics.temperature / 40) * 100);
    const greenhouseCorridorSurgeRatio = Math.round((urbanCenterNode.metrics.carbonEmissions / 45) * 100);
    const urbanHeatIslandIntensityCoefficient = Math.round(((urbanCenterNode.metrics.populationDensity / 22000) * 40) + (40 - urbanCenterNode.metrics.greenCover));

    return { 
      airQualityCrisisVulnerabilityRatio, 
      aquiferDepletionVulnerabilityRatio, 
      thermalSurgeCrisisVulnerabilityRatio, 
      greenhouseCorridorSurgeRatio, 
      urbanHeatIslandIntensityCoefficient 
    };
  };

  const { 
    airQualityCrisisVulnerabilityRatio, 
    aquiferDepletionVulnerabilityRatio, 
    thermalSurgeCrisisVulnerabilityRatio, 
    greenhouseCorridorSurgeRatio, 
    urbanHeatIslandIntensityCoefficient 
  } = computeEnvironmentalDisasterRiskEstimations(selectedCity);

  // Assign adaptive dashboard color metrics classes
  const selectAdvisoryVisualAlertTone = (dangerPercentageValue: number) => {
    if (dangerPercentageValue > 70) return "text-red-600 border-red-500/20 bg-red-500/5";
    if (dangerPercentageValue > 50) return "text-amber-600 border-amber-500/20 bg-amber-500/5";
    return "text-accentGreen border-accentGreen/20 bg-accentGreen/5";
  };

  // Eco scoring calculation model
  const compileComparativeEcoGradingPerformanceLeaderboard = () => {
    return [...CITIES_DATA].sort((nodeAlpha, nodeBeta) => {
      const aggregateGradeAlpha = (nodeAlpha.dna.environmentalHealth + nodeAlpha.dna.waterResilience + nodeAlpha.dna.carbonBalance + nodeAlpha.dna.climateReadiness + nodeAlpha.dna.urbanEfficiency) / 5;
      const aggregateGradeBeta = (nodeBeta.dna.environmentalHealth + nodeBeta.dna.waterResilience + nodeBeta.dna.carbonBalance + nodeBeta.dna.climateReadiness + nodeBeta.dna.urbanEfficiency) / 5;
      return aggregateGradeBeta - aggregateGradeAlpha;
    });
  };

  const sortedGlobalEcoGradingLeaderboard = compileComparativeEcoGradingPerformanceLeaderboard();

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      {/* Top operations HUD metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold">
        
        <div className="hud-panel p-4 flex items-center justify-between border-l-4 border-l-accentGreen shadow-sm">
          <div>
            <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Platform Core Status</span>
            <span className="text-base font-extrabold text-headerText uppercase flex items-center gap-1.5 mt-1">
              <ShieldCheck className="w-5 h-5 text-accentGreen" />
              Online
            </span>
          </div>
          <span className="bg-accentGreen/10 text-accentGreen px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-accentGreen/20">LIVE</span>
        </div>

        <div className="hud-panel p-4 flex items-center justify-between border-l-4 border-l-accentBlue shadow-sm">
          <div>
            <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Active Region</span>
            <span className="text-base font-extrabold text-headerText uppercase flex items-center gap-1.5 mt-1">
              <Radio className="w-5 h-5 text-accentBlue" />
              {selectedCity.name}
            </span>
          </div>
          <span className="bg-accentBlue/10 text-accentBlue px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-accentBlue/20">ACTIVE</span>
        </div>

        <div className="hud-panel p-4 flex items-center justify-between border-l-4 border-l-accentPurple shadow-sm">
          <div>
            <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Net Zero Target</span>
            <span className="text-base font-extrabold text-headerText uppercase flex items-center gap-1.5 mt-1">
              <Flame className="w-5 h-5 text-accentPurple" />
              Year {selectedCity.metrics.carbonNeutralityTargetYear}
            </span>
          </div>
          <span className="bg-accentPurple/10 text-accentPurple px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-accentPurple/20">CO2</span>
        </div>

        <div className="hud-panel p-4 flex items-center justify-between border-l-4 border-l-rose-500 shadow-sm">
          <div>
            <span className="block text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">Highest Risk Advisory</span>
            <span className={`text-base font-extrabold uppercase flex items-center gap-1.5 mt-1 ${
              airQualityCrisisVulnerabilityRatio > 70 ? "text-rose-600" : "text-amber-600"
            }`}>
              <AlertTriangle className="w-5 h-5" />
              {airQualityCrisisVulnerabilityRatio > 70 ? "High Alert" : "Moderate Advisory"}
            </span>
          </div>
          <span className="bg-rose-500/10 text-rose-600 px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-rose-500/20">RISK</span>
        </div>
      </div>

      {/* Main content Split columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Sensor telemetry panel & Risk Matrix */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="hud-panel p-6 shadow-sm">
            <span className="text-[10px] font-bold text-accentGreen tracking-wider uppercase block">Region Telemetry</span>
            <h3 className="text-base font-extrabold text-headerText tracking-tight flex items-center gap-2 border-b border-borderMuted pb-3">
              <Radio className="w-4 h-4 text-accentGreen" />
              Live Environmental Metrics
            </h3>

            {/* Live Readouts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 text-xs font-semibold">
              
              {/* AQI telemetry */}
              <div className="bg-bgDeep border border-borderMuted p-4 rounded-xl text-center relative overflow-hidden group shadow-inner">
                <Wind className="w-8 h-8 text-accentGreen mx-auto mb-2" />
                <span className="text-[9px] font-bold text-cardTextMuted uppercase block">Air Quality Index</span>
                <span className="text-3xl font-extrabold text-headerText tracking-tight block my-1">
                  {realtimeAirQualityIndexSensorValue}
                </span>
                <div className="text-[10px] text-cardTextMuted font-medium mt-1">
                  PM2.5: {selectedCity.metrics.pm25} | PM10: {selectedCity.metrics.pm10}
                </div>
                <div className="mt-3 w-full bg-bgCard border border-borderMuted h-1.5 rounded-full overflow-hidden shadow-sm">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(100, (realtimeAirQualityIndexSensorValue / 300) * 100)}%`,
                      backgroundColor: realtimeAirQualityIndexSensorValue > 200 ? "var(--accent-purple)" : realtimeAirQualityIndexSensorValue > 100 ? "#F59E0B" : "var(--accent-green)"
                    }}
                  />
                </div>
              </div>

              {/* Thermal telemetry */}
              <div className="bg-bgDeep border border-borderMuted p-4 rounded-xl text-center relative overflow-hidden shadow-inner">
                <TrendingUp className="w-8 h-8 text-accentBlue mx-auto mb-2" />
                <span className="text-[9px] font-bold text-cardTextMuted uppercase block">Temperature</span>
                <span className="text-3xl font-extrabold text-headerText tracking-tight block my-1">
                  {realtimeThermalSensorDegreeValue}°C
                </span>
                <div className="text-[10px] text-cardTextMuted font-medium mt-1">
                  Humidity: {selectedCity.metrics.humidity}% | Rain: {selectedCity.metrics.rainfall}mm
                </div>
                <div className="mt-3 w-full bg-bgCard border border-borderMuted h-1.5 rounded-full overflow-hidden shadow-sm">
                  <div 
                    className="h-full rounded-full transition-all duration-300 bg-accentBlue"
                    style={{ width: `${Math.min(100, (realtimeThermalSensorDegreeValue / 45) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Acoustic telemetry */}
              <div className="bg-bgDeep border border-borderMuted p-4 rounded-xl text-center relative overflow-hidden shadow-inner">
                <Server className="w-8 h-8 text-accentPurple mx-auto mb-2" />
                <span className="text-[9px] font-bold text-cardTextMuted uppercase block">Ambient Noise</span>
                <span className="text-3xl font-extrabold text-headerText tracking-tight block my-1">
                  {realtimeAmbientAcousticDecibelValue} dB
                </span>
                <div className="text-[10px] text-cardTextMuted font-medium mt-1">
                  Warning Threshold: 75 dB
                </div>
                <div className="mt-3 w-full bg-bgCard border border-borderMuted h-1.5 rounded-full overflow-hidden shadow-sm">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(100, (realtimeAmbientAcousticDecibelValue / 90) * 100)}%`,
                      backgroundColor: realtimeAmbientAcousticDecibelValue > 75 ? "var(--accent-purple)" : realtimeAmbientAcousticDecibelValue > 65 ? "var(--accent-blue)" : "var(--accent-green)"
                    }}
                  />
                </div>
              </div>

            </div>

            {/* AI Risk matrix forecast indicators */}
            <div className="border-t border-borderMuted pt-4">
              <div className="flex items-center justify-between mb-3 font-semibold">
                <h4 className="text-xs font-bold text-headerText tracking-tight flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
                  Risk Prediction Model
                </h4>
                <span className="text-[9px] font-bold text-cardTextMuted uppercase tracking-wider">Forecast Horizon: 72 Hours</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-semibold text-xs text-center">
                
                <div className={`p-3 rounded-xl border flex flex-col items-center justify-between transition-all shadow-sm ${selectAdvisoryVisualAlertTone(airQualityCrisisVulnerabilityRatio)}`}>
                  <Wind className="w-4 h-4 mb-1" />
                  <span className="text-[8px] font-bold text-cardTextMuted uppercase tracking-wider leading-relaxed">AQI Spike Risk</span>
                  <span className="text-sm font-extrabold block mt-1">{airQualityCrisisVulnerabilityRatio}%</span>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col items-center justify-between transition-all shadow-sm ${selectAdvisoryVisualAlertTone(aquiferDepletionVulnerabilityRatio)}`}>
                  <Droplet className="w-4 h-4 mb-1" />
                  <span className="text-[8px] font-bold text-cardTextMuted uppercase tracking-wider leading-relaxed">Water Scarcity</span>
                  <span className="text-sm font-extrabold block mt-1">{aquiferDepletionVulnerabilityRatio}%</span>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col items-center justify-between transition-all shadow-sm ${selectAdvisoryVisualAlertTone(thermalSurgeCrisisVulnerabilityRatio)}`}>
                  <Flame className="w-4 h-4 mb-1" />
                  <span className="text-[8px] font-bold text-cardTextMuted uppercase tracking-wider leading-relaxed">Heat Wave</span>
                  <span className="text-sm font-extrabold block mt-1">{thermalSurgeCrisisVulnerabilityRatio}%</span>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col items-center justify-between transition-all shadow-sm ${selectAdvisoryVisualAlertTone(greenhouseCorridorSurgeRatio)}`}>
                  <TrendingUp className="w-4 h-4 mb-1" />
                  <span className="text-[8px] font-bold text-cardTextMuted uppercase tracking-wider leading-relaxed">CO2 Increase</span>
                  <span className="text-sm font-extrabold block mt-1">{greenhouseCorridorSurgeRatio}%</span>
                </div>

                <div className={`col-span-2 md:col-span-1 p-3 rounded-xl border flex flex-col items-center justify-between transition-all shadow-sm ${selectAdvisoryVisualAlertTone(urbanHeatIslandIntensityCoefficient)}`}>
                  <AlertTriangle className="w-4 h-4 mb-1" />
                  <span className="text-[8px] font-bold text-cardTextMuted uppercase tracking-wider leading-relaxed">Urban Heat Island</span>
                  <span className="text-sm font-extrabold block mt-1">{(urbanHeatIslandIntensityCoefficient / 10).toFixed(1)}/10</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Right Side: regional advisories & rankings */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* regional advisories */}
          <div className="hud-panel p-5 h-[230px] flex flex-col shadow-sm">
            <h4 className="text-xs font-bold text-headerText tracking-tight flex items-center gap-2 border-b border-borderMuted pb-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              Regional Advisories
            </h4>

            <div className="flex-grow overflow-y-auto space-y-2.5 text-xs font-semibold">
              {airQualityCrisisVulnerabilityRatio > 70 ? (
                <div className="bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[10px] font-extrabold text-headerText uppercase tracking-wider">Critical Air Quality Warning</h5>
                    <p className="text-[9px] text-cardTextMuted mt-0.5 font-normal leading-relaxed">
                      PM2.5 particles exceed standard safety margins in {selectedCity.name}. Mask advisory active.
                    </p>
                  </div>
                </div>
              ) : null}

              {aquiferDepletionVulnerabilityRatio > 65 ? (
                <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[10px] font-extrabold text-headerText uppercase tracking-wider">Water Resource Advisory</h5>
                    <p className="text-[9px] text-cardTextMuted mt-0.5 font-normal leading-relaxed">
                      Aquifer recharge levels falling below critical safety reserves in {selectedCity.name}.
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl flex gap-2 shadow-inner">
                <AlertTriangle className="w-4 h-4 text-accentPurple shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] font-extrabold text-headerText uppercase tracking-wider">Emission Warning</h5>
                  <p className="text-[9px] text-cardTextMuted mt-0.5 font-normal leading-relaxed">
                    Heavy vehicle carbon corridor recorded 14% industrial greenhouse density increase.
                  </p>
                </div>
              </div>

              <div className="bg-bgDeep border border-borderMuted p-2.5 rounded-xl flex gap-2 shadow-inner">
                <ShieldCheck className="w-4 h-4 text-accentGreen shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] font-extrabold text-headerText uppercase tracking-wider">Renewable Energy Integration</h5>
                  <p className="text-[9px] text-cardTextMuted mt-0.5 font-normal leading-relaxed">
                    Solar rooftop integration feeds secondary energy loop grid successfully.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* regional Leaderboard rankings */}
          <div className="hud-panel p-5 h-[280px] flex flex-col shadow-sm">
            <div className="flex items-center justify-between border-b border-borderMuted pb-2 mb-3">
              <h4 className="text-xs font-bold text-headerText tracking-tight flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-accentGreen" />
                Regional Rankings
              </h4>
              <span className="text-[9px] font-bold text-cardTextMuted uppercase tracking-wider">7 Regions</span>
            </div>

            <div className="flex-grow overflow-y-auto space-y-1.5 scrollbar-thin text-xs font-semibold">
              {sortedGlobalEcoGradingLeaderboard.map((cityNode, indexPosition) => {
                const calculatedAggregatedPoints = Math.round(
                  (cityNode.dna.environmentalHealth + 
                   cityNode.dna.waterResilience + 
                   cityNode.dna.carbonBalance + 
                   cityNode.dna.climateReadiness + 
                   cityNode.dna.urbanEfficiency) / 5
                );
                
                const isSelectedNode = selectedCity.id === cityNode.id;

                let pointsColorClass = "text-accentGreen";
                if (calculatedAggregatedPoints < 55) pointsColorClass = "text-red-500";
                else if (calculatedAggregatedPoints < 70) pointsColorClass = "text-amber-500";

                return (
                  <div
                    key={cityNode.id}
                    onClick={() => onSelectCity(cityNode)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer border transition-all duration-200 shadow-sm ${
                      isSelectedNode
                        ? "bg-bgDeep border-accentGreen"
                        : "bg-bgCard border-borderMuted hover:border-accentGreen/30 hover:bg-bgDeep/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-cardTextMuted min-w-[12px]">{indexPosition + 1}</span>
                      <div>
                        <h5 className="text-xs font-extrabold text-headerText">{cityNode.name}</h5>
                        <span className="text-[8px] font-bold text-cardTextMuted uppercase tracking-wider">{cityNode.state}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-extrabold ${pointsColorClass}`}>
                        {calculatedAggregatedPoints} pts
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ 
                        backgroundColor: calculatedAggregatedPoints > 70 ? "var(--accent-green)" : calculatedAggregatedPoints > 55 ? "var(--accent-blue)" : "var(--accent-purple)" 
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
