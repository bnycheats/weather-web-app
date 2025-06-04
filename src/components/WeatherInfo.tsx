import type { PropsWithChildren } from "react";

export function WeatherInfoContainer(props: PropsWithChildren) {
  return (
    <div className="relative md:absolute text-white flex flex-col py-6 md:py-0 md:flex-row gap-10 md:gap-4 md:min-h-60 w-full bottom-0">
      <div className="bg-gray-600 top-0 z-0 absolute w-full h-full opacity-80" />
      {props.children}
    </div>
  );
}

export function WeatherInfoLarge(props: WeatherInfoLargeProps) {
  const { startTime, temperature, weatherIcon } = props;
  return (
    <div className="flex z-10 gap-2 px-16 justify-center items-center">
      <div className="flex-col items-center flex gap-2">
        {temperature && <span className="text-4xl sm:text-6xl md:text-8xl">{temperature}°</span>}
        {startTime && (
          <div className="uppercase text-sm sm:text-md bg-gray-800 px-2 rounded-full">
            {startTime}
          </div>
        )}
      </div>
      <div>
        {weatherIcon && (
          <img className="w-16 sm:w-20 md:w-28" about="WeatherIcon" src={weatherIcon} />
        )}
      </div>
    </div>
  );
}

export function WeatherInfo(props: WeatherInfoProps) {
  const { startTime, temperature, weatherIcon } = props;
  return (
    <div className="border-l-1 border-gray-700 h-full justify-center flex items-center gap-2 sm:gap-3 md:gap-4 flex-col">
      {startTime && (
        <span className="uppercase text-sm sm:text-md bg-gray-800 px-2 rounded-full">
          {startTime}
        </span>
      )}
      {weatherIcon && (
        <img className="w-8 sm:w-10" about="WeatherIcon" src={weatherIcon} />
      )}
      {temperature && <span className="text-xl sm:text-2xl">{temperature}°</span>}
    </div>
  );
}

type WeatherInfoLargeProps = {
  temperature?: number;
  startTime?: string;
  weatherIcon?: string;
};

type WeatherInfoProps = {
  temperature?: number;
  startTime?: string;
  weatherIcon?: string;
};
