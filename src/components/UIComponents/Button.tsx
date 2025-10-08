import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "filled-surface" | "filled-primary" | "outlined" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
}

export default function Button({
  children,
  variant = "filled-surface",
  active = false,
  size = "md",
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${active ? styles.active : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
