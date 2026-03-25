import { useEffect, useRef, useState } from "react";
import "../../src/hover.css";
import { onToggle } from "../Redux/ActionCreator";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { onSubmit } from "../Redux/ActionCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import InputSuggest from "./InputSuggest";
import { Loader } from "./Loader";

export default function WeatherCard({
  url,
  weatherData,
  loading,
  onCityFetchWeather,
}) {
  console.log("weathercard", weatherData);
  const dispatch = useDispatch();

  const [temp, setTemp] = useState(0);

  let check = useSelector((state) => {
    return state.Check;
  });

  useEffect(() => {
    if (!check) {
      let d = weatherData?.main?.temp;
      setTemp(Math.floor(d));
    } else {
      let f = weatherData?.main?.temp * (9 / 5) + 32;
      setTemp(Math.floor(f));
    }
  }, [weatherData?.main?.temp, check]);

  const changeUnit = () => {
    dispatch(onToggle(!check));
    if (check) {
      let d = weatherData?.main?.temp;
      setTemp(Math.floor(d));
    } else {
      let f = weatherData?.main?.temp * (9 / 5) + 32;
      setTemp(Math.floor(f));
    }
  };
  const inputCity = useRef("");

  const serachIconStyle = {
    position: "absolute",
    left: "177px",
    top: "24px",
  };
  const inputIconStyle = {
    position: "relative",
  };

  console.log("weatherData", weatherData);
  return (
    <>
      <div className="my-3">
        <ToastContainer />
        <br />
        <br />
        <div>
          <div className="my-3 flex-wrap d-flex justify-content-center align-items-center">
            <div style={inputIconStyle}>
              <InputSuggest
                onCityFetchWeather={onCityFetchWeather}
                inputCity={inputCity.current.value}
                inputComp={
                  <input
                    className="form-control w-120"
                    onChange={(e) => {
                      dispatch(onSubmit(inputCity.current.value));
                    }}
                    ref={inputCity}
                    placeholder="Enter city name"
                  />
                }
              />
              {inputCity?.current?.value?.length ? (
                <div
                  style={serachIconStyle}
                  onClick={() => onCityFetchWeather(inputCity.current.value)}
                  className="mx-1"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center  my-5 ">
        {loading && !weatherData ? (
          <Loader />
        ) : (
          <div className="card mb-3 bg-light shadow" style={{ width: "500px" }}>
            <div className="row g-0">
              <div className="col-md-4 d-flex justify-content-center bg-light shadow ">
                <img src={url} alt={url} className="img-fluid rounded-start" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title text">
                    {temp ? temp : weatherData?.main?.temp}{" "}
                    {!check ? "°C" : "°F"}
                    <span className=" mx-2 form-switch">
                      <input
                        checked={check}
                        onChange={changeUnit}
                        className="form-check-input"
                        type="checkbox"
                      />
                    </span>
                  </h5>
                  {weatherData && (
                    <h5 className="card-title text">{weatherData.name}</h5>
                  )}
                  <p className="card-text">
                    <small className="text-muted">
                      {new Date().toLocaleString("en-us", { weekday: "long" })}
                    </small>
                  </p>
                  <p className="card-text">
                    {weatherData?.main?.temp
                      ? weatherData.weather[0].description
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
