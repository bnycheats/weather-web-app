import { useQuery } from "@tanstack/react-query";
import WeatherCard, { type Interval } from "./components/WeatherCard";
import { useGeolocation } from "./hooks/useGeolocation";
import { getForecast } from "./utils/worldweatheronline/queries/timelines";
import { format } from "date-fns";

function App() {
  const { location, error, ...rest } = useGeolocation();

  const { data } = useQuery({
    queryKey: ["forecast", location?.latitude, location?.longitude],
    queryFn: () => getForecast(location?.latitude, location?.longitude),
    staleTime: 5 * 60 * 1000,
    enabled: !!(location?.latitude && location?.longitude),
  });

  const todayTime = format(new Date(), "hmm");

  const intervals: Interval[] =
    data?.data?.weather.map((item) => {
      const find = item.hourly
        .reverse()
        .find((h) => Number(h.time) <= Number(todayTime));
      return {
        date: item.date,
        tempC: find?.tempC ?? "",
        weatherCode: find?.weatherCode ?? "",
        chanceofrain: find?.chanceofrain ?? "",
      };
    }) ?? [];

  return (
    <div className="flex bg-[url('./assets/images/hero-img.jpg')] bg-cover bg-center h-screen items-center justify-center">
      <div className="bg-white/30 absolute backdrop-grayscale-50 h-screen w-screen"></div>
      <WeatherCard intervals={intervals} {...rest} />
    </div>
  );
}

export default App;
