import styles from "./Watch.module.css";
import { formatSecondsToString } from "@common/utils/timeFormatter";
import useWatch from "@state/hooks/useWatch";

export default function Watch() {
  const watch = useWatch();
  const time = formatSecondsToString(watch.value);
  const hoursAreZero = watch.value < 3600;

  return (
    <div className={styles.watch}>
      {!hoursAreZero && (
        <>
          <span>{time[0]}</span>
          <span>{time[1]}</span>
          <span>{time[2]}</span>
        </>
      )}
      <span>{time[3]}</span>
      <span>{time[4]}</span>
      <span>{time[5]}</span>
      <span>{time[6]}</span>
      <span>{time[7]}</span>
    </div>
  );
}
