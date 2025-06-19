import CLEAR from "../assets/svg/clear.svg";
import CLEAR_NIGHT from "../assets/svg/clear-night.svg";
import DRIZZLE from "../assets/svg/drizzle.svg";
import FOG from "../assets/svg/fog.svg";
import FREEZING_RAIN from "../assets/svg/freezing-rain.svg";
import HEAVY_RAIN from "../assets/svg/heavy-rain.svg";
import ICE_PELLETES from "../assets/svg/ice-pellets.svg";
// import MOSTLY_CLOUD from "../assets/svg/mostly-cloud.svg";
// import MOSTLY_CLOUD_NIGHT from "../assets/svg/mostly-cloud-night.svg";
import PARTLY_CLOUD from "../assets/svg/partly-cloud.svg";
import PARTLY_CLOUD_NIGHT from "../assets/svg/partly-cloud-night.svg";
import CLOUDY from "../assets/svg/cloudy.svg";
import RAIN from "../assets/svg/rain.svg";
import SNOW from "../assets/svg/snow.svg";
import THUNDERSTORM from "../assets/svg/thunderstorm.svg";

import { isDaytime } from "./isDaytime";

export default function getWeatherIcon(code: number) {
  switch (code) {
    case 113:
      return isDaytime() ? CLEAR : CLEAR_NIGHT;
    case 116:
      return isDaytime() ? PARTLY_CLOUD : PARTLY_CLOUD_NIGHT;
    case 119:
      return CLOUDY;
    case 248:
      return FOG;
    case 353:
    case 353:
    case 296:
    case 293:
    case 299:
    case 302:
    case 176:
      return RAIN;
    case 263:
    case 266:
    case 185:
    case 281:
    case 284:
      return DRIZZLE;
    case 308:
    case 305:
    case 356:
    case 389:
      return HEAVY_RAIN;
    case 179:
    case 227:
    case 323:
    case 326:
    case 329:
    case 332:
    case 335:
    case 338:
    case 368:
    case 371:
    case 392:
      return SNOW;
    case 311:
    case 314:
      return FREEZING_RAIN;
    case 350:
    case 374:
    case 377:
      return ICE_PELLETES;
    case 200:
    case 386:
    case 389:
    case 395:
      return THUNDERSTORM;
    default:
      return null;
  }
}
