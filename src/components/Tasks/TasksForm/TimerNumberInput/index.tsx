import styles from "./TimerNumberInput.module.css";

interface TimerNumberInputProps {
  identifier: string,
  unit: string,
  max: string,
  value: string,
  onChange: (value: React.SetStateAction<string>) => void
}

export default function TimerNumberInput({
  identifier,
  unit,
  max,
  value,
  onChange,
}: TimerNumberInputProps) {
  return (
    <div className={styles.form__timeInput}>
      <input
        id={identifier}
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="00"
        max={max}
        min={0}
      />
      <label htmlFor={identifier}>{unit}</label>
    </div>
  );
}
