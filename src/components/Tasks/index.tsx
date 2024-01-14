import styles from "./Tasks.module.css";
import TasksItem from "./TasksItem";
import Form from "@components/Tasks/Form";
import useTasks from "@state/hooks/useTasks";

export default function Tasks() {
  const tasks = useTasks();

  return (
    <div className={styles.tasks}>
      <h2 className={styles.tasks__title}>Tasks</h2>
      <Form />
      <ul>
        {tasks.map(task => <TasksItem key={task.id} task={task} />)}
      </ul>
    </div>
  );
}
