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
  handleChange?: () => void;
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
        className={styles.InputSelect}
        name={htmlName}
        id={htmlName}
        ref={ref}
        defaultValue={defaultValue}
        onChange={handleChange}
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
