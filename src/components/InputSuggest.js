import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAllCities } from "../Redux/ActionCreator";
export default function InputSuggest({ inputComp, inputCity, onClickCity }) {
  const [suggestion, setSuggestion] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
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
  }, [allCities.length]);

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
      setSelectedCity(memoizeFilterVal[0]);
    } else {
      setSelectedCity("");
    }
  }, [memoizeFilterVal]);

  useEffect(() => {
    if (suggestion?.length === 1) {
      localStorage.setItem("city", suggestion[0]);
      onClickCity(suggestion[0]);
    }
  }, [suggestion.length]);

  return (
    <div className="my-3 w-100">
      {inputComp}
      {suggestion?.length > 1 && (
        <select
          className="dropdown-menu show w-100"
          onChange={(e) => {
            localStorage.setItem("city", e.target.value);
            setSelectedCity(e.target.value);
            onClickCity(e.target.value);
          }}
          value={selectedCity}
        >
          {suggestion?.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
