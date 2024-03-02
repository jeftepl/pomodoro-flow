import { formatSecondsToString, formatStringToSeconds } from "@common/utils/timeFormatter";
import { IFlow } from "@interfaces/IFlow";
import { IWatch } from "@interfaces/IWatch";
import { ITask } from "@interfaces/ITask";
import { flowState, tasksState, watchState } from "@state/atom";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import useGetSelectedTask from "./useGetSelectedTask";

export default function useFlowHandler() {
  type FlowKeys = keyof IFlow;

  const [flow, setFlow] = useRecoilState<IFlow>(flowState);
  const [watch, setWatch] = useRecoilState<IWatch>(watchState);
  const setTasks = useSetRecoilState<ITask[]>(tasksState);
  const resetFlow = useResetRecoilState(flowState);
  const selectedTask: ITask | null = useGetSelectedTask();

  const POMODORO = "pomodoro";
  const SHORT_BREAK = "shortBreak";
  const LONG_BREAK = "longBreak";

  let currentNumberOfTimes = 0;

  function updateWatch(time: string) {
    const newWatchValue = formatStringToSeconds(time);
    setWatch(oldWatch => ({
      ...oldWatch,
      initialValue: newWatchValue,
      value: newWatchValue,
      run: true,
    }));
  }

  function updateTaskRemainingTime(flowTime: string) {
    setTasks(oldTasks => oldTasks.map(task => {
      if(task.id === selectedTask?.id) {
        const flowTimeInSeconds = formatStringToSeconds(flowTime);
        const selectedTaskRemainingTimeInSeconds = formatStringToSeconds(selectedTask.remainingTime);
        let totalInSeconds = selectedTaskRemainingTimeInSeconds - flowTimeInSeconds;
        if(totalInSeconds < 0) {
          totalInSeconds = 0;
        }
        const totalString = formatSecondsToString(totalInSeconds);
        return {
          ...task,
          remainingTime: totalString
        }
      }
      return task;
    }));
  }

  function toggleActivityAndUpdateCount(state: FlowKeys, activeState: boolean, count: number) {
    setFlow(oldFlow => {
      currentNumberOfTimes = oldFlow[state].numberOfTimes + count;
      return {
        ...oldFlow,
        [state]: {
          ...oldFlow[state],
          numberOfTimes: currentNumberOfTimes,
          active: activeState,
        },
      };
    });
    updateWatch(flow[state].time);
    if(count > 0 && selectedTask) {
      updateTaskRemainingTime(flow[state].time);
    }
  }

  const handlePomodoroEnd = () => {
    toggleActivityAndUpdateCount(POMODORO, false,  1);
    toggleActivityAndUpdateCount(SHORT_BREAK, true,  0);
  };

  const handleShortBreakEnd = () => {
    toggleActivityAndUpdateCount(SHORT_BREAK, false,  1);
    if (currentNumberOfTimes ===  4) {
      resetFlow();
      toggleActivityAndUpdateCount(LONG_BREAK, true,  0);
    } else {
      toggleActivityAndUpdateCount(POMODORO, true,  0);
    }
  };

  const handleLongBreakEnd = () => {
    toggleActivityAndUpdateCount(LONG_BREAK, false,  1);
    toggleActivityAndUpdateCount(POMODORO, true,  0);
  };

  const startPomodoro = () => {
    toggleActivityAndUpdateCount(POMODORO, true,  0);
  };

  const handleFlow = () => {
    if (flow.pomodoro.active && watch.value ===  0) {
      handlePomodoroEnd();
    } else if (flow.shortBreak.active && watch.value ===  0) {
      handleShortBreakEnd();
    } else if (flow.longBreak.active && watch.value ===  0) {
      handleLongBreakEnd();
    } else {
      startPomodoro();
    }
  };

  return handleFlow;
}
