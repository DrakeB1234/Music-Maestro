import type { DrillOptions, StaffOptions } from "@customtypes/DrillOptions";
import { useState } from "react";
import styles from './NoteDrillOptionsSelector.module.css';

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

export default function NoteDrillOptionsSelector({ SetSelectedOptions }: Props) {
  const [options, setOptions] = useState<NoteDrillSelectionOptions>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: keyof NoteDrillSelectionOptions, value: string | number) => {
    const checked = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    const newOptions = {
      ...options,
      [key]: key === "clef" ? value : Number(value),
      [key]: key === "accidentals" ? checked : Number(value),
    };
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
        <input id="minOctave" type="number" placeholder="2" onChange={(e) => handleChange(e, "minOctave", e.target.value)} />
      </label>
      <label>
        Maximum Octave Number
        <input id="maxOctave" type="number" placeholder="7" onChange={(e) => handleChange(e, "maxOctave", e.target.value)} />
      </label>
      <label>
        Timer
        <input id="timer" type="number" placeholder="1" onChange={(e) => handleChange(e, "timer", e.target.value)} />
      </label>
      <label>
        Accidentals
        <input id="accidentals" type="checkbox" placeholder="false" onChange={(e) => handleChange(e, "accidentals", e.target.value)} />
      </label>
      <button onClick={applyOptions}>Apply</button>
    </div>
  )
}
