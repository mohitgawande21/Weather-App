import { useState, useEffect, useRef } from "react";
import { toastNotify } from "../toast";

const useFetchWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  // 1. Add a ref to track the last notification time or message
  const lastToastTimeRef = useRef(0);

  const callApiEndPoint = async (url) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url, { signal });
      const fetchedData = await res.json();

      const statusCode = Number(fetchedData?.cod);
      const now = Date.now();

      // 2. Logic to prevent multiple toasts (e.g., wait 500ms between toasts)
      if (now - lastToastTimeRef.current > 1000) {
        if (statusCode === 200) {
          toastNotify("Weather Success!");
        } else if (statusCode === 404) {
          toastNotify("City Not Found", true);
        } else if (statusCode === 400) {
          toastNotify("Invalid coordinates", true);
        } else {
          toastNotify("Weather data unavailable", true);
        }
        lastToastTimeRef.current = now; // Update the last toast time
      }

      setData(fetchedData);
      return fetchedData;
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        setError(err.message);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return { loading, data, error, callApiEndPoint };
};

export default useFetchWeather;
