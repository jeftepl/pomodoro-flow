import { ITask } from "@interfaces/ITask";
import styles from "./Tasks.module.css";
import TasksItem from "./TasksItem";
import TasksForm from "@components/Tasks/TasksForm";
import useTasks from "@state/hooks/useTasks";

export default function Tasks() {
  const tasks:ITask[] = useTasks();

  return (
    <div className={styles.tasks}>
      <h2 className={styles.tasks__title}>Tasks</h2>
      <TasksForm textAction="Add" />
      <ul>
        {tasks.map(task => <TasksItem key={task.id} task={task} />)}
      </ul>
    </div>
  );
}
