import { watchState } from "@state/atom";
import useGetSelectedTask from "./useGetSelectedTask";
import { useRecoilState } from "recoil";
import useCompleteTask from "./useCompleteTask";
import { IWatch } from "@interfaces/IWatch";
import { useEffect, useCallback, useRef } from "react";
import { formatStringToSeconds } from "@common/utils/timeFormatter";
import usePause from "./usePauseWatch";

export default function useTimerHandler() {
  const [watch, setWatch] = useRecoilState<IWatch>(watchState);
  const isTimerRunningRef = useRef<boolean>(false);
  const timerIdRef = useRef<number | undefined>(undefined);

  const selectedTask = useGetSelectedTask();
  const completeTask = useCompleteTask();
  const pause = usePause();

  const stopTimer = useCallback(() => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = undefined;
    isTimerRunningRef.current = false;
  }, []);

  const startTimer = useCallback(() => {
    if (!selectedTask || selectedTask.completed || isTimerRunningRef.current) {
      return;
    }
    isTimerRunningRef.current = true;
    let timeWatch = watch.value;
    timerIdRef.current = setInterval(() => {
      try {
        const timePassedInSeconds = watch.initialValue - watch.value;
        const remainingTimeInSeconds = formatStringToSeconds(selectedTask.remainingTime);
        if((remainingTimeInSeconds - timePassedInSeconds) === 0) {
          completeTask();
          setWatch(oldWatch => ({...oldWatch, value: 0, run: false }));
          stopTimer();
        } else if (timeWatch === 0) {
          pause();
        } else {
          setWatch(oldWatch => ({ ...oldWatch, value: timeWatch - 1 }));
          timeWatch -= 1;
        }
      } catch (error) {
        console.error("Timer Error:", error);
        stopTimer();
      }
    }, 1000);
  }, [completeTask, setWatch, selectedTask, watch, stopTimer, pause]);

  useEffect(() => {
    if (watch.run && selectedTask && !isTimerRunningRef.current) {
      startTimer();
    } else if (!watch.run && isTimerRunningRef.current) {
      stopTimer();
    }

    return () => {
      stopTimer();
    };
  }, [watch, selectedTask, startTimer, stopTimer]);

  return () => {
    if (!selectedTask || selectedTask.completed) {
      return;
    }
    setWatch(oldWatch => ({ ...oldWatch, run: true }));
  };
}
