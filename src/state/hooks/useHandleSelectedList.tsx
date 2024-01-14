import { IList } from "@interfaces/IList";
import { listsState, searchState } from "@state/atom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

export default function useHandleSelectedList() {
  const setLists = useSetRecoilState<IList[]>(listsState);
  const search = useRecoilValue<string>(searchState);
  const resetSearch = useResetRecoilState(searchState);

  return (currentListId: string) => {
    if(search) resetSearch();

    setLists((oldLists) =>
      oldLists.map((oldList) => {
        if (oldList.id === currentListId) {
          console.log("if handle selected list");
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
