import Button from "@components/Button";
import styles from "./Timer.module.css";
import useTimerHandler from "@state/hooks/useTimerHandler";
import useStopWatch from "@state/hooks/useStopWatch";
import useWatch from "@state/hooks/useWatch";
import useGetSelectedTask from "@state/hooks/useGetSelectedTask";
import FlowModal from "@components/FlowModal";
import { useRecoilState } from "recoil";
import { editState } from "@state/atom";
import Watch from "@components/Watch";

export default function Timer() {
  const [edit, setEdit] = useRecoilState<string | null>(editState);

  const timerHandler = useTimerHandler();
  const stopWatch = useStopWatch();
  const watch = useWatch();
  const selectedTask = useGetSelectedTask();

  return (
    <div className={styles.timer}>
      <Button onClick={() => setEdit("flowModal")}>Flow</Button>
      {edit === "flowModal" ? <FlowModal /> : null}
      <Watch timeInSeconds={watch.value} />
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
