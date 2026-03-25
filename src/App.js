import Header from "./components/Header";
import React, { useEffect, useState, Suspense, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { onSubmit } from "./Redux/ActionCreator";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useFetchWeather from "./hooks/useFetchWeather";
import { toastNotify } from "./toast";
const FiveDayForecastLazy = React.lazy(
  () => import("./components/FiveDayForecast"),
);
const WeatherCardLazy = React.lazy(() => import("./components/WeatherCard"));

function App() {
  const dispatch = useDispatch();

  const [url, setUrl] = useState("");
  const reduxCity = useSelector((state) => state.inputCity);

  const [currentCity, setCurrentCity] = useState(
    localStorage.getItem("city") || reduxCity || "",
  );

  const {
    data: weatherData,
    error: weatherError,
    loading: weatherLoading,
    callApiEndPoint,
  } = useFetchWeather();
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const onCityFetchWeather = useCallback(
    async (cityName) => {
      try {
        const data = await callApiEndPoint(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`,
        );
        cityName?.length && dispatch(onSubmit(cityName));
        setCurrentCity(data.name);
        setUrl(
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        );
        console.log("Fetched data in WeatherCard:", data); // Debug log
      } catch (err) {
        console.error("Weather fetch error:", err);
        // Optionally show toast here if needed
      }
    },
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
            localStorage.setItem("city", data.name);
            setCurrentCity(data.name);
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
                <Suspense
                  fallback={
                    <div className="d-flex justify-content-center m-5">
                      <div
                        className="spinner-border text-warning m-5"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  }
                >
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
                <Suspense
                  fallback={
                    <div className="d-flex justify-content-center m-5">
                      <div
                        className="spinner-border text-warning m-5"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  }
                >
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
