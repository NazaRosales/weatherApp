import styles from "./nextDaysCard.module.css";
export default function NextDaysCard({ temp, description }) {
  return (
    <div className={styles.cardDetail}>
      <h3>{temp + "ºK"}</h3>
      <p>{description}</p>
    </div>
  );
}
