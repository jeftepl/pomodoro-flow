import { IList } from "@interfaces/IList";
import { filteredLists } from "@state/selectors";
import { useRecoilValue } from "recoil";

export default function useLists() {
  const lists = useRecoilValue<IList[]>(filteredLists);

  return lists;
}
