import { useEffect, useState } from "react";
import { defaultDrillPresetsData } from "@data/NoteDrillPresets";
import type { DrillOptions, DrillPreset } from "@/types/DrillOptionTypes";
import styles from './NoteDrillPresetsSelector.module.css';

type Props = {
  optionsRef: React.RefObject<DrillOptions | null>;
}

export default function NoteDrillPresetselector({ optionsRef }: Props) {

  const [availablePresets, SetAvailablePresets] = useState<DrillPreset[] | null>(null);
  const [selectedPresetId, SetSelectedPresetId] = useState<string | null>(null);

  function HandlePresetselect(PresetsId: string) {
    SetSelectedPresetId(PresetsId)

    const Presets = availablePresets?.find(e => e.id === PresetsId);
    if (!Presets) return;

    optionsRef.current = Presets.drillOptions;
  }

  useEffect(() => {
    const defaultPresetsData = defaultDrillPresetsData as DrillPreset[];
    SetAvailablePresets(defaultPresetsData);

  }, []);

  return (
    <div>
      <h3>Selector</h3>
      {availablePresets ?
        <div className={styles.PresetsItemsWrapper}>
          {availablePresets.map((e) => (
            <div key={e.id} onClick={() => HandlePresetselect(e.id)}
              className={`${styles.PresetsItemContainer} ${selectedPresetId == e.id ? styles.selected : ''}`}
            >
              <h3>{e.name}</h3>
            </div>
          ))}
        </div> :
        <div>
          <h3>No Presets Found!</h3>
        </div>
      }
    </div>
  )
}
