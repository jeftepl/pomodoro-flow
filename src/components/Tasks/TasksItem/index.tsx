import { ITask } from "@interfaces/ITask";
import "./TasksItem.scss";
import useHandleSelectedTask from "@state/hooks/useHandleSelectedTask";
import Button from "@components/Button";
import useDeleteTask from "@state/hooks/useDeleteTask";
import { useRecoilState } from "recoil";
import { editState } from "@state/atom";
import useToggleCompleteTask from "@state/hooks/useToggleCompleteTask";
import Watch from "@components/Watch";
import { formatStringToSeconds } from "@common/utils/timeFormatter";
import TasksForm from "../TasksForm";

interface ItemProps {
  task: ITask;
}

export default function TasksItem({ task }: ItemProps) {
  const { completed, selected, id, name, time, remainingTime } = task;

  const handleSelectedTask = useHandleSelectedTask();
  const deleteTask = useDeleteTask();
  const toggleCompleteTask = useToggleCompleteTask();

  const [edit, setEdit] = useRecoilState<string | null>(editState);

  const handleToggleComplete = () => toggleCompleteTask(id);
  const handleSelectTask = () => handleSelectedTask(task);
  const handleEditClick = () => setEdit(id);
  const handleDeleteClick = () => deleteTask([task]);

  return (
    <li className="tasksItem">
      {(!edit || edit !== id) && (
        <div
          className="tasksItem__read"
          aria-label={`Select task: ${name}`}
          tabIndex={0}
        >
          <input
            type="checkbox"
            checked={completed}
            onChange={handleToggleComplete}
          />
          <div
            className={`tasksItem__text ${selected ? "tasksItem__text--selected" : ""}`}
            onClick={handleSelectTask}
          >
            {name}
            <span className="tasksItem__time">
              <Watch timeInSeconds={formatStringToSeconds(time)} /> /
              <Watch timeInSeconds={formatStringToSeconds(remainingTime)} />
            </span>
          </div>
          <div className="tasksItem__options">
            <Button onClick={handleEditClick}>Edit</Button>
            <Button onClick={handleDeleteClick}>-</Button>
          </div>
        </div>
      )}
      {edit && edit === id && <TasksForm textAction="Edit" task={task} />}
    </li>
  );
}
