import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
const useFetchWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const callApiEndPoint = async (url) => {
    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      setLoading(true);
      setError(null);

      const requestBody = {
        method: "GET",
        headers: {
          // Only add headers that are actually accepted by the API
          // 'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Example for APIs that use Bearer tokens
          // 'X-API-Key': process.env.REACT_APP_WEATHER_API_KEY, // Only if the API specifically requires this header
        },
        signal: signal,
      };

      const res = await fetch(url, requestBody);
      const fetchedData = await res.json();
      console.log("Fetched weather data:", fetchedData);
      if (fetchedData?.cod === 200) {
        toast.success("Weather Success!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (fetchedData?.cod === "404") {
        toast.error("City Not Found", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (fetchedData?.cod === "400") {
        toast.error("Invalid coordinates", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Weather data unavailable for your location", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setData(fetchedData);
      return fetchedData;
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        console.log("Fetch error:", err);
        setError(err.message);
        throw err; // Re-throw so the caller can handle it
      }
    } finally {
      setLoading(false);
    }
  };

  // Cleanup function to abort ongoing requests when component unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { loading, data, error, callApiEndPoint };
};

export default useFetchWeather;
