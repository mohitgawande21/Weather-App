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
import { HomeCard } from "./HomeCard";
import { futureWeather } from "../Redux/ActionCreator";
import useFetchWeather from "../hooks/useFetchWeather";
export default function WeatherCard({
  url,
  weatherData,
  loading,
  onCityFetchWeather,
}) {
  console.log("weathercard", weatherData);
  const dispatch = useDispatch();
  const { callApiEndPoint } = useFetchWeather();
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
    // dispatch(futureWeather({}));
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
      <HomeCard
        temp={temp}
        check={check}
        weatherData={weatherData}
        url={url}
        loading={loading}
        changeUnit={changeUnit}
      />
    </>
  );
}
