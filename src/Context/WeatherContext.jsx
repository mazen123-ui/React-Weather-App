import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const WeatherContext = createContext();

const citiesLocations = {
  Cairo: { lat: 30.033333, long: 31.233334 },
  Alexandria: { lat: 31.205753, long: 29.924526 },
  Giza: { lat: 30.013056, long: 31.208853 },
};

export default function WeatherProvider({ children }) {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState("Cairo");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lat = citiesLocations[city]?.lat;
  const long = citiesLocations[city]?.long;

  useEffect(() => {
    if (!lat || !long) return;

    setLoading(true);
    setError(null);

    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`,
      )
      .then((response) => {
        setCurrentWeatherData(response.data.current);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lat, long]);

  useEffect(() => {
    if (!lat || !long) return;

    setLoading(true);
    setError(null);

    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`,
      )
      .then((response) => {
        setForecastData(response.data.daily);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lat, long]);
  return (
    <WeatherContext.Provider
      value={{
        currentWeatherData,
        forecastData,
        city,
        setCity,
        loading,
        error,
        lat,
        long,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
