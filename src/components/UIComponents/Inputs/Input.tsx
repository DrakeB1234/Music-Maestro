import styles from './Input.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  htmlName: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
  value?: string;
}

export default function Input({
  label,
  htmlName,
  error,
  ref,
  value,
  ...props
}: Props) {
  return (
    <div className={styles.InputWrapper}>
      <label className='body' htmlFor={htmlName}>{label}</label>
      <input
        className={styles.Input}
        name={htmlName}
        id={htmlName}
        value={value}
        ref={ref}
        {...props}
      />
      <p className={`caption-secondary truncate-overflow-text ${styles.Error}`}> {error && `* ${error}`}</p>
    </div>
  )
}
