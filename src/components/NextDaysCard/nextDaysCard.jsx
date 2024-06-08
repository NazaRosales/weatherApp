import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/storeProvider";
import styles from "./nextDaysCard.module.css";
import { types } from "../../store/storeReducer";
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
  const [actualTemp, setActualTemp] = useState(0);
  const tempMode = store.tempMode;
  const { CELCIUS_MODE, FARENHEINT_MODE } = types;
  useEffect(() => {
    setActualTemp(tempMode === CELCIUS_MODE ? temp : (temp * 9) / 5 + 32);
  }, [tempMode]);
  return (
    <div className={styles.cardDetail}>
      <h2>{new Date(date).toLocaleString()}</h2>
      <p>Temperature: {`${Math.round(actualTemp)} ${tempMode}`} </p>
      <p>{weather}</p>
      <p>Wind speed: {wind_speed} m/s</p>
      <p>Visibility: {visibility / 1000}km</p>
      {rain && rain["3h"] && <p>Rain volume: {rain["3h"]}mm</p>}
    </div>
  );
}
