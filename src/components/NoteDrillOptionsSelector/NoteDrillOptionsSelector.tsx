import type { DrillOptions, StaffOptions } from "@customtypes/DrillOptions";
import { useState } from "react";

type Props = {
  SetSelectedOptions: (drillOptions: DrillOptions) => void;
}

type NoteDrillSelectionOptions = {
  minOctave?: number;
  maxOctave?: number;
  clef?: "treble" | "bass";
}

export default function NoteDrillOptionsSelector({ SetSelectedOptions }: Props) {
  const [options, setOptions] = useState<NoteDrillSelectionOptions>({});

  const handleChange = (key: keyof NoteDrillSelectionOptions, value: string | number) => {
    const newOptions = {
      ...options,
      [key]: key === "clef" ? value : Number(value),
    };
    setOptions(newOptions);
  };

  const applyOptions = () => {
    SetSelectedOptions({
      minOctaveRange: options.minOctave,
      maxOctaveRange: options.maxOctave,
      staffOptions: {
        clef: options.clef
      } as StaffOptions
    } as DrillOptions);
  }

  return (
    <div>
      <label>
        Clef
        <select id="clef" onChange={(e) => handleChange("clef", e.target.value)}>
          <option value={"treble"}>Treble</option>
          <option value={"bass"}>Bass</option>
        </select>
      </label>
      <label>
        Minimum Octave Number
        <input id="minOctave" type="number" placeholder="2" onChange={(e) => handleChange("minOctave", e.target.value)} />
      </label>
      <label>
        Maximum Octave Number
        <input id="maxOctave" type="number" placeholder="7" onChange={(e) => handleChange("maxOctave", e.target.value)} />
      </label>
      <button onClick={applyOptions}>Apply</button>
    </div>
  )
}
