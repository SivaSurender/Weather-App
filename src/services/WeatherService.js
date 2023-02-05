const API_KEY = "92580ea4c6faf9aec529b18b1b885d5e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

//example complete URL
//// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = function (infoType, searchParams) {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  console.log(url);
  console.log(url.search);

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

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeatherData);

  return formattedCurrrentWeather;
};

export default getFormattedWeatherData;
