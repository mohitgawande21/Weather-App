import { useState, useEffect, useRef, useCallback } from "react";
import { toastNotify } from "../toast";
import { WeatherApiError } from "../services/weatherApi";

const useFetchWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  // 1. Add a ref to track the last notification time or message
  const lastToastTimeRef = useRef(0);

  const callApiEndPoint = useCallback(
    async (request, { notify = true } = {}) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      try {
        setLoading(true);
        setError(null);

        const fetchedData = await request(signal);

        const now = Date.now();

        // 2. Logic to prevent multiple toasts (e.g., wait 500ms between toasts)
        if (notify && now - lastToastTimeRef.current > 1000) {
          toastNotify("Weather updated successfully.");
          lastToastTimeRef.current = now; // Update the last toast time
        }

        setData(fetchedData);
        return fetchedData;
      } catch (err) {
        if (err.name === "AbortError") {
          return undefined;
        } else {
          setError(err.message);
          if (notify) {
            const message =
              err instanceof WeatherApiError
                ? err.message
                : "Unable to load weather data. Please try again.";
            toastNotify(message, true);
          }
          throw err;
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return { loading, data, error, callApiEndPoint };
};

export default useFetchWeather;
