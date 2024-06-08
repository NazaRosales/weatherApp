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
  const { lat, lon } = store.location;

  useEffect(() => {
    fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
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
          {upcoming.length > 0 &&
            upcoming.map((data, index) => (
              <NextDaysCard
                key={data?.dt + index}
                temp={data?.main.feels_like}
                description={data?.weather[0]?.description}
              />
            ))}
        </section>
      )}
    </>
  );
}
