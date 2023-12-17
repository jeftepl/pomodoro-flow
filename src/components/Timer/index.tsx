import Button from "@components/Button";
import Watch from "./Watch";
import styles from "./Timer.module.css";
import useTimerHandler from "@state/hooks/useTimerHandler";
import usePauseWatch from "@state/hooks/usePauseWatch";
import useWatch from "@state/hooks/useWatch";
import useGetSelectedTask from "@state/hooks/useGetSelectedTask";

export default function Timer() {
  const timerHandler = useTimerHandler();
  const pauseWatch = usePauseWatch();
  const watch = useWatch();
  const selectedTask = useGetSelectedTask();

  return (
    <div className={styles.timer}>
      <Watch />
      <Button
        onClick={
          watch.run && selectedTask && !selectedTask.completed
            ? pauseWatch
            : timerHandler
        }
      >
        {watch.run && selectedTask && !selectedTask.completed
          ? "Pause"
          : "Play"}
      </Button>
    </div>
  );
}
