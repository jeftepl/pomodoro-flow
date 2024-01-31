import styles from "./Watch.module.css";
import { formatSecondsToString } from "@common/utils/timeFormatter";
interface IWatchProps {
  timeInSeconds: number
}

export default function Watch({ timeInSeconds }: IWatchProps) {
  const time = formatSecondsToString(timeInSeconds);
  const hoursAreZero = timeInSeconds < 3600;

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
