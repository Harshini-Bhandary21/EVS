export interface CityDNA {
  environmentalHealth: number;
  waterResilience: number;
  carbonBalance: number;
  climateReadiness: number;
  urbanEfficiency: number;
}

export interface EnvironmentalMetrics {
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  ozone: number;
  noise: number;
  waterConsumption: number;
  greenCover: number;
  carbonEmissions: number;
  carbonAbsorbed: number;
  renewableEnergy: number;
  wasteEfficiency: number;
  populationDensity: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  carbonNeutralityTargetYear: number;
}

export interface HistoricalYearData {
  year: number;
  aqi: number;
  greenCover: number;
  waterStressIndex: number;
  carbonEmissions: number;
  temperature: number;
}

export interface CityData {
  id: string;
  name: string;
  state: string;
  coordinates: { lat: number; lng: number };
  metrics: EnvironmentalMetrics;
  dna: CityDNA;
  history: HistoricalYearData[];
  liveBounds: {
    aqi: [number, number];
    temp: [number, number];
    noise: [number, number];
  };
  policyDefaultCostMultiplier: number;
}

export const CITIES_DATA: CityData[] = [
  {
    id: "pune",
    name: "Pune",
    state: "Maharashtra",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    metrics: {
      aqi: 112,
      pm25: 42,
      pm10: 89,
      no2: 24,
      so2: 12,
      ozone: 31,
      noise: 64,
      waterConsumption: 165,
      greenCover: 34,
      carbonEmissions: 12.8,
      carbonAbsorbed: 4.8,
      renewableEnergy: 22,
      wasteEfficiency: 68,
      populationDensity: 5600,
      temperature: 28.5,
      humidity: 52,
      rainfall: 720,
      carbonNeutralityTargetYear: 2045,
    },
    dna: {
      environmentalHealth: 78,
      waterResilience: 62,
      carbonBalance: 70,
      climateReadiness: 81,
      urbanEfficiency: 74,
    },
    history: [
      { year: 2000, aqi: 75, greenCover: 42, waterStressIndex: 35, carbonEmissions: 6.2, temperature: 26.8 },
      { year: 2005, aqi: 88, greenCover: 39, waterStressIndex: 42, carbonEmissions: 7.8, temperature: 27.2 },
      { year: 2010, aqi: 98, greenCover: 37, waterStressIndex: 49, carbonEmissions: 9.5, temperature: 27.6 },
      { year: 2015, aqi: 105, greenCover: 35, waterStressIndex: 56, carbonEmissions: 11.2, temperature: 28.0 },
      { year: 2020, aqi: 110, greenCover: 33, waterStressIndex: 61, carbonEmissions: 12.1, temperature: 28.3 },
      { year: 2026, aqi: 112, greenCover: 34, waterStressIndex: 63, carbonEmissions: 12.8, temperature: 28.5 },
    ],
    liveBounds: {
      aqi: [95, 130],
      temp: [26, 32],
      noise: [58, 72],
    },
    policyDefaultCostMultiplier: 0.9,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    metrics: {
      aqi: 148,
      pm25: 58,
      pm10: 122,
      no2: 38,
      so2: 18,
      ozone: 28,
      noise: 78,
      waterConsumption: 190,
      greenCover: 18,
      carbonEmissions: 28.5,
      carbonAbsorbed: 6.2,
      renewableEnergy: 12,
      wasteEfficiency: 52,
      populationDensity: 21000,
      temperature: 30.2,
      humidity: 78,
      rainfall: 2200,
      carbonNeutralityTargetYear: 2050,
    },
    dna: {
      environmentalHealth: 54,
      waterResilience: 48,
      carbonBalance: 42,
      climateReadiness: 68,
      urbanEfficiency: 82,
    },
    history: [
      { year: 2000, aqi: 92, greenCover: 24, waterStressIndex: 45, carbonEmissions: 15.5, temperature: 29.1 },
      { year: 2005, aqi: 110, greenCover: 21, waterStressIndex: 52, carbonEmissions: 19.2, temperature: 29.4 },
      { year: 2010, aqi: 128, greenCover: 19, waterStressIndex: 58, carbonEmissions: 22.8, temperature: 29.7 },
      { year: 2015, aqi: 135, greenCover: 17, waterStressIndex: 65, carbonEmissions: 25.4, temperature: 30.0 },
      { year: 2020, aqi: 142, greenCover: 18, waterStressIndex: 69, carbonEmissions: 27.2, temperature: 30.1 },
      { year: 2026, aqi: 148, greenCover: 18, waterStressIndex: 72, carbonEmissions: 28.5, temperature: 30.2 },
    ],
    liveBounds: {
      aqi: [120, 175],
      temp: [28, 33],
      noise: [70, 85],
    },
    policyDefaultCostMultiplier: 1.5,
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    metrics: {
      aqi: 92,
      pm25: 31,
      pm10: 74,
      no2: 19,
      so2: 9,
      ozone: 36,
      noise: 62,
      waterConsumption: 140,
      greenCover: 22,
      carbonEmissions: 16.2,
      carbonAbsorbed: 5.5,
      renewableEnergy: 35,
      wasteEfficiency: 72,
      populationDensity: 4380,
      temperature: 25.4,
      humidity: 58,
      rainfall: 900,
      carbonNeutralityTargetYear: 2040,
    },
    dna: {
      environmentalHealth: 82,
      waterResilience: 55,
      carbonBalance: 68,
      climateReadiness: 76,
      urbanEfficiency: 86,
    },
    history: [
      { year: 2000, aqi: 58, greenCover: 38, waterStressIndex: 30, carbonEmissions: 7.2, temperature: 24.1 },
      { year: 2005, aqi: 68, greenCover: 32, waterStressIndex: 39, carbonEmissions: 9.4, temperature: 24.5 },
      { year: 2010, aqi: 79, greenCover: 27, waterStressIndex: 48, carbonEmissions: 11.8, temperature: 24.9 },
      { year: 2015, aqi: 85, greenCover: 23, waterStressIndex: 59, carbonEmissions: 13.9, temperature: 25.1 },
      { year: 2020, aqi: 89, greenCover: 21, waterStressIndex: 65, carbonEmissions: 15.1, temperature: 25.3 },
      { year: 2026, aqi: 92, greenCover: 22, waterStressIndex: 68, carbonEmissions: 16.2, temperature: 25.4 },
    ],
    liveBounds: {
      aqi: [78, 110],
      temp: [22, 28],
      noise: [55, 68],
    },
    policyDefaultCostMultiplier: 1.1,
  },
  {
    id: "delhi",
    name: "Delhi",
    state: "Delhi NCR",
    coordinates: { lat: 28.6139, lng: 77.2090 },
    metrics: {
      aqi: 284,
      pm25: 145,
      pm10: 254,
      no2: 54,
      so2: 24,
      ozone: 48,
      noise: 75,
      waterConsumption: 172,
      greenCover: 20,
      carbonEmissions: 38.2,
      carbonAbsorbed: 7.4,
      renewableEnergy: 15,
      wasteEfficiency: 45,
      populationDensity: 11300,
      temperature: 32.8,
      humidity: 45,
      rainfall: 610,
      carbonNeutralityTargetYear: 2060,
    },
    dna: {
      environmentalHealth: 32,
      waterResilience: 40,
      carbonBalance: 29,
      climateReadiness: 50,
      urbanEfficiency: 78,
    },
    history: [
      { year: 2000, aqi: 178, greenCover: 16, waterStressIndex: 55, carbonEmissions: 18.2, temperature: 31.2 },
      { year: 2005, aqi: 204, greenCover: 17, waterStressIndex: 62, carbonEmissions: 22.4, temperature: 31.6 },
      { year: 2010, aqi: 238, greenCover: 19, waterStressIndex: 71, carbonEmissions: 27.9, temperature: 32.1 },
      { year: 2015, aqi: 265, greenCover: 20, waterStressIndex: 78, carbonEmissions: 32.5, temperature: 32.5 },
      { year: 2020, aqi: 278, greenCover: 19, waterStressIndex: 82, carbonEmissions: 36.1, temperature: 32.7 },
      { year: 2026, aqi: 284, greenCover: 20, waterStressIndex: 85, carbonEmissions: 38.2, temperature: 32.8 },
    ],
    liveBounds: {
      aqi: [220, 360],
      temp: [30, 38],
      noise: [68, 82],
    },
    policyDefaultCostMultiplier: 1.8,
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    coordinates: { lat: 17.3850, lng: 78.4867 },
    metrics: {
      aqi: 124,
      pm25: 48,
      pm10: 98,
      no2: 29,
      so2: 14,
      ozone: 33,
      noise: 66,
      waterConsumption: 155,
      greenCover: 19,
      carbonEmissions: 18.4,
      carbonAbsorbed: 3.9,
      renewableEnergy: 28,
      wasteEfficiency: 63,
      populationDensity: 7890,
      temperature: 31.1,
      humidity: 48,
      rainfall: 820,
      carbonNeutralityTargetYear: 2048,
    },
    dna: {
      environmentalHealth: 71,
      waterResilience: 58,
      carbonBalance: 59,
      climateReadiness: 73,
      urbanEfficiency: 80,
    },
    history: [
      { year: 2000, aqi: 82, greenCover: 14, waterStressIndex: 40, carbonEmissions: 8.5, temperature: 29.6 },
      { year: 2005, aqi: 95, greenCover: 15, waterStressIndex: 47, carbonEmissions: 10.9, temperature: 30.0 },
      { year: 2010, aqi: 108, greenCover: 16, waterStressIndex: 53, carbonEmissions: 13.5, temperature: 30.4 },
      { year: 2015, aqi: 115, greenCover: 17, waterStressIndex: 61, carbonEmissions: 15.9, temperature: 30.8 },
      { year: 2020, aqi: 120, greenCover: 18, waterStressIndex: 65, carbonEmissions: 17.2, temperature: 31.0 },
      { year: 2026, aqi: 124, greenCover: 19, waterStressIndex: 67, carbonEmissions: 18.4, temperature: 31.1 },
    ],
    liveBounds: {
      aqi: [100, 145],
      temp: [28, 35],
      noise: [60, 72],
    },
    policyDefaultCostMultiplier: 1.05,
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    metrics: {
      aqi: 88,
      pm25: 29,
      pm10: 68,
      no2: 18,
      so2: 10,
      ozone: 30,
      noise: 68,
      waterConsumption: 130,
      greenCover: 16,
      carbonEmissions: 19.8,
      carbonAbsorbed: 4.1,
      renewableEnergy: 32,
      wasteEfficiency: 59,
      populationDensity: 17000,
      temperature: 32.0,
      humidity: 74,
      rainfall: 1400,
      carbonNeutralityTargetYear: 2045,
    },
    dna: {
      environmentalHealth: 75,
      waterResilience: 42,
      carbonBalance: 56,
      climateReadiness: 62,
      urbanEfficiency: 79,
    },
    history: [
      { year: 2000, aqi: 68, greenCover: 19, waterStressIndex: 50, carbonEmissions: 9.8, temperature: 30.8 },
      { year: 2005, aqi: 74, greenCover: 17, waterStressIndex: 58, carbonEmissions: 12.1, temperature: 31.1 },
      { year: 2010, aqi: 80, greenCover: 15, waterStressIndex: 68, carbonEmissions: 14.8, temperature: 31.4 },
      { year: 2015, aqi: 84, greenCover: 15, waterStressIndex: 76, carbonEmissions: 17.1, temperature: 31.7 },
      { year: 2020, aqi: 86, greenCover: 16, waterStressIndex: 82, carbonEmissions: 18.5, temperature: 31.9 },
      { year: 2026, aqi: 88, greenCover: 16, waterStressIndex: 84, carbonEmissions: 19.8, temperature: 32.0 },
    ],
    liveBounds: {
      aqi: [70, 105],
      temp: [29, 36],
      noise: [62, 74],
    },
    policyDefaultCostMultiplier: 1.2,
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    coordinates: { lat: 22.5726, lng: 88.3639 },
    metrics: {
      aqi: 156,
      pm25: 64,
      pm10: 135,
      no2: 36,
      so2: 16,
      ozone: 26,
      noise: 76,
      waterConsumption: 160,
      greenCover: 14,
      carbonEmissions: 22.1,
      carbonAbsorbed: 3.5,
      renewableEnergy: 10,
      wasteEfficiency: 49,
      populationDensity: 22000,
      temperature: 29.8,
      humidity: 76,
      rainfall: 1600,
      carbonNeutralityTargetYear: 2055,
    },
    dna: {
      environmentalHealth: 50,
      waterResilience: 52,
      carbonBalance: 45,
      climateReadiness: 55,
      urbanEfficiency: 70,
    },
    history: [
      { year: 2000, aqi: 110, greenCover: 18, waterStressIndex: 38, carbonEmissions: 12.2, temperature: 28.6 },
      { year: 2005, aqi: 125, greenCover: 16, waterStressIndex: 43, carbonEmissions: 14.9, temperature: 28.9 },
      { year: 2010, aqi: 138, greenCover: 15, waterStressIndex: 49, carbonEmissions: 17.5, temperature: 29.2 },
      { year: 2015, aqi: 146, greenCover: 13, waterStressIndex: 56, carbonEmissions: 19.8, temperature: 29.5 },
      { year: 2020, aqi: 151, greenCover: 13, waterStressIndex: 61, carbonEmissions: 20.9, temperature: 29.7 },
      { year: 2026, aqi: 156, greenCover: 14, waterStressIndex: 64, carbonEmissions: 22.1, temperature: 29.8 },
    ],
    liveBounds: {
      aqi: [125, 185],
      temp: [27, 33],
      noise: [68, 80],
    },
    policyDefaultCostMultiplier: 1.3,
  }
];
