const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

export class WeatherApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "WeatherApiError";
    this.status = status;
  }
}

const getJson = async (url, signal) => {
  const response = await fetch(url, { signal });
  let data;

  try {
    data = await response.json();
  } catch {
    throw new WeatherApiError(
      "The weather service returned invalid data.",
      response.status,
    );
  }

  const apiStatus = Number(data?.cod);
  if (!response.ok || (apiStatus && apiStatus !== 200)) {
    throw new WeatherApiError(
      data?.message || "The weather service could not complete the request.",
      response.status || apiStatus,
    );
  }

  return data;
};

const requireApiKey = (apiKey) => {
  if (!apiKey) {
    throw new WeatherApiError(
      "Missing API key: set REACT_APP_WEATHER_API_KEY in your .env",
    );
  }
};

export const fetchWeatherByCity = (city, apiKey, signal) => {
  requireApiKey(apiKey);
  const params = new URLSearchParams({
    q: city.trim(),
    units: "metric",
    appid: apiKey,
  });
  return getJson(`${API_BASE_URL}/weather?${params}`, signal);
};

export const fetchWeatherByCoordinates = (
  latitude,
  longitude,
  apiKey,
  signal,
) => {
  requireApiKey(apiKey);
  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    units: "metric",
    appid: apiKey,
  });
  return getJson(`${API_BASE_URL}/weather?${params}`, signal);
};

export const fetchForecastByCity = (city, units, apiKey, signal) => {
  requireApiKey(apiKey);
  const params = new URLSearchParams({
    q: city.trim(),
    units,
    appid: apiKey,
    cnt: "40",
  });
  return getJson(`${API_BASE_URL}/forecast?${params}`, signal);
};
