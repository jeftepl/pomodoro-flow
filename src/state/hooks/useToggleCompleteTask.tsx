import { ITask } from "@interfaces/ITask";
import { tasksState } from "@state/atom";
import { useSetRecoilState } from "recoil";

export default function useToggleCompleteTask() {
  const setTasks = useSetRecoilState<ITask[]>(tasksState);

  return (taskId: string) => {
    setTasks((oldTasks) =>
      oldTasks.map(task => {
        if (task.id === taskId) {
          let newTime = "";
          if(task.completed) {
            newTime = task.time;
          } else {
            newTime = "00:00:00";
          }
          return {
            ...task,
            completed: !task.completed,
            remainingTime: newTime
          };
        }
        return task;
      })
    );
  };
}
