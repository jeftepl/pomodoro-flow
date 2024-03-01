import { useCallback } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { searchState, tasksState, watchState } from "@state/atom";
import { formatStringToSeconds } from "@common/utils/timeFormatter";
import { ITask } from "@interfaces/ITask";
import { IWatch } from "@interfaces/IWatch";
import { IList } from "@interfaces/IList";
import { IFlow } from "@interfaces/IFlow";
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

 const selectedList: IList | null = useGetSelectedList();
 const flow: IFlow = useFlow();

 const handleTaskSelection = useCallback((task: ITask) => {
    if (search) {
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
    if (!selectedList || task.listId !== selectedList.id) {
      handleSelectedList(task.listId);
    }
    const newTime = task.completed && !task.selected ? "0" : flow.pomodoro.time;
    const newTimeInSeconds = formatStringToSeconds(newTime);
    setWatch(oldWatch => ({
      ...oldWatch,
      initialValue: newTimeInSeconds,
      value: newTimeInSeconds,
    }));
 }, [search, resetSearch, stopWatch, setTasks, selectedList, handleSelectedList, flow, setWatch]);

 return handleTaskSelection;
}
