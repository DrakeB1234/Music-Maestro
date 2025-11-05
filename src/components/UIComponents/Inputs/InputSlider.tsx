import React from "react";
import styles from "./Input.module.css";

interface InputSlider {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  hideLabel?: boolean;
  hideValue?: boolean;
}

export default function InputSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label = "Slider",
  hideLabel = false,
  hideValue = false
}: InputSlider) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={styles.SliderWrapper}>
      <label className={`${styles.SliderLabel}`}>
        <p className={`caption ${hideLabel && styles.Hide}`}>{label}</p>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={styles.Slider}
        />
      </label>
      {!hideValue && <p className={styles.SliderValue}>{value}</p>}
    </div>
  );
}
