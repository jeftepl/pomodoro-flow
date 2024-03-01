export interface IFlowItem {
  time: string,
  active: boolean,
  numberOfTimes: number,
}
export interface IFlow {
  pomodoro: IFlowItem,
  shortBreak: IFlowItem,
  longBreak: IFlowItem,
}
