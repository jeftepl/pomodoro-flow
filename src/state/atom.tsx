import { formatStringToSeconds } from "@common/utils/timeFormatter";
import { IFlow } from "@interfaces/IFlow";
import { ITask } from "@interfaces/ITask";
import { IWatch } from "@interfaces/IWatch";
import { atom } from "recoil";

const initialFlow = {
  pomodoro: "00:00:20",
  break: "00:05:00",
  longBreak: "00:15:00"
}

export const tasksState = atom<ITask[]>({
  key: "tasksState",
  default: []
});

export const watchState = atom<IWatch>({
  key: "watchState",
  default: {
    initialValue: 0,
    value: formatStringToSeconds(initialFlow.pomodoro),
    run: false
  }
});

export const flowState = atom<IFlow>({
  key: "flowState",
  default: initialFlow
});
