import { useEffect, useState } from "react";
import styles from "./mainView.module.css";
export default function MainView() {
  const ES_MODE = "ES";
  const EN_MODE = "EN";
  const CELCIUS_MODE = "ºC";
  const FARENHEINT_MODE = "ºF";
  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [lang, setLang] = useState(ES_MODE);
  const [unity, setUnity] = useState(CELCIUS_MODE);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (weatherData.location) {
      setIsLoading(false);
    }
  }, [weatherData]);
  useEffect(() => {
    if (location.lon && location.lat) {
      fetch(
        `${BASE_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&lang=${lang}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          const filteredData = {
            location: data?.name,
            celsiusTemp: data?.main?.feels_like.toFixed(2),
            farentheinTemp: ((data?.main?.feels_like * 9) / 5 + 32).toFixed(2),
            humidity: data?.main?.humidity,
            weather: data?.weather[0].description,
            windSpeed: data?.wind?.speed,
          };
          setWeatherData(filteredData);
        });
      weatherData.location && setIsLoading(false);
    }
  }, [location, lang]);

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
    setUnity(unity === CELCIUS_MODE ? FARENHEINT_MODE : CELCIUS_MODE);
  };
  const handleLangChange = () => {
    setLang(lang === EN_MODE ? ES_MODE : EN_MODE);
  };
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className={styles.mainView}>
          <h1>{weatherData?.location}</h1>
          <div className={styles.lang} onClick={handleLangChange}>
            {lang}
          </div>
          <div className={styles.tempInfo}>
            <p>
              {unity === CELCIUS_MODE
                ? weatherData?.celsiusTemp + CELCIUS_MODE
                : weatherData?.farentheinTemp + FARENHEINT_MODE}
            </p>
            <div className={styles.tempBtn} onClick={handleUnityChange}>
              <p>{unity === CELCIUS_MODE ? FARENHEINT_MODE : CELCIUS_MODE} </p>
            </div>
          </div>
          <p>Humedad: {weatherData?.humidity}%</p>
          <p>
            {weatherData?.weather?.charAt(0).toUpperCase() +
              weatherData?.weather?.slice(1).toLowerCase() +
              "."}
          </p>
          <p>Viento: {weatherData?.windSpeed}</p>
        </section>
      )}
    </>
  );
}
