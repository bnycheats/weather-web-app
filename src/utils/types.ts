export type WeatherForecast = {
  startTime: string; // ISO 8601 format
  values: {
    temperature: number;
    weatherCode: number;
  };
};

export type TimelineResponse = {
  data: {
    timelines: {
      intervals: WeatherForecast[];
    }[];
  };
};

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
