import { useContext } from "react";
import { StoreContext } from "../../store/storeProvider";
import styles from "./nextDaysCard.module.css";
export default function NextDaysCard({
  date,
  temp,
  feels_like,
  weather,
  wind_speed,
  visibility,
  rain,
}) {
  const [store, dispatch] = useContext(StoreContext);
  const tempMode = store.tempMode;
  return (
    <div className={styles.cardDetail}>
      <h2>{new Date(date).toLocaleString()}</h2>
      <p>Temperature: {`${temp} ${tempMode}`} </p>
      <p>Feels like: {`${feels_like} ${tempMode}`}</p>
      <p>{weather}</p>
      <p>Wind speed: {wind_speed} m/s</p>
      <p>Visibility: {visibility / 1000}km</p>
      {rain && rain["3h"] && <p>Rain volume: {rain["3h"]}mm</p>}
    </div>
  );
}
