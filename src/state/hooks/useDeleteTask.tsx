import { ITask } from "@interfaces/ITask";
import { tasksState } from "@state/atom";
import { useSetRecoilState } from "recoil";

export default function useDeleteTask() {
  const setTasks = useSetRecoilState<ITask[]>(tasksState);
  return (data: ITask[]) => {
    setTasks(oldTasks => oldTasks.filter(task => task !== data.find(dataTask => dataTask.id === task.id )));
  }
}