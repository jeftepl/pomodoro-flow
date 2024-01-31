import { useRecoilState } from "recoil";
import { IWatch } from "@interfaces/IWatch";
import { ITask } from "@interfaces/ITask";
import { tasksState, watchState } from "@state/atom";
import { formatSecondsToString, formatStringToSeconds } from "@common/utils/timeFormatter";
import useGetSelectedTask from "./useGetSelectedTask";

export default function useStopWatch() {
  const [watch, setWatch] = useRecoilState<IWatch>(watchState);
  const [tasks, setTasks] = useRecoilState<ITask[]>(tasksState);

  const selectedTask = useGetSelectedTask();

  return () => {
    if(selectedTask?.completed) return

    let remainingTimeString = formatSecondsToString(watch.value);
    const timePassedInSeconds = watch.initialValue - watch.value;

    if(selectedTask) {
      const remainingTimeInSeconds = formatStringToSeconds(selectedTask.remainingTime);
      const remainingValueInSeconds = remainingTimeInSeconds - timePassedInSeconds;
      remainingTimeString = formatSecondsToString(remainingValueInSeconds);

      setTasks(tasks.map(task => {
        if(task.id === selectedTask.id) {
          return {
            ...task,
            remainingTime: remainingTimeString
          }
        }
        return task
      }));
    }

    setWatch({ ...watch, initialValue: watch.initialValue - timePassedInSeconds,  run: false });
  };
}
