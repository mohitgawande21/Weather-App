import React from "react";
import { useSelector } from "react-redux";
const Timeline = ({ check }) => {
  const futureWeatherData = useSelector((state) => state.futureWeather);

  function buildTimeline(data) {
    return {
      timeline: data.map((item) => {
        const hour = new Date(item.dt_txt).getHours();

        const slot =
          hour >= 6 && hour < 12
            ? "🌧️ Morning"
            : hour >= 12 && hour < 16
              ? "☀️ Afternoon"
              : hour >= 16 && hour < 20
                ? "🌆 Evening"
                : hour >= 20 && hour < 24
                  ? "🌙 Night"
                  : "🌅 Early Morning";

        const weather = item.weather[0].main;

        let temp = item?.main?.temp;
        let suggestion = "⛅ Good weather";
        if (weather === "Rain") suggestion = "🌧️ Carry umbrella";
        else if (temp < 5) suggestion = "❄️ Very cold, stay warm";
        else if (temp > 30) suggestion = "☀️ Stay hydrated";

        if (!check) {
          let d = item?.main?.temp;
          temp = Math.floor(d);
        } else {
          let f = item?.main?.temp * (9 / 5) + 32;
          temp = Math.floor(f);
        }

        return {
          slot,
          date: new Date(item.dt_txt.split(" ")[0]).toDateString(),
          time: item.dt_txt.split(" ")[1].slice(0, 5),
          temp,
          feels_like: item.main.feels_like,
          weather,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          suggestion,
        };
      }),
    };
  }

  const timelineData =
    futureWeatherData?.list && buildTimeline(futureWeatherData.list);

  console.log("processed timeline data", timelineData);
  return (
    <div className="mt-2 d-flex flex-column align-items-center">
      <h5 className="mb-1 text-center">Daily Weather Timeline</h5>
      <div className="grid auto-cols-max grid-flow-col ">
        {timelineData?.timeline?.map((item, index) => (
          <div
            key={index}
            className="d-flex flex-column mb-1 p-1 rounded shadow-sm border bg-white"
          >
            <span
              className="text-secondary mb-1"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              {item.date}
            </span>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6
                  className="mb-1"
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#212529",
                  }}
                >
                  {item.slot}
                </h6>

                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#6c757d",
                  }}
                >
                  {check ? `${item.temp}°F` : `${item.temp}°C`}
                </div>
              </div>

              <span
                className="badge rounded-pill bg-light text-dark border"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "8px 12px",
                }}
              >
                {item.suggestion}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
