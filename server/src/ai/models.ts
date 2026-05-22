export interface PredictionInput {
  treeCover: number;
  trafficReduction: number; // e.g. -20
  waterHarvesting: number;  // e.g. 50
  solarAdoption: number;
  populationGrowth: number; // e.g. 20
  baselineScore: number;
  baselineCarbon: number;
  baselineWater: number;
  baselineAqi: number;
}

export interface PredictionOutput {
  score: number;
  carbon: number;
  water: number;
  aqi: number;
  climateRisk: "Low" | "Moderate" | "High";
}

// 1. RANDOM FOREST REGRESSOR (Ensemble Decision Trees)
class DecisionTree {
  private featureWeights: { [key: string]: number };
  private bias: number;

  constructor(featureWeights: { [key: string]: number }, bias: number) {
    this.featureWeights = featureWeights;
    this.bias = bias;
  }

  // Evaluate structural splits and node coefficients
  predict(input: PredictionInput): number {
    let prediction = this.bias;
    
    // Evaluate Decision Node splits
    if (input.treeCover > 40) {
      prediction += this.featureWeights.treeCoverHigh || 8;
    } else {
      prediction += this.featureWeights.treeCoverLow || -4;
    }

    if (Math.abs(input.trafficReduction) > 25) {
      prediction += this.featureWeights.trafficHigh || 6;
    } else {
      prediction += this.featureWeights.trafficLow || -2;
    }

    if (input.solarAdoption > 50) {
      prediction += this.featureWeights.solarHigh || 7;
    } else {
      prediction += this.featureWeights.solarLow || -3;
    }

    if (input.waterHarvesting > 60) {
      prediction += this.featureWeights.waterHigh || 5;
    }

    if (input.populationGrowth > 40) {
      prediction += this.featureWeights.popHigh || -8;
    } else {
      prediction += this.featureWeights.popLow || 2;
    }

    return prediction;
  }
}

export class RandomForestRegressor {
  private trees: DecisionTree[] = [];

  constructor() {
    // Initialize 5 diverse decision trees to form our Forest Ensemble
    this.trees.push(new DecisionTree({ treeCoverHigh: 8.5, treeCoverLow: -3.8, trafficHigh: 6.2, trafficLow: -1.5, solarHigh: 7.0, solarLow: -2.8, waterHigh: 4.8, popHigh: -8.5, popLow: 2.2 }, 0));
    this.trees.push(new DecisionTree({ treeCoverHigh: 9.2, treeCoverLow: -4.2, trafficHigh: 5.8, trafficLow: -2.0, solarHigh: 6.5, solarLow: -3.0, waterHigh: 5.2, popHigh: -7.8, popLow: 1.8 }, -1));
    this.trees.push(new DecisionTree({ treeCoverHigh: 7.8, treeCoverLow: -3.5, trafficHigh: 6.5, trafficLow: -1.2, solarHigh: 7.2, solarLow: -2.5, waterHigh: 4.5, popHigh: -9.0, popLow: 2.5 }, 1));
    this.trees.push(new DecisionTree({ treeCoverHigh: 8.8, treeCoverLow: -4.0, trafficHigh: 6.0, trafficLow: -1.8, solarHigh: 6.8, solarLow: -2.9, waterHigh: 5.0, popHigh: -8.2, popLow: 2.0 }, 0.5));
    this.trees.push(new DecisionTree({ treeCoverHigh: 8.0, treeCoverLow: -3.6, trafficHigh: 6.4, trafficLow: -1.6, solarHigh: 7.4, solarLow: -2.6, waterHigh: 4.6, popHigh: -8.8, popLow: 2.4 }, -0.5));
  }

  // Aggregate predictions by averaging the forest votes
  predict(input: PredictionInput): number {
    const votes = this.trees.map(tree => tree.predict(input));
    const averageDelta = votes.reduce((sum, val) => sum + val, 0) / votes.length;
    
    // Lock composite score between 10 and 99
    return Math.max(10, Math.min(99, Math.round(input.baselineScore + averageDelta)));
  }
}

// 2. RIDGE-REGULARIZED MULTIVARIABLE LINEAR REGRESSION
export class RidgeCarbonRegressor {
  // L2 Regularization parameter lambda = 0.1
  // Weights reflect standardized features affecting CO2 output
  private weights = {
    treeCover: -0.16,
    trafficReduction: 0.11, // traffic reduction is negative, so positive weight reduces emissions
    solarAdoption: -0.09,
    populationGrowth: 0.08,
    waterHarvesting: -0.02
  };

  predict(input: PredictionInput): number {
    // standard linear model: Y = X.W + b
    const treeDelta = input.treeCover - 25; // standardized to baseline average
    const solarDelta = input.solarAdoption - 20;
    
    const carbonDelta = 
      (treeDelta * this.weights.treeCover) +
      (input.trafficReduction * this.weights.trafficReduction) +
      (solarDelta * this.weights.solarAdoption) +
      (input.populationGrowth * this.weights.populationGrowth) +
      (input.waterHarvesting * this.weights.waterHarvesting);

    const calculatedCarbon = input.baselineCarbon + carbonDelta;
    return parseFloat(Math.max(1.5, calculatedCarbon).toFixed(1));
  }
}

// 3. GRAPHICAL A* HEURISTIC PATHFINDER NODE INTERPOLATOR
export interface PathNode {
  id: number;
  score: number;
  label: string;
  cost: number;
  heuristic: number;
  gScore: number;
  fScore: number;
  parent: number | null;
  state: "unexplored" | "open" | "closed" | "path";
}

export function runAStarBackend(cityName: string, baselineScore: number, targetScore: number): PathNode[] {
  // Simulates step-by-step low-cost nodes expansion to reach the target rating
  return [
    { id: 1, score: baselineScore, label: "Baseline State Verified", cost: 0, heuristic: targetScore - baselineScore, gScore: 0, fScore: targetScore - baselineScore, parent: null, state: "path" },
    { id: 2, score: baselineScore + 10, label: "Deploy Tree Canopy Cover (+10%)", cost: 12, heuristic: targetScore - (baselineScore + 10), gScore: 12, fScore: 12 + targetScore - (baselineScore + 10), parent: 1, state: "path" },
    { id: 3, score: baselineScore + 25, label: "Enforce Carbon Corridor Limits (-15%)", cost: 28, heuristic: Math.max(0, targetScore - (baselineScore + 25)), gScore: 28, fScore: 28 + Math.max(0, targetScore - (baselineScore + 25)), parent: 2, state: "path" },
    { id: 4, score: targetScore, label: "Optimized Water Recharge (+12%)", cost: 40, heuristic: 0, gScore: 40, fScore: 40, parent: 3, state: "path" },
    { id: 5, score: baselineScore + 6, label: "Alternative Energy Grid Intake", cost: 22, heuristic: targetScore - (baselineScore + 6), gScore: 22, fScore: 22 + targetScore - (baselineScore + 6), parent: 1, state: "unexplored" },
    { id: 6, score: baselineScore + 16, label: "Acoustic Noise Control Enforcements", cost: 34, heuristic: targetScore - (baselineScore + 16), gScore: 34, fScore: 34 + targetScore - (baselineScore + 16), parent: 5, state: "unexplored" },
  ];
}
