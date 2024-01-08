import { IList } from "@interfaces/IList";
import { listsState } from "@state/atom";
import { useSetRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

export default function useAddList() {
  const setList = useSetRecoilState<IList[]>(listsState);
  return (data: string) => {
    const newList = {
      id: uuid(),
      name: data,
      selected: true,
    };
    setList((oldList) => [...oldList, newList]);
  };
}
