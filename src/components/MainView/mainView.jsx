import { useContext, useEffect, useState } from "react";
import styles from "./mainView.module.css";
import { StoreContext } from "../../store/storeProvider";
import { types } from "../../store/storeReducer";
export default function MainView() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [store, dispatch] = useContext(StoreContext);
  const { location, tempMode } = store;
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (weatherData.location) {
      setIsLoading(false);
    }
  }, [weatherData]);
  useEffect(() => {
    try {
      if (location.lat || location.lon) {
        fetch(
          `${BASE_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.cod === 200) {
              const filteredData = {
                location: data?.name,
                celsiusTemp: Math.round(data?.main?.feels_like),
                farentheinTemp: Math.round(
                  (data?.main?.feels_like * 9) / 5 + 32
                ),
                humidity: data?.main?.humidity,
                weather: data?.weather[0].description,
                windSpeed: data?.wind?.speed,
              };
              setWeatherData(filteredData);
            }
          });
      }
    } catch (error) {
      console.log(error);
    }

    weatherData.location && setIsLoading(false);
  }, [location]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch({
          type: types.SET_LOCATION,
          payload: {
            lat: position.coords.latitude.toString(),
            lon: position.coords.longitude.toString(),
          },
        });
      });
    }
  };
  const handleUnityChange = () => {
    dispatch({
      type: types.CHANGE_TEMP_MODE,
      payload:
        tempMode === types.CELCIUS_MODE
          ? types.FARENHEINT_MODE
          : types.CELCIUS_MODE,
    });
  };
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className={styles.mainView}>
          <h1>{weatherData?.location}</h1>
          <div className={styles.tempInfo}>
            <p>
              {tempMode === types.CELCIUS_MODE
                ? weatherData.celsiusTemp + types.CELCIUS_MODE
                : weatherData.farentheinTemp + types.FARENHEINT_MODE}
            </p>
            <div className={styles.tempBtn} onClick={handleUnityChange}>
              <p>
                {tempMode === types.CELCIUS_MODE
                  ? types.FARENHEINT_MODE
                  : types.CELCIUS_MODE}
              </p>
            </div>
          </div>
          <p>
            {weatherData?.weather?.charAt(0).toUpperCase() +
              weatherData?.weather?.slice(1).toLowerCase() +
              "."}
          </p>
          <p>Humidity: {weatherData?.humidity}%</p>
          <p>Wind: {weatherData?.windSpeed}</p>
        </section>
      )}
    </>
  );
}
