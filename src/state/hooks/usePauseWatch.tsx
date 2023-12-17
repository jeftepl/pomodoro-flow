import { useRecoilState } from "recoil";
import { IWatch } from "@interfaces/IWatch";
import { ITask } from "@interfaces/ITask";
import { tasksState, watchState } from "@state/atom";
import { formatSecondsToString, formatStringToSeconds } from "@common/utils/timeFormatter";
import useGetSelectedTask from "./useGetSelectedTask";

export default function usePause() {
  const [watch, setWatch] = useRecoilState<IWatch>(watchState);
  const [tasks, setTasks] = useRecoilState<ITask[]>(tasksState);

  const selectedTask = useGetSelectedTask();

  return () => {
    setWatch({ ...watch, run: false });

    let remainingTimeString = formatSecondsToString(watch.value);

    if(selectedTask?.remainingTime) {
      const remainingTimeInSeconds = formatStringToSeconds(selectedTask?.remainingTime);
      const timePassedInSeconds = remainingTimeInSeconds - watch.value;
      const remainingValueInSeconds = remainingTimeInSeconds - timePassedInSeconds;
      remainingTimeString = formatSecondsToString(remainingValueInSeconds);
    }

    setTasks(tasks.map(task => {
      if(task.id === selectedTask?.id) {
        return {
          ...task,
          remainingTime: remainingTimeString
        }
      }
      return task
    }));
  };
}
