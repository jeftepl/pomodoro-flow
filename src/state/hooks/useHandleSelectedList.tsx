import { IList } from "@interfaces/IList";
import { listsState } from "@state/atom";
import { useSetRecoilState } from "recoil";

export default function useHandleSelectedList() {
  const setLists = useSetRecoilState<IList[]>(listsState);
  return (currentlist: IList) => {
    setLists((oldLists) =>
      oldLists.map((oldList) => {
        if (oldList.id === currentlist.id) {
          return {
            ...oldList,
            selected: !oldList.selected,
          };
        }
        return {
          ...oldList,
          selected: false,
        };
      })
    );
  };
}
