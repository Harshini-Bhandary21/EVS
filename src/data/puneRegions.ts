export interface PuneRegionWeather {
  temp: number;
  humidity: number;
  windSpeed: number;
  windDir: string;
  condition: string;
  aqi: number;
}

export interface PuneRegionData {
  id: string;
  name: string;
  type: string;
  x: number; // SVG X coordinate
  y: number; // SVG Y coordinate
  lat: number;
  lng: number;
  carbonFootprint: number; // Tonnes CO2e/year
  sustainabilityScore: number; // Out of 100
  treeCover: number; // Percentage
  suggestiveMeasures: string[];
  weather: PuneRegionWeather;
}

export const PUNE_REGIONS: PuneRegionData[] = [
  {
    id: "hinjawadi",
    name: "Hinjawadi IT Park",
    type: "IT & Commercial Zone",
    x: 70,
    y: 150,
    lat: 18.5913,
    lng: 73.7389,
    carbonFootprint: 2450,
    sustainabilityScore: 68,
    treeCover: 22,
    suggestiveMeasures: [
      "Enforce mandatory solar micro-grids on major corporate multi-acre IT complexes.",
      "Expand dedicated electric shuttle grids connecting Metro Stations directly to IT Phases 1, 2, and 3.",
      "Implement centralized smart HVAC monitoring systems to curb massive peak cooling loads.",
      "Deploy commercial greywater purification systems for structural cooling towers."
    ],
    weather: {
      temp: 29.8,
      humidity: 46,
      windSpeed: 14,
      windDir: "WNW",
      condition: "Partially Cloudy",
      aqi: 125
    }
  },
  {
    id: "kothrud",
    name: "Kothrud",
    type: "Dense Residential",
    x: 150,
    y: 270,
    lat: 18.5074,
    lng: 73.8077,
    carbonFootprint: 1120,
    sustainabilityScore: 85,
    treeCover: 44,
    suggestiveMeasures: [
      "Rigidly preserve local tekdi (hillock) biodiversity zones to prevent building encroaching.",
      "Provide municipal tax rebates for multi-family residential rainwater harvesting upgrades.",
      "Establish localized dry/wet segregation and zero-waste composting community pods.",
      "Encourage low-emission zone traffic restrictions during high thermal hours."
    ],
    weather: {
      temp: 27.2,
      humidity: 58,
      windSpeed: 9,
      windDir: "WSW",
      condition: "Clear & Fresh",
      aqi: 85
    }
  },
  {
    id: "shivajinagar",
    name: "Shivajinagar",
    type: "Central Administrative Hub",
    x: 250,
    y: 200,
    lat: 18.5312,
    lng: 73.8445,
    carbonFootprint: 1890,
    sustainabilityScore: 72,
    treeCover: 35,
    suggestiveMeasures: [
      "Designate car-free shopping and educational walkways around central parks and college limits.",
      "Install solar canopy charging stations at Swargate/Shivajinagar transport interchange zones.",
      "Incorporate green bio-filtration borders on primary arterial roadways to trap high diesel particulates.",
      "Increase public water mist suppression nozzles to damp roadside PM10 levels."
    ],
    weather: {
      temp: 28.5,
      humidity: 52,
      windSpeed: 11,
      windDir: "W",
      condition: "Sunny & Breezy",
      aqi: 110
    }
  },
  {
    id: "viman-nagar",
    name: "Viman Nagar",
    type: "Commercial & Transit Corridor",
    x: 380,
    y: 130,
    lat: 18.5679,
    lng: 73.9143,
    carbonFootprint: 1980,
    sustainabilityScore: 70,
    treeCover: 26,
    suggestiveMeasures: [
      "Apply high-albedo cool roof coatings to retail complexes to alleviate extreme urban heat islands.",
      "Install solar canopy arrays over open-air parking structures at international terminals.",
      "Create perimeter gravel-filtration swales to capture runoffs near large commercial concrete decks.",
      "Introduce low-noise tarmac coatings on high-traffic airport corridors."
    ],
    weather: {
      temp: 29.1,
      humidity: 50,
      windSpeed: 12,
      windDir: "WSW",
      condition: "Sunny",
      aqi: 115
    }
  },
  {
    id: "hadapsar",
    name: "Hadapsar Industrial Zone",
    type: "Industrial & Logistics",
    x: 410,
    y: 280,
    lat: 18.5089,
    lng: 73.926,
    carbonFootprint: 3120,
    sustainabilityScore: 59,
    treeCover: 18,
    suggestiveMeasures: [
      "Enforce mandatory high-efficiency particulate scrubbers on metal smelting and industrial exhaust vents.",
      "Construct extensive sponge-city permeable roadside buffers to process industrial runoff water.",
      "Mandate thick Miyawaki urban forest buffers on all manufacturing estate property outlines.",
      "Formulate strict night-time commercial logistics routing to isolate acoustic noise impact."
    ],
    weather: {
      temp: 30.2,
      humidity: 42,
      windSpeed: 15,
      windDir: "WNW",
      condition: "Hazy & Warm",
      aqi: 138
    }
  },
  {
    id: "baner",
    name: "Baner & Balewadi",
    type: "High-Rise Residential",
    x: 140,
    y: 100,
    lat: 18.559,
    lng: 73.7788,
    carbonFootprint: 1480,
    sustainabilityScore: 78,
    treeCover: 30,
    suggestiveMeasures: [
      "Implement smart borewell sensor tracking to enforce strict groundwater extraction limits.",
      "Encourage exterior green wall/vertical trellis setups to shade tall residential towers.",
      "Provide clean bicycle lanes connecting transit lines directly to Baner Hill recreational trails.",
      "Mandate rainwater catchment basins to secure local water availability."
    ],
    weather: {
      temp: 28.0,
      humidity: 54,
      windSpeed: 10,
      windDir: "W",
      condition: "Clear Sky",
      aqi: 92
    }
  },
  {
    id: "koregaon-park",
    name: "Koregaon Park",
    type: "Premium Canopy Zone",
    x: 340,
    y: 200,
    lat: 18.5362,
    lng: 73.894,
    carbonFootprint: 890,
    sustainabilityScore: 91,
    treeCover: 58,
    suggestiveMeasures: [
      "Impose severe municipal protection policies for decades-old heritage banyan canopy trees.",
      "Build wide permeable earthen paths and gravel lanes to enhance local aquifer drainage.",
      "Introduce multi-tier smart compost collection for zero-waste restaurant and café operations.",
      "Deploy electric micro-shuttles to restrict fossil-fuel passenger vehicles inside narrow lanes."
    ],
    weather: {
      temp: 27.5,
      humidity: 56,
      windSpeed: 8,
      windDir: "WSW",
      condition: "Clear & Calm",
      aqi: 70
    }
  },
  {
    id: "swargate",
    name: "Swargate",
    type: "High-Density Transit Center",
    x: 260,
    y: 310,
    lat: 18.5018,
    lng: 73.8636,
    carbonFootprint: 2210,
    sustainabilityScore: 62,
    treeCover: 20,
    suggestiveMeasures: [
      "Enforce dedicated bus rapid transit corridors (BRT) to prevent gridlocks and heavy exhaust idling.",
      "Erect double-pane glass acoustic barriers near Swargate central transport depots.",
      "Activate high-pressure particulate misting grids at major crossroads to bind roadside dust.",
      "Mandate eco-efficiency checkups for heavy diesel transit buses entering central depots."
    ],
    weather: {
      temp: 28.9,
      humidity: 51,
      windSpeed: 13,
      windDir: "WSW",
      condition: "Dusty & Sunny",
      aqi: 128
    }
  }
];
