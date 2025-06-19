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
    <div className="max-w-7xl overflow-scroll md:overflow-hidden flex flex-col md:relative z-10 flex-1 shadow-2xl bg-[url('./assets/images/hero-img-mobile.jpg')] sm:bg-[url('./assets/images/hero-img.jpg')] h-full md:h-[700px] bg-cover bg-center rounded">
      <div className="px-5 flex-1 p-10 md:p-20">
        <div className="flex flex-col gap-6 md:flex-row items-center justify-between text-white text-shadow-lg">
          <div className="text-center md:text-left md:space-y-2 font-semibold">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lowercase">
              {format(new Date(), "p")}
            </h1>
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
      {first && rest && (
        <WeatherInfoContainer>
          <WeatherInfoLarge
            startTime={first?.date && format(new Date(first.date), "iii eo")}
            temperature={first?.tempC}
            weatherIcon={getWeatherIcon(Number(first?.weatherCode)) ?? ""}
          />
          <div className="flex-1 z-10 flex overflow-auto gap-12 pl-6 sm:pl-0 sm:justify-center md:gap-0 md:grid md:grid-cols-6 items-center">
            {rest.map((weather, index) => (
              <WeatherInfo
                key={index}
                startTime={format(new Date(weather.date), "iii")}
                temperature={weather.tempC}
                weatherIcon={getWeatherIcon(Number(weather?.weatherCode)) ?? ""}
              />
            ))}
          </div>
        </WeatherInfoContainer>
      )}
    </div>
  );
}

type WeatherCardProps = {
  intervals: Interval[];
  city?: string;
  country?: string;
};

export type Interval = {
  date: string;
  tempC: string;
  weatherCode: string;
  chanceofrain: string;
};
