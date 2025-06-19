import type { WorldWeatherOnlineResponse } from "@/utils/types";

export async function getForecast(latitude?: number, longitude?: number) {
  try {
    const endpoint = new URL(
      `${
        import.meta.env.VITE_WORLDWEATHERONLINE_API_URL
      }/premium/v1/weather.ashx`
    );
    endpoint.searchParams.set(
      "key",
      import.meta.env.VITE_WORLDWEATHERONLINE_API_KEY
    );
    endpoint.searchParams.set("q", `${latitude},${longitude}`);
    endpoint.searchParams.set("format", "json");
    endpoint.searchParams.set("tp", "3");
    endpoint.searchParams.set("num_of_days", "7");

    const response = await fetch(endpoint);

    return (await response.json()) as WorldWeatherOnlineResponse;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
