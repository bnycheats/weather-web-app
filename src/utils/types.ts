export type OpenCageResponse = {
  documentation: string;
  licenses: {
    name: string;
    url: string;
  }[];
  rate: {
    limit: number;
    remaining: number;
    reset: number;
  };
  results: OpenCageResult[];
  status: {
    code: number;
    message: string;
  };
  stay_informed: {
    blog: string;
    twitter: string;
  };
  thanks: string;
  timestamp: {
    created_http: string;
    created_unix: number;
  };
  total_results: number;
};

type OpenCageResult = {
  annotations: {
    [key: string]: any; // Can be narrowed down further if needed
  };
  bounds: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
  components: {
    [key: string]: string; // e.g. city, country, state, etc.
  };
  confidence: number;
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
};

export type SearchOpenCageResult = {
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
  components: Record<string, any>;
};

export type SearchOpenCageResponse = {
  results: SearchOpenCageResult[];
};

export type WorldWeatherOnlineResponse = {
  data: {
    request: RequestItem[];
    current_condition: CurrentCondition[];
    weather: DailyWeather[];
    ClimateAverages: ClimateAverages[];
  };
};

type RequestItem = {
  type: string;
  query: string;
};

type CurrentCondition = {
  observation_time: string;
  temp_C: string;
  temp_F: string;
  weatherCode: string;
  weatherIconUrl: IconUrl[];
  weatherDesc: WeatherDesc[];
  windspeedMiles: string;
  windspeedKmph: string;
  winddirDegree: string;
  winddir16Point: string;
  precipMM: string;
  precipInches: string;
  humidity: string;
  visibility: string;
  visibilityMiles: string;
  pressure: string;
  pressureInches: string;
  cloudcover: string;
  FeelsLikeC: string;
  FeelsLikeF: string;
  uvIndex: string;
};

type DailyWeather = {
  date: string;
  astronomy: Astronomy[];
  maxtempC: string;
  maxtempF: string;
  mintempC: string;
  mintempF: string;
  avgtempC: string;
  avgtempF: string;
  totalSnow_cm: string;
  sunHour: string;
  uvIndex: string;
  hourly: HourlyWeather[];
};

type Astronomy = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
};

type HourlyWeather = {
  time: string;
  tempC: string;
  tempF: string;
  windspeedMiles: string;
  windspeedKmph: string;
  winddirDegree: string;
  winddir16Point: string;
  weatherCode: string;
  weatherIconUrl: IconUrl[];
  weatherDesc: WeatherDesc[];
  precipMM: string;
  precipInches: string;
  humidity: string;
  visibility: string;
  visibilityMiles: string;
  pressure: string;
  pressureInches: string;
  cloudcover: string;
  HeatIndexC: string;
  HeatIndexF: string;
  DewPointC: string;
  DewPointF: string;
  WindChillC: string;
  WindChillF: string;
  WindGustMiles: string;
  WindGustKmph: string;
  FeelsLikeC: string;
  FeelsLikeF: string;
  chanceofrain: string;
  chanceofremdry: string;
  chanceofwindy: string;
  chanceofovercast: string;
  chanceofsunshine: string;
  chanceoffrost: string;
  chanceofhightemp: string;
  chanceoffog: string;
  chanceofsnow: string;
  chanceofthunder: string;
  uvIndex: string;
  shortRad: string;
  diffRad: string;
};

type ClimateAverages = {
  month: ClimateMonth[];
};

type ClimateMonth = {
  index: string;
  name: string;
  avgMinTemp: string;
  avgMinTemp_F: string;
  absMaxTemp: string;
  absMaxTemp_F: string;
  avgDailyRainfall: string;
};

type IconUrl = {
  value: string;
};

type WeatherDesc = {
  value: string;
};
