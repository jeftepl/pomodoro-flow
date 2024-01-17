import { IList } from "@interfaces/IList";
import { ITask } from "@interfaces/ITask";
import { listsState, tasksState } from "@state/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useDeleteTask from "./useDeleteTask";

export default function useDeleteList () {
  const setLists = useSetRecoilState<IList[]>(listsState);
  const tasks = useRecoilValue<ITask[]>(tasksState);
  const deleteTask = useDeleteTask();

  return (listId: string) => {
    setLists(oldLists => oldLists.filter(oldList => oldList.id !== listId));
    const tasksToBeDeleted = tasks.filter(task => task.listId === listId);
    deleteTask(tasksToBeDeleted);
  }
}