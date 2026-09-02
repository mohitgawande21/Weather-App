import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAllCities } from "../Redux/ActionCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./weather.css";
export default function InputSuggest({ onCityFetchWeather }) {
  const [inputCity, setInputCity] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState(false);
  const dispatch = useDispatch();
  const allCities = useSelector((state) => state?.allCities ?? []);
  useEffect(() => {
    async function fetchAllCities() {
      setSuggestionsLoading(true);
      setSuggestionsError(false);
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries",
        );
        if (!res.ok) throw new Error("Unable to load cities");
        const data = await res.json();
        const flat = data.data?.flatMap((country) => country.cities) ?? [];
        dispatch(saveAllCities(flat));
      } catch {
        setSuggestionsError(true);
      } finally {
        setSuggestionsLoading(false);
      }
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

  const submitCity = (cityName) => {
    const trimmedCity = cityName.trim();
    if (!trimmedCity) return;

    onCityFetchWeather(trimmedCity);
    setInputCity("");
    setSuggestion([]);
    setActiveSuggestionIndex(-1);
  };

  useEffect(() => {
    setSuggestion(memoizeFilterVal);
    setActiveSuggestionIndex(-1);
  }, [memoizeFilterVal]);

  const handleInputKeyDown = (event) => {
    if (event.key === "ArrowDown" && suggestion.length > 0) {
      event.preventDefault();
      setActiveSuggestionIndex((index) =>
        Math.min(index + 1, suggestion.length - 1),
      );
    } else if (event.key === "ArrowUp" && suggestion.length > 0) {
      event.preventDefault();
      setActiveSuggestionIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Escape") {
      setSuggestion([]);
      setActiveSuggestionIndex(-1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      submitCity(suggestion[activeSuggestionIndex] ?? inputCity);
    }
  };

  return (
    <div className="my-3 position-relative weather-search">
      <input
        type="text"
        value={inputCity}
        className="form-control rounded-pill border-0 shadow-sm py-2 ps-4 pe-5 weather-search-input"
        onChange={(event) => {
          setInputCity(event.target.value);
          setActiveSuggestionIndex(-1);
        }}
        onKeyDown={handleInputKeyDown}
        placeholder="Enter city name..."
        aria-label="Enter city name"
        role="combobox"
        aria-expanded={suggestion.length > 0}
        aria-controls="city-suggestions"
        aria-activedescendant={
          activeSuggestionIndex >= 0
            ? `city-suggestion-${activeSuggestionIndex}`
            : undefined
        }
      />
      <button
        type="button"
        className="btn position-absolute top-50 end-0 translate-middle-y me-1 weather-search-button"
        onClick={() => submitCity(inputCity)}
        disabled={!inputCity.trim()}
        aria-label="Search city"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
      {suggestionsLoading && (
        <small className="text-muted weather-suggestion-status">
          Loading cities...
        </small>
      )}
      {suggestionsError && (
        <small className="text-danger weather-suggestion-status">
          City suggestions are unavailable.
        </small>
      )}
      {suggestion?.length > 0 && (
        <ul
          id="city-suggestions"
          role="listbox"
          className="list-group position-absolute w-100 shadow-lg mt-1 z-3 weather-suggestion-list"
        >
          {suggestion.map((city, index) => (
            <li
              key={city}
              id={`city-suggestion-${index}`}
              role="option"
              aria-selected={activeSuggestionIndex === index}
              className={`list-group-item list-group-item-action border-0 py-2 weather-suggestion-item ${
                activeSuggestionIndex === index ? "active" : ""
              }`}
              onClick={() => submitCity(city)}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mx-2" />
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
