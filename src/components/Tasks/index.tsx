import { ITask } from "@interfaces/ITask";
import "./Tasks.scss";
import TasksItem from "./TasksItem";
import TasksForm from "@components/Tasks/TasksForm";
import useTasks from "@state/hooks/useTasks";

export default function Tasks() {
  const tasks:ITask[] = useTasks();

  return (
    <div className="tasks">
      <h2 className="tasks__title">Tasks</h2>
      <TasksForm textAction="Add" />
      <ul>
        {tasks.map(task => <TasksItem key={task.id} task={task} />)}
      </ul>
    </div>
  );
}
