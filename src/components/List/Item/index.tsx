import { ITask } from "@interfaces/ITask";
import styles from "./Item.module.css";
import useHandleSelectedTask from "@state/hooks/useHandleSelectedTask";

interface ItemProps {
  task: ITask,
}

export default function Item({ task }: ItemProps) {
  const handleSelectedTask = useHandleSelectedTask();

  return (
    <li
      className={`${styles.item} ${
        task.selected ? styles["item--selected"] : ""
      }`}
      onClick={() => handleSelectedTask(task)}
    >
      {task.name + " - "}
      <span className={styles["item--time"]}>{task.time + " - " + task.remainingTime}</span>
      <span>{task.completed ? " ✓" : ""}</span>
    </li>
  );
}
