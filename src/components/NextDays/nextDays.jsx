import { useEffect, useState } from "react";
import styles from "./nextDays.module.css";
import NextDaysCard from "../NextDaysCard/NextDaysCard";
const API_KEY = import.meta.env.VITE_API_KEY;
export default function NextDays() {
  const [isLoading, setIsLoading] = useState(true);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=-31.7587456&lon=-60.5028352&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUpcoming(data?.list);
      });
    console.log(upcoming);
  }, []);
  return (
    <section className={styles.container}>
      {upcoming.length &&
        upcoming.map((data, index) => (
          <NextDaysCard
            key={data?.dt + index}
            temp={data?.main.feels_like}
            description={data?.weather[0]?.description}
          />
        ))}
    </section>
  );
}
