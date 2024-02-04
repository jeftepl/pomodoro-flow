import { ITask } from "@interfaces/ITask";
import styles from "./TasksItem.module.css";
import useHandleSelectedTask from "@state/hooks/useHandleSelectedTask";
import Button from "@components/Button";
import useDeleteTask from "@state/hooks/useDeleteTask";
import { useRecoilState } from "recoil";
import { editState } from "@state/atom";
import useToggleCompleteTask from "@state/hooks/useToggleCompleteTask";
import Watch from "@components/Timer/Watch";
import { formatStringToSeconds } from "@common/utils/timeFormatter";
import TaskForm from "../TaskForm";

interface ItemProps {
  task: ITask;
}

export default function TasksItem({ task }: ItemProps) {
  const handleSelectedTask = useHandleSelectedTask();
  const deleteTask = useDeleteTask();
  const toggleCompleteTask = useToggleCompleteTask();

  const [edit, setEdit] = useRecoilState<string | null>(editState);

  return (
    <li className={styles.taskItem}>
      {(!edit || edit !== task.id) && (
        <div className={styles.taskItem__read}>
          <input type="checkbox" checked={task.completed} onChange={() => toggleCompleteTask(task.id)} />
          <div
            className={`${styles.tasksItem__text} ${
              task.selected ? styles["tasksItem__text--selected"] : ""
            }`}
            onClick={() => handleSelectedTask(task)}
          >
            {task.name}
            <span className={styles.taskItem__time}>
              <Watch timeInSeconds={formatStringToSeconds(task.time)} /> /
              <Watch timeInSeconds={formatStringToSeconds(task.remainingTime)} />
            </span>
          </div>
          <div className={styles.tasksItem__options}>
            <Button onClick={() => setEdit(task.id)}>Edit</Button>
            <Button onClick={() => deleteTask([task])}>-</Button>
          </div>
        </div>
      )}
      {edit && edit === task.id && (
        <TaskForm textAction="Edit" taskEdit={task}/>
      )}
    </li>
  );
}
