import Header from "./components/Header";
import React, { useEffect, useState, Suspense, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { onSubmit } from "./Redux/ActionCreator";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const FiveDayForecastLazy = React.lazy(
  () => import("./components/FiveDayForecast"),
);
const WeatherCardLazy = React.lazy(() => import("./components/WeatherCard"));

function App() {
  const dispatch = useDispatch();
  const [cityRes, setCityRes] = useState({});
  const [url, setUrl] = useState("");

  const inputCityName = useSelector((state) => state.inputCity);
  const inputCityRef = React.useRef(inputCityName);
  inputCityRef.current = inputCityName;
  const [currentCity, setCurrentCity] = useState(
    localStorage.getItem("city") || inputCityName || "",
  );
  const onClickCity = useCallback(
    async (val) => {
      val?.length && dispatch(onSubmit(val));
      const cityToFetch = val?.length
        ? val
        : inputCityRef.current?.length
          ? inputCityRef.current
          : currentCity;
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`,
        );
        const data = await res.json();
        setCityRes(data);
        setCurrentCity(data.name);
        setUrl(
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        );
        if (data.cod === 404) {
          toast.error("City Not Found", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.success("Weather Success!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (err) {
        toast.error("City Not Found", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(err.message);
      }
    },
    [dispatch, currentCity],
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
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`,
            );
            const data = await res.json();
            setCityRes(data);
            localStorage.setItem("city", data.name);
            setCurrentCity(data.name);
            setUrl(
              `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            );
            if (data.cod === 400) {
              toast.error("wrong latitude or longitude", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              toast.success("Weather Success!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          } catch (err) {
            toast.error("Wrong Latitude or Longitude", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
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
  }, [currentCity, onClickCity]);

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
                    cityRes={cityRes}
                    url={url}
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
