import { useQuery } from "@tanstack/react-query";
import WeatherCard from "./components/WeatherCard";
import { useGeolocation } from "./hooks/useGeolocation";
import { getForecast } from "./utils/tomorrow/queries/timelines";

function App() {
  const { location, error, ...rest } = useGeolocation();

  const { data } = useQuery({
    queryKey: ["forecast", location?.latitude, location?.longitude],
    queryFn: () => getForecast(location?.latitude, location?.longitude),
    staleTime: 5 * 60 * 1000,
    enabled: !!(location?.latitude && location?.longitude),
  });

  return (
    <div className="flex bg-[url('./assets/images/hero-img.jpg')] bg-cover bg-center h-screen items-center justify-center">
      <div className="bg-white/30 absolute backdrop-grayscale-50 h-screen w-screen"></div>
      <WeatherCard
        intervals={data?.data?.timelines[0]?.intervals?.slice(1, 6) ?? []}
        {...rest}
      />
    </div>
  );
}

export default App;
