import type { ChangeEvent } from "react";
import styles from "./Input.module.css";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  htmlName: string;
  options: Option[];
  defaultValue?: string;
  ref?: React.Ref<HTMLSelectElement>;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  hideLabel?: boolean;
  value?: string;
}

export default function SelectInput({
  label,
  htmlName,
  options,
  defaultValue,
  ref,
  handleChange,
  value
}: Props) {
  return (
    <div className={styles.InputWrapper}>
      <label className='body' htmlFor={htmlName}>{label}</label>
      <select
        className={styles.InputSelect}
        name={htmlName}
        id={htmlName}
        ref={ref}
        defaultValue={defaultValue}
        onChange={handleChange}
        value={value}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
