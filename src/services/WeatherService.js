import { DateTime } from "luxon";

const API_KEY = "92580ea4c6faf9aec529b18b1b885d5e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

//example complete URL
//// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = function (infoType, searchParams) {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

const formatCurrentWeatherData = (data) => {
  const {
    coord: { lat, lon },
    main: { feels_like, humidity, pressure, temp, temp_max, temp_min },
    sys: { country, id, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    feels_like,
    humidity,
    pressure,
    temp,
    temp_max,
    temp_min,
    country,
    id,
    sunrise,
    sunset,
    weather,
    details,
    icon,
    speed,
  };
};

const statisticalForecastData = (data) => {
  console.log(data);

  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatLocaleTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatLocaleTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeatherData);

  const { lat, lon } = formattedCurrrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: " current , minutely,alerts",
    units: searchParams.units,
  }).then(statisticalForecastData);
  return { ...formattedCurrrentWeather, ...formattedForecastWeather };
};

const formatLocaleTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local Time : 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
export default getFormattedWeatherData;
