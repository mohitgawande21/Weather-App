import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Card from "./Card";
export default function FiveDayForecast() {
  const [cityRes, setCityRes] = useState([]);
  const { id } = useParams();

  let check = useSelector((state) => {
    return state.Check;
  });

  useEffect(() => {
    (async function () {
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
        setCityRes(data);
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
    })();
  }, [check, id]);

  return (
    <>
      <br />
      <br />
      <ToastContainer />
      <h4 className="text-center my-3">City - {id}</h4>
      <div className="d-flex flex-wrap justify-content-center my-3">
        {cityRes?.list?.map((item, ind) => {
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
