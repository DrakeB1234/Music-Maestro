import NoteButtonInput from "@/components/NoteButtonInput/NoteButtonInput";
import NoteDrill from "@/components/NoteDrill/NoteDrill";
import NoteDrillOptionsSelector from "@/components/NoteDrillOptionsSelector/NoteDrillOptionsSelector";
import { useMidiProvider } from "@/context/MidiProvider";
import type { GenericNote } from "@/helpers/NoteHelpers";
import type { DrillOptions } from "@/types/DrillOptions";
import { useState } from "react";

export default function NoteDrillPage() {
  const { lastNotePlayed: lastMidiNotePlayed, ClearInput: ClearMidiInput } = useMidiProvider();
  const [selectedDrillOptions, setSelectedDrillOptions] = useState<DrillOptions>({} as DrillOptions);
  const [drillStart, setDrillStart] = useState(false);
  const [lastButtonNotePlayed, SetLastButtonNotePlayed] = useState<GenericNote | null>(null);

  // Once Drill Options set, start drill
  const handleSelectedDrillOptions = (options: DrillOptions) => {
    setSelectedDrillOptions(options);
    ClearMidiInput();
    setDrillStart(true);
  }

  const HandleDrillQuit = () => {
    setDrillStart(false);
  }

  return (
    <div>
      {drillStart ?
        <>
          <NoteDrill
            midiNotePlayed={lastMidiNotePlayed}
            buttonNotePlayed={lastButtonNotePlayed}
            drillOptions={selectedDrillOptions}
            HandleQuit={HandleDrillQuit}
            forceTimerStop={false}
          />
          <NoteButtonInput NotePressed={SetLastButtonNotePlayed} />
        </> :
        <NoteDrillOptionsSelector SetSelectedOptions={handleSelectedDrillOptions} />
      }
    </div>
  )
}
