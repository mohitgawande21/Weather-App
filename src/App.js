import Header from "./components/Header";
import React, { useEffect, useState, Suspense, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { onSubmit } from "./Redux/ActionCreator";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useFetchWeather from "./api/useFetchWeather";
const FiveDayForecastLazy = React.lazy(
  () => import("./components/FiveDayForecast"),
);
const WeatherCardLazy = React.lazy(() => import("./components/WeatherCard"));

function App() {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");

  const inputCityName = useSelector((state) => state.inputCity);
  const inputCityRef = React.useRef(inputCityName);
  inputCityRef.current = inputCityName;
  const [currentCity, setCurrentCity] = useState(
    localStorage.getItem("city") || inputCityName || "",
  );
  const currentCityRef = React.useRef(currentCity);
  currentCityRef.current = currentCity;

  const {
    data: weatherData,
    error: weatherError,
    loading: weatherLoading,
    callApiEndPoint,
  } = useFetchWeather();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClickCity = useCallback(
    async (val) => {
      val?.length && dispatch(onSubmit(val));
      const cityToFetch = val?.length
        ? val
        : inputCityRef.current?.length
          ? inputCityRef.current
          : currentCityRef.current;
      try {
        const data = await callApiEndPoint(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`,
        );
        setCurrentCity(data.name);
        setUrl(
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        );
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
          onClickCity(currentCity);
        }
        toast.error(`Geolocation error: ${err.message}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Header inputCityName={currentCity} />
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
                    onClickCity={onClickCity}
                    inputCityName={currentCity}
                    cityRes={weatherData}
                    url={url}
                    loading={weatherLoading}
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
