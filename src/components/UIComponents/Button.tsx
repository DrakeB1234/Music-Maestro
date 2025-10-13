import styles from "./Button.module.css";

type ButtonVariant = "text" | "outlined" | "contained";
type ButtonColor = "primary" | "neutral";
type ButtonRound = "small" | "full";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  round?: ButtonRound;
  text?: string;
}

export default function Button({
  variant = "contained",
  color = "primary",
  round = "full",
  text = "BUTTON",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[color]} ${styles[`round-${round}`]}`}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
}

