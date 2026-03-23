import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { futureWeather } from "../Redux/ActionCreator";
export default function FiveDayForecast() {
  // const [cityRes, setCityRes] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  let check = useSelector((state) => {
    return state.Check;
  });

  const futureWeatherData = useSelector((state) => state.futureWeather);
  const city = localStorage.getItem("city");

  useEffect(() => {
    !city && localStorage.setItem("city", id);
    if (futureWeatherData?.city?.name !== id) {
      fetchForecast();
    }
  }, [check, id]);

  async function fetchForecast() {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      if (!apiKey) {
        toast.error(
          "Missing API key: set REACT_APP_WEATHER_API_KEY in your .env",
          { position: "top-center", autoClose: 3000 },
        );
        return;
      }
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${id}&${!check ? "units=metric" : "units=imperial"}&appid=${apiKey}&cnt=5`,
      );
      const data = await res.json();
      dispatch(futureWeather(data));
      if (data.cod === 404) {
        toast.error("City Not Found", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Forecast Success!", {
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
      console.log(err);
    }
  }
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
