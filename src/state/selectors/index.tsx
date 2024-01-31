import { listsState, searchState, tasksState } from "@state/atom";
import { selector } from "recoil";

export const filteredLists = selector({
  key: "filteredLists",
  get: ({ get }) => {
    const search = get(searchState);
    const lists = get(listsState);

    return lists.filter(list => list.name.includes(search));
  }
});

export const filteredTasks = selector({
  key: "filteredTasks",
  get: ({ get }) => {
    const search = get(searchState);
    const tasks = get(tasksState);

    return tasks.filter(task => task.name.includes(search));
  }
});
