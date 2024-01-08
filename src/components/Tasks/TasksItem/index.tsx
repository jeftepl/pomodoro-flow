import { ITask } from "@interfaces/ITask";
import styles from "./TasksItem.module.css";
import useHandleSelectedTask from "@state/hooks/useHandleSelectedTask";

interface ItemProps {
  task: ITask,
}

export default function TasksItem({ task }: ItemProps) {
  const handleSelectedTask = useHandleSelectedTask();

  return (
    <li
      className={`${styles.tasksItem} ${
        task.selected ? styles["tasksItem--selected"] : ""
      }`}
      onClick={() => handleSelectedTask(task)}
    >
      {task.name + " - "}
      <span className={styles["tasksItem--time"]}>{task.time + " - " + task.remainingTime}</span>
      <span>{task.completed ? " ✓" : ""}</span>
    </li>
  );
}
