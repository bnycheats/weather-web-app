import type { TimelineResponse } from "@/utils/types";
import { formatISO, startOfDay, addDays } from "date-fns";

export async function getForecast(latitude?: number, longitude?: number) {
  try {
    const endpoint = new URL(
      `${import.meta.env.VITE_TOMORROW_API_URL}/v4/timelines`
    );
    endpoint.searchParams.set("apikey", import.meta.env.VITE_TOMORROW_API_KEY);
    endpoint.searchParams.set("location", `${latitude},${longitude}`);
    endpoint.searchParams.set("fields", "temperature,weatherCode");
    endpoint.searchParams.set("units", "metric");
    endpoint.searchParams.set("timesteps", "1d");
    endpoint.searchParams.set("startTime", formatISO(startOfDay(new Date())));
    endpoint.searchParams.set(
      "endTime",
      formatISO(startOfDay(addDays(new Date(), 5)))
    );

    const response = await fetch(endpoint);

    return (await response.json()) as TimelineResponse;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
