import { useRecoilState } from "recoil";
import { IWatch } from "@interfaces/IWatch";
import { tasksState, watchState } from "@state/atom";
import { ITask } from "@interfaces/ITask";
import useGetSelectedTask from "./useGetSelectedTask";
import { formatSecondsToString } from "@common/utils/timeFormatter";

export default function usePause() {
  const [watch, setWatch] = useRecoilState<IWatch>(watchState);
  const [tasks, setTasks] = useRecoilState<ITask[]>(tasksState);

  const selectedTask = useGetSelectedTask();

  return () => {
    setWatch({ ...watch, run: false });

    setTasks(tasks.map(task => {
      if(task.id === selectedTask?.id) {
        return {
          ...task,
          remainingTime: formatSecondsToString(watch.value)
        }
      }
      return task
    }));
  };
}
