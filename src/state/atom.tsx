import { formatStringToSeconds } from "@common/utils/timeFormatter";
import { IFlow } from "@interfaces/IFlow";
import { IList } from "@interfaces/IList";
import { ITask } from "@interfaces/ITask";
import { IWatch } from "@interfaces/IWatch";
import { atom } from "recoil";

const initialFlow = {
  pomodoro: { time: "00:00:01", active: false, numberOfTimes: 0 },
  shortBreak: { time: "00:00:02", active: false, numberOfTimes: 0 },
  longBreak: { time: "00:00:03", active: false, numberOfTimes: 0 },
};

export const listsState = atom<IList[]>({
  key: "listsState",
  default: [],
});

export const tasksState = atom<ITask[]>({
  key: "tasksState",
  default: [],
});

export const watchState = atom<IWatch>({
  key: "watchState",
  default: {
    initialValue: 0,
    value: formatStringToSeconds(initialFlow.pomodoro.time),
    run: false,
  },
});

export const flowState = atom<IFlow>({
  key: "flowState",
  default: initialFlow,
});

export const searchState = atom<string>({
  key: "searchState",
  default: ""
});

export const editState = atom<string | null>({
  key: "editState",
  default: null
});