import styles from "./List.module.css";
import Item from "./Item";
import Form from "@components/Form";
import useTasks from "@state/hooks/useTasks";

export default function List() {
  const tasks = useTasks();

  return (
    <aside className={styles.list}>
      <h2 className={styles.list__title}>Tasks</h2>
      <h3 className={styles.list__subtitle}>
        Select a task to be completed or just start the timer to focus
      </h3>
      <Form />
      <ul>
        {tasks.map((task) => (
          <Item key={task.id} task={task} />
        ))}
      </ul>
    </aside>
  );
}
