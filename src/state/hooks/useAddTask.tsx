import { ITask } from "@interfaces/ITask";
import { tasksState } from "@state/atom";
import { useSetRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

export default function useAddTask() {
  const setTasks = useSetRecoilState<ITask[]>(tasksState);

  return (data: { name: string; time: string }) => {
    const newTask = {
      ...data,
      id: uuid(),
      selected: false,
      completed: false,
      remainingTime: data.time
    };
    setTasks(oldTasks => [...oldTasks, newTask]);
  };
}
