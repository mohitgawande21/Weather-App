import { useEffect, useState } from "react";
import "../../src/hover.css";
import { onToggle } from "../Redux/ActionCreator";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import InputSuggest from "./InputSuggest";
import { HomeCard } from "./HomeCard";
import { Loader } from "./Loader";
export default function WeatherCard({
  url,
  weatherData,
  loading,
  onCityFetchWeather,
}) {
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
  return (
    <>
      <div className="">
        <div className="flex-wrap d-flex justify-content-center align-items-center">
          <InputSuggest onCityFetchWeather={onCityFetchWeather} />
        </div>
      </div>
      {loading && !weatherData ? (
        <Loader />
      ) : (
        <HomeCard
          temp={temp}
          check={check}
          weatherData={weatherData}
          url={url}
          loading={loading}
          changeUnit={changeUnit}
        />
      )}
    </>
  );
}
