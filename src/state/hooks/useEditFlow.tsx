import { formatSecondsToString } from "@common/utils/timeFormatter";
import { IFlow } from "@interfaces/IFlow";
import { IWatch } from "@interfaces/IWatch";
import { editState, flowState, watchState } from "@state/atom";
import { useSetRecoilState } from "recoil";
import useStopWatch from "./useStopWatch";

export default function useEditFlow() {
  const setFlow = useSetRecoilState<IFlow>(flowState);
  const setWatch = useSetRecoilState<IWatch>(watchState);
  const setEdit = useSetRecoilState<string | null>(editState);

  const stopWatch = useStopWatch();

  return (newPomodoroTime: string, newShortBreakTime: string, newLongBreakTime: string) => {
    const formatedNewPomodoroTime = formatSecondsToString(Number(newPomodoroTime));
    const formatedNewShortBreakTime = formatSecondsToString(Number(newShortBreakTime));
    const formatedNewLongBreakTime = formatSecondsToString(Number(newLongBreakTime));

    stopWatch();

    setFlow((oldFlow) => ({
      pomodoro: {
        ...oldFlow.pomodoro,
        time: formatedNewPomodoroTime,
      },
      shortBreak: {
        ...oldFlow.shortBreak,
        time: formatedNewShortBreakTime,
      },
      longBreak: {
        ...oldFlow.longBreak,
        time: formatedNewLongBreakTime,
      },
    })
  );

    setWatch(oldWatch => ({...oldWatch, initialValue: Number(newPomodoroTime), value: Number(newPomodoroTime)}));
    setEdit(null);
  };
}
