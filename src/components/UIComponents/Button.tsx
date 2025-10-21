import styles from "./Button.module.css";

type ButtonVariant = "text" | "outlined" | "contained" | "contained-secondary";
type ButtonRound = "small" | "full";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  round?: ButtonRound;
  text?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  active?: boolean
}

export default function Button({
  variant = "contained",
  round = "small",
  text = "",
  fullWidth = false,
  icon = null,
  disabled,
  active,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${active ? styles.active : ''} ${styles[`round-${round}`]} ${fullWidth ? styles.fullWidth : ''} `}
      disabled={disabled}
      {...props}
    >
      {icon ? icon : ''}
      {text}
    </button>
  );
}

