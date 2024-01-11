import { ITask } from "@interfaces/ITask";
import { tasksState } from "@state/atom";
import { useSetRecoilState } from "recoil";
import { v4 as uuid } from "uuid";
import useGetSelectedList from "./useGetSelectedList";

export default function useAddTask() {
  const setTasks = useSetRecoilState<ITask[]>(tasksState);
  const selectedList = useGetSelectedList();

  return (data: { name: string; time: string }) => {
    if(!selectedList) {
      alert('Please selected a list');
      return;
    }
    const newTask = {
      ...data,
      id: uuid(),
      selected: false,
      completed: false,
      remainingTime: data.time,
      listId: selectedList.id
    };
    setTasks(oldTasks => [...oldTasks, newTask]);
  };
}
