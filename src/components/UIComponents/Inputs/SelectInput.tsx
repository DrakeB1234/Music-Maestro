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
  handleChange?: (value: string) => void;
}

export default function SelectInput({
  label,
  htmlName,
  options,
  defaultValue,
  ref,
  handleChange
}: Props) {
  return (
    <div className={styles.InputWrapper}>
      <label className='body' htmlFor={htmlName}>{label}</label>
      <select
        className={styles.Input}
        name={htmlName}
        id={htmlName}
        ref={ref}
        defaultValue={defaultValue}
        onChange={(e) => handleChange && handleChange(e.target.value)}
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
