import { useState } from "react";
import Button from "./Inputs/Button";
import styles from './UIComponents.module.css';

interface ToggleButton {
  label: string;
  value: string | number;
}

interface ToggleButtonGroupProps {
  buttons: ToggleButton[];
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
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
    <div className={styles.ToggleButtonGroupWrapper}>
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
