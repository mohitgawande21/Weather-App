import Header from "./components/Header";
import React, { useEffect, useState, Suspense, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { onSubmit } from "./Redux/ActionCreator";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useFetchWeather from "./hooks/useFetchWeather";
import { toastNotify } from "./toast";
import { Loader } from "./components/Loader";
import { futureWeather } from "../src/Redux/ActionCreator";
const FiveDayForecastLazy = React.lazy(
  () => import("./components/FiveDayForecast"),
);
const WeatherCardLazy = React.lazy(() => import("./components/WeatherCard"));

function App() {
  const dispatch = useDispatch();
  const [weatherData, setWeatherData] = useState(null);
  const [url, setUrl] = useState("");
  const reduxCity = useSelector((state) => state.inputCity);
  let check = useSelector((state) => {
    return state.Check;
  });
  const [currentCity, setCurrentCity] = useState(
    localStorage.getItem("city") || reduxCity || "",
  );

  const { loading: weatherLoading, callApiEndPoint } = useFetchWeather();

  const fetchForecast = useCallback(
    async function (cityname) {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        if (!apiKey) {
          toastNotify(
            "Missing API key: set REACT_APP_WEATHER_API_KEY in your .env",
            true,
          );
          return;
        }
        const data = await callApiEndPoint(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&${!check ? "units=metric" : "units=imperial"}&appid=${apiKey}&cnt=5`,
        );
        dispatch(futureWeather(data));
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, currentCity, check],
  );

  const onCityFetchWeather = useCallback(
    async (cityName) => {
      try {
        const data = await callApiEndPoint(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`,
        );
        setWeatherData(data);
        cityName?.length && dispatch(onSubmit(cityName));
        setCurrentCity(data.name);
        fetchForecast(cityName);
        setUrl(
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        );
        console.log("Fetched data in WeatherCard:", data); // Debug log
      } catch (err) {
        console.error("Weather fetch error:", err);
        // Optionally show toast here if needed
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, setCurrentCity, setUrl],
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      toastNotify("Geolocation is not supported by your browser", true);
      return;
    }

    // Get current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const fetchWeatherByCoords = async () => {
          try {
            const data = await callApiEndPoint(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`,
            );
            setWeatherData(data);
            localStorage.setItem("city", data.name);
            setCurrentCity(data.name);
            fetchForecast(data.name);
            setUrl(
              `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            );
          } catch (err) {
            console.error("Geolocation weather fetch error:", err);
          }
        };

        fetchWeatherByCoords();
      },
      (err) => {
        if (localStorage.getItem("city")) {
          onCityFetchWeather(currentCity);
        }
        toastNotify(
          "Unable to retrieve your location. Please enter your city manually.",
          true,
        );
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Header currentCity={currentCity} />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <WeatherCardLazy
                    weatherData={weatherData}
                    url={url}
                    loading={weatherLoading}
                    onCityFetchWeather={onCityFetchWeather}
                  />
                </Suspense>
              }
            />
            <Route
              path="/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <FiveDayForecastLazy />{" "}
                </Suspense>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
