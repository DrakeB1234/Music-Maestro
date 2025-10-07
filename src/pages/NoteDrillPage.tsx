import NoteDrill from "@/components/NoteDrill/NoteDrill";
import NoteDrillOptionsSelector from "@/components/NoteDrillOptionsSelector/NoteDrillOptionsSelector";
import { useMidiInput } from "@/hooks/useMidiInput";
import type { DrillOptions } from "@/types/DrillOptions";
import { useState } from "react";

export default function NoteDrillPage() {
  const { lastNotePlayed } = useMidiInput();
  const [selectedDrillOptions, setSelectedDrillOptions] = useState<DrillOptions>({} as DrillOptions);
  const [drillStart, setDrillStart] = useState(false);

  const handleSelectedDrillOptions = (options: DrillOptions) => {
    setSelectedDrillOptions(options);

    setDrillStart(true);
  }

  return (
    <div>
      {drillStart ?
        <NoteDrill midiNotePlayed={lastNotePlayed} drillOptions={selectedDrillOptions} /> :
        <NoteDrillOptionsSelector SetSelectedOptions={handleSelectedDrillOptions} />
      }
    </div>
  )
}
