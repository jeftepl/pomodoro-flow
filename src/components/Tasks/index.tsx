import useGetSelectedList from "@state/hooks/useGetSelectedList";
import styles from "./Tasks.module.css";
import TasksItem from "./TasksItem";
import Form from "@components/Tasks/Form";
import useTasks from "@state/hooks/useTasks";

export default function Tasks() {
  const tasks = useTasks();
  const selectedList = useGetSelectedList();

  return (
    <div className={styles.tasks}>
      <h2 className={styles.tasks__title}>Tasks</h2>
      <Form />
      <ul>
        {tasks.map(task => {
          if (task.listId === selectedList?.id) {
            return <TasksItem key={task.id} task={task} />;
          }
          return;
        })}
      </ul>
    </div>
  );
}
