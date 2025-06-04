import type { OpenCageResponse } from "@/utils/types";

export async function reverseGeocode(lat?: number, lon?: number) {
  try {
    const endpoint = new URL(
      `${import.meta.env.VITE_OPENCAGE_API_URL}/v1/json`
    );

    endpoint.searchParams.set("key", import.meta.env.VITE_OPENCAGE_API_KEY);
    endpoint.searchParams.set("q", `${lat},${lon}`);
    endpoint.searchParams.set("pretty", "1");
    endpoint.searchParams.set("no_annotations", "1");
    endpoint.searchParams.set("language", "en");

    const response = await fetch(endpoint);

    return (await response.json()) as OpenCageResponse;
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return null;
  }
}
