import { useLayoutEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Card from "./Card";
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
      <h2
        className="display-8 text-center my-4 fw-bold text-uppercase ls-2 text-dark border-bottom border-dark border-opacity-10 mx-auto"
        style={{ maxWidth: "fit-content" }}
      >
        {id} <small className="text-dark  fs-6 ms-1 ">City</small>
      </h2>
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
              date={new Date(item.dt_txt.split(" ")[0]).toDateString()}
              time={
                Number(item.dt_txt.split(" ")[1].slice(0, 2)) >= 12
                  ? `${String(Number(item.dt_txt.split(" ")[1].slice(0, 2)) % 12 || 12).padStart(2, "0")}:${item.dt_txt.split(" ")[1].slice(3, 5)} PM`
                  : `${String(Number(item.dt_txt.split(" ")[1].slice(0, 2)) || 12).padStart(2, "0")}:${item.dt_txt.split(" ")[1].slice(3, 5)} AM`
              }
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
