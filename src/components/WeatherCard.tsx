import type { WeatherForecast } from "@/utils/types";
import { format } from "date-fns";
import getWeatherIcon from "@/utils/getWeatherIcon";
import {
  WeatherInfo,
  WeatherInfoContainer,
  WeatherInfoLarge,
} from "./WeatherInfo";
import SearchInput from "./SearchInput";

export default function WeatherCard(props: WeatherCardProps) {
  const { intervals, city, country } = props;
  const [first, ...rest] = intervals;
  return (
    <div className="max-w-7xl overflow-scroll md:overflow-hidden flex flex-col md:relative z-10 flex-1 shadow-2xl bg-[url('./assets/images/hero-img.jpg')] h-full md:h-[700px] bg-cover bg-center rounded">
      <div className="px-5 flex-1 p-10 md:p-20">
        <div className="flex flex-col gap-6 md:flex-row items-center justify-between text-white text-shadow-lg">
          <div className="text-center md:text-left md:space-y-2 font-semibold">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lowercase">{format(new Date(), "p")}</h1>
            <span className="text-lg sm:text-xl md:text-2xl">
              {format(new Date(), "EEEE, d MMMM yyyy")}
            </span>
          </div>
          <div className="text-center md:text-right font-semibold md:space-y-2">
            <div className="text-2xl sm:text-3xl md:text-4xl">{city}</div>
            <span className="text-md sm:text-xl md:text-2xl">{country}</span>
          </div>
        </div>
        <SearchInput />
      </div>
      <WeatherInfoContainer>
        <WeatherInfoLarge
          startTime={
            first?.startTime && format(new Date(first.startTime), "iii eo")
          }
          temperature={first?.values?.temperature}
          weatherIcon={getWeatherIcon(first?.values?.weatherCode) ?? ""}
        />
        <div className="flex-1 z-10 grid grid-cols-4 items-center">
          {rest.map((weather, index) => (
            <WeatherInfo
              key={index}
              startTime={format(new Date(weather.startTime), "iii")}
              temperature={weather.values.temperature}
              weatherIcon={getWeatherIcon(weather?.values?.weatherCode) ?? ""}
            />
          ))}
        </div>
      </WeatherInfoContainer>
    </div>
  );
}

type WeatherCardProps = {
  intervals: WeatherForecast[];
  city?: string;
  country?: string;
};
