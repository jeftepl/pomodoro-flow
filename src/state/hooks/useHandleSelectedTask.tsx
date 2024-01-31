import { formatStringToSeconds } from "@common/utils/timeFormatter";
import { ITask } from "@interfaces/ITask";
import { IWatch } from "@interfaces/IWatch";
import { searchState, tasksState, watchState } from "@state/atom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import useStopWatch from "./useStopWatch";
import useFlow from "./useFlow";
import useGetSelectedList from "./useGetSelectedList";
import useHandleSelectedList from "./useHandleSelectedList";

export default function useHandleSelectedTask() {
  const setTasks = useSetRecoilState<ITask[]>(tasksState);
  const setWatch = useSetRecoilState<IWatch>(watchState);
  const search = useRecoilValue<string>(searchState);

  const stopWatch = useStopWatch();
  const handleSelectedList = useHandleSelectedList();
  const resetSearch = useResetRecoilState(searchState);
  const selectedList = useGetSelectedList();
  const flow = useFlow();

  return (task: ITask) => {
    if(search) {
      resetSearch();
    }

    stopWatch();
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
    if(!selectedList || task.listId !== selectedList.id) {
      handleSelectedList(task.listId);
    }
    const watchValue = formatStringToSeconds(task.completed && !task.selected ? "0" : flow.pomodoro.time);
    setWatch(oldWatch => ({
      ...oldWatch,
      initialValue: watchValue,
      value: watchValue,
    }));
  };
}
