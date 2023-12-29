import { formatStringToSeconds } from "@common/utils/timeFormatter";
import { IFlow } from "@interfaces/IFlow";
import { IWatch } from "@interfaces/IWatch";
import { flowState, watchState } from "@state/atom";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function useFlowHandler() {
  let newNumberOfTimes = 0;

  const [flow, setFlow] = useRecoilState<IFlow>(flowState);
  const setWatch = useSetRecoilState<IWatch>(watchState);

  function updateWatch(time: string) {
    const newWatchValue = formatStringToSeconds(time);
    setWatch(oldWatch => ({
      ...oldWatch,
      initialValue: newWatchValue,
      value: newWatchValue,
      run: true,
    }));
  }

  function pomodoroHandler() {
    setFlow(oldFlow => ({
      ...oldFlow,
      pomodoro: {
        ...oldFlow.pomodoro,
        active: true,
      },
    }));
    updateWatch(flow.pomodoro.time);
  }

  function pomodoroToBreakHandler() {
    setFlow(oldFlow => {
      newNumberOfTimes = oldFlow.pomodoro.numberOfTimes + 1;
      return {
        ...oldFlow,
        pomodoro: {
          ...oldFlow.pomodoro,
          active: false,
          numberOfTimes: newNumberOfTimes,
        },
        break: {
          ...oldFlow.break,
          active: true,
        },
      };
    });
    updateWatch(flow.break.time);
  }

  function breakToLongBreakOrPomodoroHandler() {
    setFlow(oldFlow => {
      newNumberOfTimes = oldFlow.break.numberOfTimes + 1;
      return {
        ...oldFlow,
        break: {
          ...oldFlow.break,
          numberOfTimes: newNumberOfTimes,
          active: false,
        },
      };
    });
    if (newNumberOfTimes === 4) {
      setFlow(oldFlow => ({
        ...oldFlow,
        pomodoro: {
          ...oldFlow.pomodoro,
          numberOfTimes: 0,
        },
        break: {
          ...oldFlow.break,
          numberOfTimes: 0,
        },
        longBreak: {
          ...oldFlow.longBreak,
          active: true,
        },
      }));
      updateWatch(flow.longBreak.time);
    } else {
      pomodoroHandler();
    }
  }

  return () => {
    if (flow.pomodoro.active) {
      pomodoroToBreakHandler();
    } else if (flow.break.active) {
      breakToLongBreakOrPomodoroHandler();
    } else if (flow.longBreak.active) {
      pomodoroHandler();
    }
  };
}
