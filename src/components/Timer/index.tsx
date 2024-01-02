import Button from "@components/Button";
import Watch from "./Watch";
import styles from "./Timer.module.css";
import useTimerHandler from "@state/hooks/useTimerHandler";
import useStopWatch from "@state/hooks/useStopWatch";
import useWatch from "@state/hooks/useWatch";
import useGetSelectedTask from "@state/hooks/useGetSelectedTask";

export default function Timer() {
  const timerHandler = useTimerHandler();
  const stopWatch = useStopWatch();
  const watch = useWatch();
  const selectedTask = useGetSelectedTask();

  return (
    <div className={styles.timer}>
      <Watch />
      <Button
        onClick={
          watch.run && !selectedTask?.completed
            ? stopWatch
            : timerHandler
        }
      >
        {watch.run && !selectedTask?.completed
          ? "Stop"
          : "Play"}
      </Button>
    </div>
  );
}
