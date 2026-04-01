import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Timeline = ({ check }) => {
  const futureWeatherData = useSelector((state) => state.futureWeather);

  // --- Professional Notification System ---
  useEffect(() => {
    const triggerNotifications = async () => {
      if (!("Notification" in window)) return;

      if (Notification.permission !== "granted") {
        await Notification.requestPermission();
      }

      if (Notification.permission === "granted" && futureWeatherData?.list) {
        // 1. Get the processed timeline data
        const timeline = buildTimeline(futureWeatherData.list).timeline;
        const now = new Date().getTime();

        // 2. Schedule the first 5 slots
        timeline.slice(0, 5).forEach((item, index) => {
          // Parse the specific date/time for this slot from the API data
          // item.dt_txt usually looks like "2026-04-01 18:00:00"
          const scheduledTime = new Date(
            futureWeatherData.list[index].dt_txt,
          ).getTime();
          const delay = scheduledTime - now;

          // 3. Only schedule if the time is in the future
          if (delay > 0) {
            setTimeout(() => {
              new Notification(`Weather Update: ${item.slot}`, {
                body: `It is now ${item.time}. Temp: ${item.temp}${check ? "°F" : "°C"} - ${item.suggestion}`,
                icon: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
                tag: `weather-timer-${index}`, // Unique tag per slot
                renotify: true,
              });
            }, delay);
          }
        });
      }
    };
    triggerNotifications();
  }, [futureWeatherData, check]);

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

        // Unit conversion
        if (!check) {
          temp = Math.floor(temp);
        } else {
          temp = Math.floor(temp * (9 / 5) + 32);
        }

        return {
          slot,
          date: new Date(item.dt_txt.split(" ")[0]).toDateString(),
          // Kept your exact AM/PM Logic
          time:
            Number(item.dt_txt.split(" ")[1].slice(0, 2)) >= 12
              ? `${String(Number(item.dt_txt.split(" ")[1].slice(0, 2)) % 12 || 12).padStart(2, "0")}:${item.dt_txt.split(" ")[1].slice(3, 5)} PM`
              : `${String(Number(item.dt_txt.split(" ")[1].slice(0, 2)) || 12).padStart(2, "0")}:${item.dt_txt.split(" ")[1].slice(3, 5)} AM`,
          temp,
          weather,
          icon: item.weather[0].icon,
          suggestion,
        };
      }),
    };
  }

  const timelineData =
    futureWeatherData?.list && buildTimeline(futureWeatherData.list);

  return (
    <div className="mt-2 d-flex flex-column align-items-center p-1">
      <h6 className="mb-2 text-center text-uppercase fw-bold small text-secondary">
        Daily Weather Timeline
      </h6>

      {/* Kept your original grid flow and width classes */}
      <div className="grid auto-cols-max grid-flow-col overflow-auto w-100">
        {timelineData?.timeline?.map((item, index) => (
          <div
            key={index}
            className="d-flex flex-column mb-1 p-2 rounded shadow-sm border bg-white mx-1"
          >
            <span
              className="text-muted mb-1"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {item.time}, {item.date}
            </span>

            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                  alt="weather"
                  className="me-1"
                />
                <div>
                  <h6 className="mb-0 fw-bold" style={{ fontSize: "14px" }}>
                    {item.slot} {/* Extracts 'Morning', 'Evening' etc */}
                  </h6>
                  <div
                    className="fw-bold text-primary"
                    style={{ fontSize: "15px" }}
                  >
                    {item.temp}
                    {check ? "°F" : "°C"}
                  </div>
                </div>
              </div>

              <span
                className="badge rounded-pill bg-light text-dark border-0 fw-medium"
                style={{ fontSize: "10px", padding: "5px 8px" }}
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
