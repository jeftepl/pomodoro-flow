import { useState } from "react";
import styles from "./Form.module.css";
import Button from "@components/Button";
import useAddTask from "@state/hooks/useAddTask";

export default function Form() {
  const addTask = useAddTask();
  const [time, setTime] = useState("00:00:00");
  const [task, setTask] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addTask({ name: task, time: time });
    setTime("00:00:00");
    setTask("");
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <label htmlFor="task">Add a new task</label>
        <input
          type="text"
          value={task}
          onChange={event => setTask(event.target.value)}
          name="task"
          id="task"
          required
          placeholder="Type a task"
        />
      </div>
      <div>
        <label htmlFor="time">Time</label>
        <input
          type="time"
          value={time}
          onChange={event => setTime(event.target.value)}
          step="1"
          name="time"
          id="time"
          required
          min="00:00:00"
        />
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
}
