import styles from './NoteDrillOptionsSelector.module.css';
import Button from "../UIComponents/Button";
import { defaultDrillOptions, type DrillOptions } from "@/types/DrillOptions";

type Props = {
  SetSelectedOptions: React.Dispatch<React.SetStateAction<DrillOptions>>;
  currentOptions: DrillOptions
}

export default function NoteDrillOptionsSelector({ SetSelectedOptions, currentOptions }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string, value: string | number) => {
    const newOptions = {
      ...currentOptions
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
        newOptions.staffOptions.clef = value as "treble" | "bass"
        break;
      case "accidentals":
        newOptions.allowAccidentals = (e.target as HTMLInputElement).checked
        break;
    }
    SetSelectedOptions(newOptions);
  };

  const ResetOptions = () => {
    SetSelectedOptions({
      ...defaultDrillOptions,
      staffOptions: { ...defaultDrillOptions.staffOptions },
    });
  }

  return (
    <div className={styles.NoteDrillOptionsSelectorWrapper}>
      <label>
        Clef
        <select id="clef" value={currentOptions.staffOptions.clef} onChange={(e) => handleChange(e, "clef", e.target.value)}>
          <option value={"treble"}>Treble</option>
          <option value={"bass"}>Bass</option>
        </select>
      </label>
      <label>
        Minimum Octave Number
        <input id="minOctave" type="number" placeholder="0" value={currentOptions.minOctave} onChange={(e) => handleChange(e, "minOctave", e.target.value)} />
      </label>
      <label>
        Maximum Octave Number
        <input id="maxOctave" type="number" placeholder="7" value={currentOptions.maxOctave} onChange={(e) => handleChange(e, "maxOctave", e.target.value)} />
      </label>
      <label>
        Timer
        <input id="timer" type="number" placeholder="60" value={currentOptions.timer} onChange={(e) => handleChange(e, "timer", e.target.value)} />
      </label>
      <label>
        Accidentals
        <input id="accidentals" type="checkbox" checked={currentOptions.allowAccidentals} onChange={(e) => handleChange(e, "accidentals", e.target.value)} />
      </label>
      <div className={styles.ResetOptionsButtonContainer}>
        <Button variant="filled-primary" onClick={ResetOptions}>Reset Options</Button>
      </div>
    </div>
  )
}
