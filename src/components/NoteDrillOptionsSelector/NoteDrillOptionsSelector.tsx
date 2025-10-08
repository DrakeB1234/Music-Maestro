import type { DrillOptions, StaffOptions } from "@customtypes/DrillOptions";
import { useState } from "react";
import styles from './NoteDrillOptionsSelector.module.css';
import Button from "../UIComponents/Button";

type Props = {
  SetSelectedOptions: (drillOptions: DrillOptions) => void;
}

type NoteDrillSelectionOptions = {
  minOctave?: number;
  maxOctave?: number;
  clef?: "treble" | "bass";
  timer?: number;
  accidentals?: boolean;
}

const NoteDrillOptionDefaults = {
  minOctave: 4,
  maxOctave: 5,
  clef: "treble",
  timer: 60,
  accidentals: false
} as NoteDrillSelectionOptions

export default function NoteDrillOptionsSelector({ SetSelectedOptions }: Props) {
  const [options, setOptions] = useState<NoteDrillSelectionOptions>(NoteDrillOptionDefaults);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: keyof NoteDrillSelectionOptions, value: string | number) => {
    const newOptions = {
      ...options
    }
    switch (key) {
      case "minOctave":
        newOptions.minOctave = Number(value)
        break;
      case "maxOctave":
        newOptions.maxOctave = Number(value)
        break;
      case "timer":
        newOptions.timer = Number(value)
        break;
      case "clef":
        newOptions.clef = value as "treble" | "bass"
        break;
      case "accidentals":
        newOptions.accidentals = (e.target as HTMLInputElement).checked
        break;
    }
    setOptions(newOptions);
  };

  const applyOptions = () => {
    SetSelectedOptions({
      minOctaveRange: options.minOctave,
      maxOctaveRange: options.maxOctave,
      timer: options.timer,
      allowAccidentals: options.accidentals,
      staffOptions: {
        clef: options.clef
      } as StaffOptions
    } as DrillOptions);
  }

  return (
    <div className={styles.NoteDrillOptionsSelectorWrapper}>
      <label>
        Clef
        <select id="clef" onChange={(e) => handleChange(e, "clef", e.target.value)}>
          <option value={"treble"}>Treble</option>
          <option value={"bass"}>Bass</option>
        </select>
      </label>
      <label>
        Minimum Octave Number
        <input id="minOctave" type="number" placeholder="0" defaultValue={options.minOctave} onChange={(e) => handleChange(e, "minOctave", e.target.value)} />
      </label>
      <label>
        Maximum Octave Number
        <input id="maxOctave" type="number" placeholder="7" defaultValue={options.maxOctave} onChange={(e) => handleChange(e, "maxOctave", e.target.value)} />
      </label>
      <label>
        Timer
        <input id="timer" type="number" placeholder="60" defaultValue={options.timer} onChange={(e) => handleChange(e, "timer", e.target.value)} />
      </label>
      <label>
        Accidentals
        <input id="accidentals" type="checkbox" checked={options.accidentals} onChange={(e) => handleChange(e, "accidentals", e.target.value)} />
      </label>
      <div className={styles.ApplyButtonContainer}>
        <Button variant="filled-primary" onClick={applyOptions}>Start Drill</Button>
      </div>
    </div>
  )
}
