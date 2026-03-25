import { useEffect, useLayoutEffect, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { futureWeather } from "../Redux/ActionCreator";
import { toastNotify } from "../toast";
import useFetchWeather from "../hooks/useFetchWeather";
export default function FiveDayForecast() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let check = useSelector((state) => {
    return state.Check;
  });

  const futureWeatherData = useSelector((state) => state.futureWeather);
  const city = localStorage.getItem("city");
  const { callApiEndPoint } = useFetchWeather();

  useLayoutEffect(() => {
    if (id && id !== city) {
      localStorage.setItem("city", id);
    }
  }, [id, city]);

  const fetchForecast = useCallback(
    async function () {
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
          `https://api.openweathermap.org/data/2.5/forecast?q=${id}&${!check ? "units=metric" : "units=imperial"}&appid=${apiKey}&cnt=5`,
        );
        dispatch(futureWeather(data));
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, id, check],
  );

  useEffect(() => {
    !city && localStorage.setItem("city", id);
    if (futureWeatherData?.city?.name !== id) {
      fetchForecast();
    }
  }, [check, id, city, futureWeatherData?.city?.name, fetchForecast]);

  return (
    <>
      <br />
      <br />
      <ToastContainer />
      <h4 className="text-center my-3">City - {id}</h4>
      <div className="d-flex flex-wrap justify-content-center my-3">
        {futureWeatherData?.list?.map((item, ind) => {
          return (
            <Card
              key={ind}
              time={item.dt * 1000}
              url={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              temperature={item?.main?.temp}
              description={item.weather[0].description}
              check={check}
            />
          );
        })}
      </div>
    </>
  );
}
