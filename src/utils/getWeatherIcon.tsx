import CLEAR from "../assets/svg/clear.svg";
import CLEAR_NIGHT from "../assets/svg/clear-night.svg";
import DRIZZLE from "../assets/svg/drizzle.svg";
import FOG from "../assets/svg/fog.svg";
import FREEZING_RAIN from "../assets/svg/freezing-rain.svg";
import HEAVY_RAIN from "../assets/svg/heavy-rain.svg";
import ICE_PELLETES from "../assets/svg/ice-pellets.svg";
import MOSTLY_CLOUD from "../assets/svg/mostly-cloud.svg";
import MOSTLY_CLOUD_NIGHT from "../assets/svg/mostly-cloud-night.svg";
import PARTLY_CLOUD from "../assets/svg/partly-cloud.svg";
import PARTLY_CLOUD_NIGHT from "../assets/svg/partly-cloud-night.svg";
import CLOUDY from "../assets/svg/cloudy.svg";
import RAIN from "../assets/svg/rain.svg";
import SNOW from "../assets/svg/snow.svg";
import THUNDERSTORM from "../assets/svg/thunderstorm.svg";

import { isDaytime } from "./isDaytime";

export default function getWeatherIcon(code: number) {
  switch (code) {
    case 1000:
    case 1100:
      return isDaytime() ? CLEAR : CLEAR_NIGHT;
    case 1101:
      return isDaytime() ? PARTLY_CLOUD : PARTLY_CLOUD_NIGHT;
    case 1102:
      return isDaytime() ? MOSTLY_CLOUD : MOSTLY_CLOUD_NIGHT;
    case 1001:
      return CLOUDY;
    case 2100:
    case 2000:
      return FOG;
    case 4000:
      return DRIZZLE;
    case 4200:
    case 4001:
      return RAIN;
    case 4201:
      return HEAVY_RAIN;
    case 5001:
    case 5100:
    case 5000:
    case 5101:
      return SNOW;
    case 6000:
    case 6200:
    case 6001:
      return FREEZING_RAIN;
    case 7102:
    case 7000:
    case 7101:
      return ICE_PELLETES;
    case 8000:
      return THUNDERSTORM;
    default:
      return null;
  }
}
