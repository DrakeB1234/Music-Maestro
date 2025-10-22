import styles from './Input.module.css';

interface Props {
  type?: "text" | "number";
  label: string;
  htmlName: string;
  placeholder: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({
  type = "text",
  label,
  htmlName,
  placeholder,
  error,
  ref,
}: Props) {
  return (
    <div className={styles.InputWrapper}>
      <label className='body' htmlFor={htmlName}>{label}</label>
      <input
        className={styles.Input}
        type={type}
        name={htmlName}
        placeholder={placeholder}
        ref={ref}
      />
      <p className={`caption truncate-overflow-text ${styles.Error}`}> {error && `* ${error}`}</p>
    </div>
  )
}
