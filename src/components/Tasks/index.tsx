import styles from "./Tasks.module.css";
import TasksItem from "./TasksItem";
import TaskForm from "@components/Tasks/TaskForm";
import useTasks from "@state/hooks/useTasks";

export default function Tasks() {
  const tasks = useTasks();

  return (
    <div className={styles.tasks}>
      <h2 className={styles.tasks__title}>Tasks</h2>
      <TaskForm textAction="Add" />
      <ul>
        {tasks.map(task => <TasksItem key={task.id} task={task} />)}
      </ul>
    </div>
  );
}
