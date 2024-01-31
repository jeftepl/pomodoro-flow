import { useState } from "react";
import styles from "./FlowModal.module.css";
import Button from "@components/Button";
import useFlow from "@state/hooks/useFlow";
import { formatStringToSeconds } from "@common/utils/timeFormatter";
import Watch from "@components/Timer/Watch";
import useEditFlow from "@state/hooks/useEditFlow";

export default function FlowModal() {
  const flow = useFlow();
  const editFlow = useEditFlow();

  const [pomodoro, setPomodoro] = useState(formatStringToSeconds(flow.pomodoro.time).toString());
  const [shortBreak, setShortBreak] = useState(formatStringToSeconds(flow.shortBreak.time).toString());
  const [longBreak, setLongBreak] = useState(formatStringToSeconds(flow.longBreak.time).toString());

  return (
    <div className={styles.flowModal}>
      <div className={styles.flowModal__container}>
        <div className={styles.flowModal__content}>
          <label htmlFor="pomodoro">Pomodoro</label>
          <input
            id="pomodoro"
            type="range"
            value={pomodoro}
            onChange={(event) => setPomodoro(event.target.value)}
            min={60}
            max={5400}
            step={60}
          />
          <Watch timeInSeconds={Number(pomodoro)} />
        </div>
        <div className={styles.flowModal__content}>
          <label htmlFor="shortBreak">Short Break</label>
          <input
            id="shortBreak"
            type="range"
            value={shortBreak}
            onChange={(event) => setShortBreak(event.target.value)}
            min={60}
            max={5400}
            step={60}
          />
          <Watch timeInSeconds={Number(shortBreak)} />
        </div>
        <div className={styles.flowModal__content}>
          <label htmlFor="longbreak">Long Break</label>
          <input
            id="longbreak"
            type="range"
            value={longBreak}
            onChange={(event) => setLongBreak(event.target.value)}
            min={60}
            max={5400}
            step={60}
          />
          <Watch timeInSeconds={Number(longBreak)} />
        </div>
      </div>
      <Button onClick={() => editFlow(pomodoro, shortBreak, longBreak)}>Ok</Button>
    </div>
  );
}
