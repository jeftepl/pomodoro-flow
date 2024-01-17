import { ITask } from "@interfaces/ITask";
import styles from "./TasksItem.module.css";
import useHandleSelectedTask from "@state/hooks/useHandleSelectedTask";
import Button from "@components/Button";
import useDeleteTask from "@state/hooks/useDeleteTask";

interface ItemProps {
  task: ITask;
}

export default function TasksItem({ task }: ItemProps) {
  const handleSelectedTask = useHandleSelectedTask();
  const deleteTask = useDeleteTask();

  return (
    <li className={styles.taskItem}>
      <p
        className={`${styles.tasksItem__text} ${
          task.selected ? styles["tasksItem__text--selected"] : ""
        }`}
        onClick={() => handleSelectedTask(task)}
      >
        {task.name + " - "}
        <span className={styles["tasksItem--time"]}>
          {task.time + " - " + task.remainingTime}
        </span>
        <span>{task.completed ? " ✓" : ""}</span>
      </p>
      <div className={styles.tasksItem__options}>
        <Button>Edit</Button>
        <Button onClick={() => deleteTask([task])}>-</Button>
      </div>
    </li>
  );
}
