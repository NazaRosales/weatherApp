import { useContext, useEffect, useState } from "react";
import styles from "./nextDays.module.css";
import NextDaysCard from "../NextDaysCard/nextDaysCard";
import { StoreContext } from "../../store/storeProvider";
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;
export default function NextDays() {
  const [isLoading, setIsLoading] = useState(true);
  const [upcoming, setUpcoming] = useState([]);
  const [store, dispatch] = useContext(StoreContext);

  useEffect(() => {
    const { lat, lon } = store.location;
    console.log("LAT", lat);
    console.log("LON", lon);
    fetch(`${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpcoming(data?.list);
        setIsLoading(false);
      });
  }, [store]);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className={styles.container}>
          {upcoming.map((item, index) => (
            <NextDaysCard
              key={index + item.dt_txt}
              date={item.dt_txt}
              temp={item.main.temp}
              feels_like={item.main.feels_like}
              weather={item.weather[0].description}
              wind_speed={item.wind.speed}
              visibility={item.visibility}
              rain={item.rain}
            />
          ))}
        </section>
      )}
    </>
  );
}
