import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAllCities } from "../Redux/ActionCreator";
export default function InputSuggest({
  inputComp,
  inputCity,
  onCityFetchWeather,
  inputCityRef,
}) {
  const [suggestion, setSuggestion] = useState([]);
  const dispatch = useDispatch();
  const allCities = useSelector((state) => state?.allCities ?? []);
  useEffect(() => {
    async function fetchAllCities() {
      const url = "https://countriesnow.space/api/v0.1/countries";
      const res = await fetch(url);
      const data = await res.json();
      const flat = data.data?.flatMap((country) => country.cities) ?? [];
      dispatch(saveAllCities(flat));
    }
    if (allCities.length === 0) {
      fetchAllCities();
    }
  }, [allCities.length, dispatch]);

  const memoizeFilterVal = useMemo(() => {
    const query = inputCity?.trim().toLowerCase();
    if (!query || query.length < 2) return [];

    const matches = [];
    for (const city of allCities) {
      if (city.toLowerCase().startsWith(query)) {
        matches.push(city);
        if (matches.length >= 20) break;
      }
    }
    return matches;
  }, [inputCity, allCities]);

  useEffect(() => {
    setSuggestion(memoizeFilterVal);
    if (memoizeFilterVal?.length) {
      localStorage.setItem("city", memoizeFilterVal[0]);
    }
  }, [memoizeFilterVal]);

  useEffect(() => {
    if (suggestion?.length === 1) {
      localStorage.setItem("city", suggestion[0]);
      onCityFetchWeather(suggestion[0]);
      inputCityRef.current.value = "";
    }
  }, [suggestion.length, onCityFetchWeather, suggestion, inputCityRef]);

  return (
    <div className="my-3 w-100">
      {inputComp}
      {suggestion?.length > 0 && (
        <ul className="list-group shadow-sm mt-2 rounded-4 overflow-hidden">
          {suggestion.map((city) => (
            <li
              key={city}
              className="list-group-item list-group-item-action border-0 py-2"
              style={{ cursor: "pointer", fontSize: "14px" }}
              onClick={() => {
                localStorage.setItem("city", city);
                onCityFetchWeather(city);
                setSuggestion([]); // Close the menu
                inputCityRef.current.value = ""; // Clear input
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
