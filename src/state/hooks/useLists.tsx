import { IList } from "@interfaces/IList";
import { listsState } from "@state/atom";
import { useRecoilValue } from "recoil";

export default function useLists() {
  const lists = useRecoilValue<IList[]>(listsState);

  return lists;
}
