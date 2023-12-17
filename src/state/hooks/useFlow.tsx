import { IFlow } from "@interfaces/IFlow";
import { flowState } from "@state/atom";
import { useRecoilValue } from "recoil";

export default function useFlow() {
  const flow = useRecoilValue<IFlow>(flowState);

  return flow;
}
