import { useRecoilValue } from "recoil";
import { searchState } from "@state/atom";
import { IList } from "@interfaces/IList";
import { ITask } from "@interfaces/ITask";
import { filteredTasks } from "@state/selectors";
import useGetSelectedList from "./useGetSelectedList";

export default function useTasks() {
  const tasks = useRecoilValue<ITask[]>(filteredTasks);
  const search = useRecoilValue<string>(searchState);
  const selectedList: IList | null = useGetSelectedList();

  if (search) {
    return tasks;
  }

  return tasks.filter(task => task.listId === selectedList?.id);
}
