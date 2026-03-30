import { useLayoutEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Card from "./Card";
import { useDispatch } from "react-redux";

import useFetchWeather from "../hooks/useFetchWeather";
export default function FiveDayForecast() {
  const { id } = useParams();
  let check = useSelector((state) => {
    return state.Check;
  });

  const futureWeatherData = useSelector((state) => state.futureWeather);
  const city = localStorage.getItem("city");

  useLayoutEffect(() => {
    if (id && id !== city) {
      localStorage.setItem("city", id);
    }
  }, [id, city]);

  return (
    <>
      <br />
      <br />
      <ToastContainer />
      <h4 className="text-center my-3">City - {id}</h4>
      <div className="d-flex flex-wrap justify-content-center my-3">
        {futureWeatherData?.list?.map((item, ind) => {
          let temp;
          if (!check) {
            let d = item?.main?.temp;
            temp = Math.floor(d);
          } else {
            let f = item?.main?.temp * (9 / 5) + 32;
            temp = Math.floor(f);
          }
          return (
            <Card
              key={ind}
              time={item.dt * 1000}
              url={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              temperature={check ? `${temp}°F` : `${temp}°C`}
              description={item.weather[0].description}
              check={check}
            />
          );
        })}
      </div>
    </>
  );
}
