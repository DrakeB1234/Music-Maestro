import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "filled-surface" | "filled-primary" | "outlined" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function Button({
  children,
  variant = "filled-surface",
  size = "md",
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
