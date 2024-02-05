import { useState } from "react";
import styles from "./TasksForm.module.css";
import Button from "@components/Button";
import { formatTwoDigits } from "@common/utils/timeFormatter";
import { useSetRecoilState } from "recoil";
import { editState } from "@state/atom";
import useAddTask from "@state/hooks/useAddTask";
import useEditTask from "@state/hooks/useEditTask";
import { ITask } from "@interfaces/ITask";

interface TasksFormProps {
  textAction: string,
  task?: ITask
}

export default function TasksForm({ textAction, task }: TasksFormProps) {
  let initialHours = "0";
  let initialMinutes = "0";
  let initialSeconds = "0";
  let initialTask = "";

  if(task) {
    const InitialTimeString = task.time;
    initialHours = InitialTimeString[0] + InitialTimeString[1];
    initialMinutes = InitialTimeString[3] + InitialTimeString[4];
    initialSeconds = InitialTimeString[6] + InitialTimeString[7];
    initialTask = task.name;
  }

  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [newTaskName, setNewTaskName] = useState(initialTask);

  const setEdit = useSetRecoilState<string | null>(editState);

  const addTask = useAddTask();
  const editTask = useEditTask();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formatedHours = formatTwoDigits(Number(hours));
    const formatedMinutes = formatTwoDigits(Number(minutes));
    const formatedSeconds = formatTwoDigits(Number(seconds));

    const newTime = `${formatedHours}:${formatedMinutes}:${formatedSeconds}`;

    if(task) {
      editTask(task.id, newTaskName, newTime);
      setEdit(null);
    } else {
      addTask({ name: newTaskName, time: newTime});
    }

    setNewTaskName(initialTask);
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.form__field}>
        <label htmlFor="task">{textAction} a task</label>
        <input
          type="text"
          value={newTaskName}
          onChange={event => setNewTaskName(event.target.value)}
          name="task"
          id="task"
          required
          placeholder="Type a task"
        />
      </div>
      <div className={styles.form__field}>
        <p>Time</p>
        <div className={styles.form__time}>
          <div className={styles.form__timeInput}>
            <input
              id="hours"
              type="number"
              value={hours}
              onChange={event => setHours(event.target.value)}
              placeholder="00 hrs"
              max={16}
              min={0}
            />
            <label htmlFor="hours">hrs</label>
          </div>
          :
          <div className={styles.form__timeInput}>
            <input
              id="minutes"
              type="number"
              value={minutes}
              onChange={event => setMinutes(event.target.value)}
              max={59}
              min={0}
              placeholder="00 min"
            />
            <label htmlFor="minutes">min</label>
          </div>
          :
          <div className={styles.form__timeInput}>
            <input
              id="seconds"
              type="number"
              max={59}
              min={0}
              value={seconds}
              onChange={event => setSeconds(event.target.value)}
              placeholder="00 sec"
            />
            <label htmlFor="seconds">sec</label>
          </div>
        </div>
        <Button type="submit">{textAction}</Button>
      </div>
    </form>
  );
}
