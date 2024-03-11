import { useState } from "react";
import "./TasksForm.scss";
import Button from "@components/Button";
import { formatTwoDigits } from "@common/utils/timeFormatter";
import { useSetRecoilState } from "recoil";
import { editState } from "@state/atom";
import useAddTask from "@state/hooks/useAddTask";
import useEditTask from "@state/hooks/useEditTask";
import { ITask } from "@interfaces/ITask";
import TimerNumberInput from "./TimerNumberInput";

interface TasksFormProps {
  textAction: string;
  task?: ITask;
}

function parseInitialTime(task: ITask | undefined) {
  let initialHours = "";
  let initialMinutes = "";
  let initialSeconds = "";
  let initialTask = "";

  if (task) {
    const InitialTimeString = task.time;
    initialHours = InitialTimeString[0] + InitialTimeString[1];
    initialMinutes = InitialTimeString[3] + InitialTimeString[4];
    initialSeconds = InitialTimeString[6] + InitialTimeString[7];
    initialTask = task.name;
  }

  return { initialHours, initialMinutes, initialSeconds, initialTask };
}

export default function TasksForm({ textAction, task }: TasksFormProps) {
  const { initialHours, initialMinutes, initialSeconds, initialTask } = parseInitialTime(task);

  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [newTaskName, setNewTaskName] = useState(initialTask);

  const setEdit = useSetRecoilState<string | null>(editState);

  const addTask = useAddTask();
  const editTask = useEditTask();

  function formattedTime() {
    const formatedHours = formatTwoDigits(Number(hours));
    const formatedMinutes = formatTwoDigits(Number(minutes));
    const formatedSeconds = formatTwoDigits(Number(seconds));

    return `${formatedHours}:${formatedMinutes}:${formatedSeconds}`;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (task) {
        editTask(task.id, newTaskName, formattedTime());
        setEdit(null);
      } else {
        addTask({ name: newTaskName, time: formattedTime() });
      }
      setNewTaskName(initialTask);
      setHours(initialHours);
      setMinutes(initialMinutes);
      setSeconds(initialSeconds);
    } catch (error) {
      console.error("Failed to create or update task: ", error);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__field">
        <label htmlFor="task">{textAction} a task</label>
        <input
          type="text"
          value={newTaskName}
          onChange={(event) => setNewTaskName(event.target.value)}
          name="task"
          id="task"
          required
          placeholder="Type a task"
        />
      </div>
      <div className="form__field">
        <p>Time</p>
        <div className="form__time">
          <TimerNumberInput
            identifier="hours"
            unit="hrs"
            max="16"
            value={hours}
            onChange={setHours}
          />
          :
          <TimerNumberInput
            identifier="minutes"
            unit="min"
            max="59"
            value={minutes}
            onChange={setMinutes}
          />
          :
          <TimerNumberInput
            identifier="seconds"
            unit="sec"
            max="59"
            value={seconds}
            onChange={setSeconds}
          />
        </div>
        <Button type="submit">{textAction}</Button>
      </div>
    </form>
  );
}
