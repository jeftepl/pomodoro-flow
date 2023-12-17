import { formatStringToSeconds } from "@common/utils/timeFormatter";
import { ITask } from "@interfaces/ITask";
import { IWatch } from "@interfaces/IWatch";
import { tasksState, watchState } from "@state/atom";
import { useSetRecoilState } from "recoil";
import usePauseWatch from "./usePauseWatch";

export default function useHandleSelectedTask() {
  const setTasks = useSetRecoilState<ITask[]>(tasksState);
  const setWatch = useSetRecoilState<IWatch>(watchState);
  const pauseWatch = usePauseWatch();

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
    setWatch(oldWatch => ({
      ...oldWatch,
      value: formatStringToSeconds(!task.selected ? task.remainingTime : "0"),
    }));
  };
}
