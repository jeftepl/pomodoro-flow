import { ITask } from "@interfaces/ITask";
import { useRecoilValue } from "recoil";
import { filteredTasks } from "@state/selectors";
import { searchState } from "@state/atom";
import useGetSelectedList from "./useGetSelectedList";

export default function useTasks() {
  const tasks = useRecoilValue<ITask[]>(filteredTasks);
  const search = useRecoilValue<string>(searchState);
  const selectedList = useGetSelectedList();

  if(search) return tasks;

  return tasks.filter(task => task.listId === selectedList?.id);
}
