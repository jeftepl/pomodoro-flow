import Watch from "@components/Watch";
import "./TimerRangeInput.scss";

interface TimerRangeInputProps {
  label: string,
  identifier: string,
  value: string,
  onChange: React.Dispatch<React.SetStateAction<string>>
}

export default function TimerRangeInput({label, identifier, value, onChange}: TimerRangeInputProps) {
  return (
    <div className="timerRangeInput">
      <label className="timerRangeInput__label" htmlFor={identifier}>{label}</label>
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
