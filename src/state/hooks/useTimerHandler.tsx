import { watchState } from "@state/atom";
import useGetSelectedTask from "./useGetSelectedTask";
import { useRecoilState } from "recoil";
import useCompleteTask from "./useCompleteTask";
import { IWatch } from "@interfaces/IWatch";
import { useEffect, useCallback, useRef } from "react";

export default function useTimerHandler() {
  const [watch, setWatch] = useRecoilState<IWatch>(watchState);
  const isTimerRunningRef = useRef<boolean>(false);
  const timerIdRef = useRef<number | undefined>(undefined);

  const selectedTask = useGetSelectedTask();
  const completeTask = useCompleteTask();

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
    let remainingTime = watch.value;
    timerIdRef.current = setInterval(() => {
      try {
        if (remainingTime === 0) {
          completeTask();
          setWatch({ value: 0, run: false });
          stopTimer();
        } else {
          setWatch(oldWatch => ({ ...oldWatch, value: remainingTime - 1 }));
          remainingTime -= 1;
        }
      } catch (error) {
        console.error("Timer Error:", error);
        stopTimer();
      }
    }, 1000);
  }, [completeTask, setWatch, selectedTask, watch, stopTimer]);

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
