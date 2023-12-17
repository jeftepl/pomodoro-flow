import { ITask } from "@interfaces/ITask";
import { tasksState } from "@state/atom";
import { useRecoilValue } from "recoil";

export default function useTasks() {
  const tasks = useRecoilValue<ITask[]>(tasksState);

  return tasks;
}
