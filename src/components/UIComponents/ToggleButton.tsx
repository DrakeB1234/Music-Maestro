import { useState } from "react";
import styles from "./ToggleButton.module.css";

interface ToggleProps {
  value?: boolean;
  initial?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function ToggleButton({ value, initial = false, onChange }: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(initial);

  const isControlled = value !== undefined;
  const checked = isControlled ? value : internalChecked;

  const toggle = () => {
    const newValue = !checked;

    if (!isControlled) {
      setInternalChecked(newValue);
    }

    onChange?.(newValue);
  };

  return (
    <button
      type="button"
      className={`${styles.Toggle} ${checked ? styles.Checked : ""}`}
      onClick={toggle}
      aria-pressed={checked}
    >
      <div className={styles.Thumb} />
    </button>
  );
}
