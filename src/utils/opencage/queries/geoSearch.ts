import type { SearchOpenCageResponse } from "@/utils/types";

export async function geoSearch(searchText: string) {
  try {
    const endpoint = new URL(
      `${import.meta.env.VITE_OPENCAGE_API_URL}/v1/json`
    );

    endpoint.searchParams.set("key", import.meta.env.VITE_OPENCAGE_API_KEY);
    endpoint.searchParams.set("q", searchText);
    endpoint.searchParams.set("limit", "5");
    endpoint.searchParams.set("language", "en");

    const response = await fetch(endpoint);

    return (await response.json()) as SearchOpenCageResponse;
  } catch (error) {
    console.error("Geo search error:", error);
    return null;
  }
}
