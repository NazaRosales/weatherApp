import { useEffect, useState } from "react";
import styles from "./mainView.module.css";
export default function MainView() {
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [unity, setUnity] = useState("Celsius");
  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location.lon && location.lat) {
      fetch(
        `${BASE_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const filteredData = {
            location: data?.name,
            celsiusTemp: (data?.main.feels_like - 273.15).toFixed(2),
            farentheinTemp: (
              ((data?.main?.feels_like - 273.15) * 9) / 5 +
              32
            ).toFixed(2),
            humidity: data?.main?.humidity,
            weather: data?.weather[0],
            windSpeed: data?.wind?.speed,
          };
          setWeatherData(filteredData);
        });
    }
  }, [location]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude.toString(),
          lon: position.coords.longitude.toString(),
        });
      });
    }
  };
  const handleUnityChange = () => {
    setUnity(unity === "Celsius" ? "Farenheit" : "Celsius");
  };
  return (
    <>
      <section className={styles.mainView}>
        <h1>El tiempo en {weatherData?.location}</h1>
        <button onClick={handleUnityChange}> {unity} </button>
        <p>
          Temperatura:{" "}
          {unity === "Celsius"
            ? weatherData?.celsiusTemp + " ºC"
            : weatherData?.farentheinTemp + " ºF"}
        </p>
        <p>Humedad: {weatherData?.humidity}%</p>
        <h2>Clima</h2>
        <p>{weatherData?.weather?.main}</p>
        <p>Viento: {weatherData?.windSpeed}</p>
      </section>
    </>
  );
}
