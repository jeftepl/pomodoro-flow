import { ITask } from "@interfaces/ITask";
import { tasksState } from "@state/atom";
import { useRecoilValue } from "recoil";

export default function useGetSelectedTask() {
  const tasks = useRecoilValue<ITask[]>(tasksState);

  return tasks.find(task => task.selected) || null;
}
