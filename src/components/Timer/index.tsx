import Button from "@components/Button";
import "./Timer.scss";
import useTimerHandler from "@state/hooks/useTimerHandler";
import useStopWatch from "@state/hooks/useStopWatch";
import useWatch from "@state/hooks/useWatch";
import useGetSelectedTask from "@state/hooks/useGetSelectedTask";
import FlowModal from "@components/FlowModal";
import { useRecoilState } from "recoil";
import { editState } from "@state/atom";
import Watch from "@components/Watch";
import { IWatch } from "@interfaces/IWatch";
import { ITask } from "@interfaces/ITask";

export default function Timer() {
  const [edit, setEdit] = useRecoilState<string | null>(editState);

  const timerHandler = useTimerHandler();
  const stopWatch = useStopWatch();
  const watch: IWatch = useWatch();
  const selectedTask: ITask | null = useGetSelectedTask();

  const isWatchRunning = watch.run && !selectedTask?.completed;
  const textBtn = isWatchRunning ? "Stop" : "Play";

  return (
    <div className="timer">
      <Button onClick={() => setEdit("flowModal")}>Flow</Button>
      {edit === "flowModal" ? <FlowModal /> : null}
      <Watch timeInSeconds={watch.value} />
      <Button
        aria-label={`Select: ${textBtn}`}
        onClick={isWatchRunning ? stopWatch : timerHandler}
      >
        {textBtn}
      </Button>
    </div>
  );
}
