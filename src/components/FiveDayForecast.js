import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Card from "./Card";
import { groupForecastByDay } from "../utils/forecast";
export default function FiveDayForecast() {
  const { id } = useParams();
  let check = useSelector((state) => {
    return state.Check;
  });

  const futureWeatherData = useSelector((state) => state.futureWeather);
  const city = localStorage.getItem("city");
  const dailyForecast = groupForecastByDay(futureWeatherData?.list ?? []);

  useLayoutEffect(() => {
    if (id && id !== city) {
      localStorage.setItem("city", id);
    }
  }, [id, city]);

  return (
    <>
      <h2
        className="display-8 text-center my-2 fw-bold text-uppercase ls-2 text-dark border-bottom border-dark border-opacity-10 mx-auto"
        style={{ maxWidth: "fit-content" }}
      >
        {id} <small className="text-dark  fs-6 ms-1 ">City</small>
      </h2>
      <div className="d-flex flex-wrap justify-content-center my-3 mb-5">
        {dailyForecast.map((item, ind) => {
          let minTemperature;
          let maxTemperature;
          if (!check) {
            minTemperature = Math.floor(item.minTemperature);
            maxTemperature = Math.floor(item.maxTemperature);
          } else {
            minTemperature = Math.floor(item.minTemperature * (9 / 5) + 32);
            maxTemperature = Math.floor(item.maxTemperature * (9 / 5) + 32);
          }
          return (
            <Card
              key={ind}
              date={new Date(item.dt_txt.split(" ")[0]).toDateString()}
              url={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              temperature={`${minTemperature}° - ${maxTemperature}${check ? "°F" : "°C"}`}
              description={item.weather[0].description}
              check={check}
            />
          );
        })}
      </div>
    </>
  );
}
