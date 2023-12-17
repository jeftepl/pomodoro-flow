import { IFlow } from "@interfaces/IFlow";
import { ITask } from "@interfaces/ITask";
import { IWatch } from "@interfaces/IWatch";
import { atom } from "recoil";

export const tasksState = atom<ITask[]>({
  key: "tasksState",
  default: []
});

export const watchState = atom<IWatch>({
  key: "watchState",
  default: {
    value: 0,
    run: false
  }
});

export const flowState = atom<IFlow>({
  key: "flowState",
  default: {
    pomodoro: "00:20:00",
    break: "00:05:00",
    longBreak: "00:15:00"
  }
});
