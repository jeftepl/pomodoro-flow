import { ITask } from "@interfaces/ITask";
import styles from "./TasksItem.module.css";
import useHandleSelectedTask from "@state/hooks/useHandleSelectedTask";
import Button from "@components/Button";
import useDeleteTask from "@state/hooks/useDeleteTask";
import { useState } from "react";
import useEditTask from "@state/hooks/useEditTask";
import { useRecoilState } from "recoil";
import { editState } from "@state/atom";
import useToggleCompleteTask from "@state/hooks/useToggleCompleteTask";

interface ItemProps {
  task: ITask;
}

export default function TasksItem({ task }: ItemProps) {
  const handleSelectedTask = useHandleSelectedTask();
  const deleteTask = useDeleteTask();
  const editTask = useEditTask();
  const toggleCompleteTask = useToggleCompleteTask();

  const [edit, setEdit] = useRecoilState<string | null>(editState);

  const [taskName, setTaskName] = useState(task.name);
  const [taskTime, setTaskTime] = useState(task.time);

  function handleEditTask() {
    editTask(task.id, taskName, taskTime);
    setEdit(null);
  }

  return (
    <li className={styles.taskItem}>
      {(!edit || edit !== task.id) && (
        <div className={styles.taskItem__read}>
          <input type="checkbox" checked={task.completed} onChange={() => toggleCompleteTask(task.id)} />
          <p
            className={`${styles.tasksItem__text} ${
              task.selected ? styles["tasksItem__text--selected"] : ""
            }`}
            onClick={() => handleSelectedTask(task)}
          >
            {task.name + " - "}
            <span className={styles["tasksItem--time"]}>
              {task.time}
            </span>
          </p>
          <div className={styles.tasksItem__options}>
            <Button onClick={() => setEdit(task.id)}>Edit</Button>
            <Button onClick={() => deleteTask([task])}>-</Button>
          </div>
        </div>
      )}
      {edit && edit === task.id && (
        <div className={styles.taskItem__edit}>
          <input
            type="text"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
          />
          <input
            type="time"
            value={taskTime}
            onChange={event => setTaskTime(event.target.value)}
            step="1"
            name="time"
            id="time"
            required
            min="00:00:01"
          />
          <Button onClick={handleEditTask}>Ok</Button>
        </div>
      )}
    </li>
  );
}
