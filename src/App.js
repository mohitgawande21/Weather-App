import Header from "./components/Header";
import React, { useEffect, useState, Suspense, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { onSubmit } from "./Redux/ActionCreator";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useFetchWeather from "./hooks/useFetchWeather";
import { toastNotify } from "./toast";
import { Loader } from "./components/Loader";
import { futureWeather } from "../src/Redux/ActionCreator";
import {
  fetchForecastByCity,
  fetchWeatherByCity,
  fetchWeatherByCoordinates,
} from "./services/weatherApi";
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
    async function (cityname, { notify = true } = {}) {
      try {
        const data = await callApiEndPoint(
          (signal) =>
            fetchForecastByCity(
              cityname,
              !check ? "metric" : "imperial",
              process.env.REACT_APP_WEATHER_API_KEY,
              signal,
            ),
          { notify },
        );
        dispatch(futureWeather(data));
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callApiEndPoint, dispatch, check],
  );

  const onCityFetchWeather = useCallback(
    async (cityName, { notify = true } = {}) => {
      try {
        const data = await callApiEndPoint(
          (signal) =>
            fetchWeatherByCity(
              cityName,
              process.env.REACT_APP_WEATHER_API_KEY,
              signal,
            ),
          { notify },
        );
        setWeatherData(data);
        localStorage.setItem("city", data.name);
        cityName?.length && dispatch(onSubmit(cityName));
        setCurrentCity(data.name);
        fetchForecast(cityName, { notify });
        setUrl(
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        );
      } catch (err) {
        console.error("Weather fetch error:", err);
        // Optionally show toast here if needed
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callApiEndPoint, dispatch, fetchForecast],
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
              (signal) =>
                fetchWeatherByCoordinates(
                  latitude,
                  longitude,
                  process.env.REACT_APP_WEATHER_API_KEY,
                  signal,
                ),
              { notify: false },
            );
            setWeatherData(data);
            localStorage.setItem("city", data.name);
            setCurrentCity(data.name);
            fetchForecast(data.name, { notify: false });
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
        const savedCity = localStorage.getItem("city");
        if (savedCity) {
          toastNotify(
            `Location unavailable. Showing saved city: ${savedCity}.`,
            true,
          );
          onCityFetchWeather(savedCity, { notify: false });
        } else {
          toastNotify(
            "Location unavailable. Please enter your city manually.",
            true,
          );
        }
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Header currentCity={currentCity} />
          <ToastContainer />
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
