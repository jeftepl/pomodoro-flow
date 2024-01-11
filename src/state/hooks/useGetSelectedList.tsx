import { IList } from "@interfaces/IList";
import { listsState } from "@state/atom";
import { useRecoilValue } from "recoil";

export default function useGetSelectedList() {
  const lists = useRecoilValue<IList[]>(listsState);

  return lists.find(oldList => oldList.selected) || null;
}
