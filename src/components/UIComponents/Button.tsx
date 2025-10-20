import styles from "./Button.module.css";

type ButtonVariant = "text" | "outlined" | "outlined-secondary" | "contained" | "contained-secondary";
type ButtonRound = "small" | "full";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  round?: ButtonRound;
  text?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  variant = "contained",
  round = "small",
  text = "",
  fullWidth = false,
  icon = null,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[`round-${round}`]} ${fullWidth ? styles.fullWidth : ''}`}
      disabled={disabled}
      {...props}
    >
      {icon ? icon : ''}
      {text}
    </button>
  );
}

