import { IList } from "@interfaces/IList";
import { listsState } from "@state/atom";
import { useSetRecoilState } from "recoil";

export default function useEditList() {
  const setLists = useSetRecoilState<IList[]>(listsState);

  return (listId: string, newListName: string) => {
    setLists(oldLists =>
      oldLists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            name: newListName,
          };
        }
        return list;
      })
    );
  };
}
