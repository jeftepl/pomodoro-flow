import Watch from "@components/Watch";
import styles from "./TimerInput.module.css";

interface TimerInputProps {
  label: string,
  identifier: string,
  value: string,
  onChange: React.Dispatch<React.SetStateAction<string>>
}

export default function TimerInput({label, identifier, value, onChange}: TimerInputProps) {
  return (
    <div className={styles.timerInput}>
      <label className={styles.timerInput__label} htmlFor={identifier}>{label}</label>
      <input
        id={identifier}
        type="range"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        min={60}
        max={5400}
        step={60}
      />
      <Watch timeInSeconds={Number(value)} />
    </div>
  );
}
