import NoteButtonInput from "@/components/NoteButtonInput/NoteButtonInput";
import NoteDrill from "@/components/NoteDrill/NoteDrill";
import NoteDrillOptionsSelector from "@/components/NoteDrillOptionsSelector/NoteDrillOptionsSelector";
import { useMidiProvider } from "@/context/MidiProvider";
import type { GenericNote } from "@/helpers/NoteHelpers";
import type { DrillOptions } from "@/types/DrillOptions";
import { useState } from "react";

export default function NoteDrillPage() {
  const { lastNotePlayed: lastMidiNotePlayed } = useMidiProvider();
  const [selectedDrillOptions, setSelectedDrillOptions] = useState<DrillOptions>({} as DrillOptions);
  const [drillStart, setDrillStart] = useState(false);
  const [lastButtonNotePlayed, setLastButtonNotePlayed] = useState<GenericNote | null>(null);

  const handleSelectedDrillOptions = (options: DrillOptions) => {
    setSelectedDrillOptions(options);
    setDrillStart(true);
  }

  const handleDrillQuit = () => {
    setDrillStart(false);
  }

  return (
    <div>
      {drillStart ?
        <>
          <NoteDrill midiNotePlayed={lastMidiNotePlayed} buttonNotePlayed={lastButtonNotePlayed} drillOptions={selectedDrillOptions} handleQuit={handleDrillQuit} forceTimerStop={false} />
          <NoteButtonInput NotePressed={setLastButtonNotePlayed} />
        </> :
        <NoteDrillOptionsSelector SetSelectedOptions={handleSelectedDrillOptions} />
      }
    </div>
  )
}
