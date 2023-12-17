import { IWatch } from "@interfaces/IWatch";
import { watchState } from "@state/atom";
import { useRecoilValue } from "recoil";

export default function useWatch() {
  const watch = useRecoilValue<IWatch>(watchState);

  return watch;
}
