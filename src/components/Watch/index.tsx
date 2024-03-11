import { memo, useCallback } from "react";
import "./Watch.scss";
import { formatSecondsToString } from "@common/utils/timeFormatter";

interface IWatchProps {
  timeInSeconds: number
}

export function Watch({ timeInSeconds }: IWatchProps) {
  const time = formatSecondsToString(timeInSeconds);
  const hoursAreZero = timeInSeconds < 3600;

  const formatTimePart = useCallback((index: number) => {
    return !hoursAreZero || index >=  3 ? time[index] : null;
  }, [time, hoursAreZero]);

  return (
    <div className="watch">
      {Array.from({ length:  8 }).map((_, i) => (
        <span key={i}>{formatTimePart(i)}</span>
      ))}
    </div>
  );
}

const MemoizedWatch = memo(Watch);

export default MemoizedWatch;
