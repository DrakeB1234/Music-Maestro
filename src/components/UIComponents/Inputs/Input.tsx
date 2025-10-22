import styles from './Input.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  htmlName: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({
  label,
  htmlName,
  error,
  ref,
  ...props
}: Props) {
  return (
    <div className={styles.InputWrapper}>
      <label className='body' htmlFor={htmlName}>{label}</label>
      <input
        className={styles.Input}
        name={htmlName}
        ref={ref}
        {...props}
      />
      <p className={`caption truncate-overflow-text ${styles.Error}`}> {error && `* ${error}`}</p>
    </div>
  )
}
