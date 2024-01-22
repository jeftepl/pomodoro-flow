import { ITask } from "@interfaces/ITask";
import { tasksState } from "@state/atom";
import { useSetRecoilState } from "recoil";

export default function useEditTask() {
  const setTasks = useSetRecoilState<ITask[]>(tasksState);

  return (taskId: string, newTaskName: string, newTaskTime: string) => {
    setTasks(oldTasks =>
      oldTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            name: newTaskName,
            time: newTaskTime,
            remainingTime: newTaskTime
          };
        }
        return task;
      })
    );
  };
}
