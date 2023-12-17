import { ITask } from "@interfaces/ITask";
import { tasksState } from "@state/atom";
import { useSetRecoilState } from "recoil";
import useGetSelectedTask from "./useGetSelectedTask";

export default function useCompleteTask() {
  const setTasks = useSetRecoilState<ITask[]>(tasksState);
  const selectedTask = useGetSelectedTask();

  return () => {
    setTasks((oldTasks) =>
      oldTasks.map(task => {
        if (selectedTask && task.id === selectedTask.id) {
          return {
            ...task,
            completed: true,
            remainingTime: "00:00:00",
          };
        }
        return task;
      })
    );
  };
}
