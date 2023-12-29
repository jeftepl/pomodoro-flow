import { formatStringToSeconds } from "@common/utils/timeFormatter";
import { ITask } from "@interfaces/ITask";
import { IWatch } from "@interfaces/IWatch";
import { tasksState, watchState } from "@state/atom";
import { useSetRecoilState } from "recoil";
import usePauseWatch from "./usePauseWatch";
import useFlow from "./useFlow";

export default function useHandleSelectedTask() {
  const setTasks = useSetRecoilState<ITask[]>(tasksState);
  const setWatch = useSetRecoilState<IWatch>(watchState);
  const pauseWatch = usePauseWatch();
  const flow = useFlow();

  return (task: ITask) => {
    pauseWatch();
    setTasks(oldTasks =>
      oldTasks.map(oldTask => {
        if (oldTask.id === task.id) {
          return {
            ...oldTask,
            selected: !task.selected,
          };
        }
        return {
          ...oldTask,
          selected: false,
        };
      })
    );
    const watchValue = formatStringToSeconds(task.completed && !task.selected ? "0" : flow.pomodoro.time);
    setWatch(oldWatch => ({
      ...oldWatch,
      initialValue: watchValue,
      value: watchValue,
    }));
  };
}
