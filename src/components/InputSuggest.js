import { useState, useEffect, useMemo } from "react";

export default function InputSuggest({ inputComp, inputCity, onClickCity }) {
  const [allCities, setAllCities] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const url = "https://countriesnow.space/api/v0.1/countries";

  useEffect(() => {
    (async function () {
      const res = await fetch(url);
      const data = await res.json();
      const flat = data.data?.flatMap((country) => country.cities) ?? [];
      setAllCities(flat);
    })();
  }, [url]);

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
      setSelectedCity(memoizeFilterVal[0]);
    } else {
      setSelectedCity("");
    }
  }, [memoizeFilterVal]);

  useEffect(() => {
    if (suggestion?.length === 1) {
      onClickCity(suggestion[0]);
    }
  }, [suggestion, onClickCity]);

  return (
    <div className="my-3 d-flex flex-wrap justify-content-center">
      {inputComp}
      {suggestion?.length > 1 && (
        <select
          className="border-0 rounded-top"
          style={{ width: "100px" }}
          onChange={(e) => {
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
