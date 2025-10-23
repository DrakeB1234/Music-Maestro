import { useState } from "react";
import Button from "./Button";
import styles from './ToggleButtonGroup.module.css';

interface ToggleButton {
  label: string;
  value: string | number;
}

interface ToggleButtonGroupProps {
  buttons: ToggleButton[]; // buttons to render
  defaultValue?: string | number; // initial active button
  onChange?: (value: string | number) => void; // callback when a button is pressed
}

export default function ToggleButtonGroup({
  buttons,
  defaultValue,
  onChange,
}: ToggleButtonGroupProps) {
  const [activeValue, setActiveValue] = useState<string | number | undefined>(defaultValue);

  const handleClick = (value: string | number) => {
    if (value === activeValue) return;
    setActiveValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div className={styles.ButtonGroupWrapper}>
      {buttons.map((button) => (
        <Button
          key={button.value}
          text={button.label}
          variant="text-secondary"
          active={activeValue === button.value}
          onClick={() => handleClick(button.value)}
        />
      ))}
    </div>
  );
}
