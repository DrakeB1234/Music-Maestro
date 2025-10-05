import { useEffect, useState } from "react";
import { useMidiInput } from "./hooks/useMidiInput"
import MidiInputDetection from "./components/MidiInputDetection/MidiInputDetection";
import NoteDrill from "./components/NoteDrill/NoteDrill";
import NoteDrillOptionsSelector from "./components/NoteDrillOptionsSelector/NoteDrillOptionsSelector";
import type { DrillOptions } from "./types/DrillOptions";
import { GenericNote } from "./helpers/NoteHelpers";

function App() {
  // 👇 Hook handles connecting, listening, cleanup
  const { ConnectDevice, isConnected, error, lastNotePlayed } = useMidiInput();
  const [selectedDrillOptions, setSelectedDrillOptions] = useState<DrillOptions>({
    minOctaveRange: 4,
    maxOctaveRange: 5,
    allowAccidentals: false,
    overrideAllowedNotes: [
      new GenericNote("c", null, 4),
      new GenericNote("g", null, 4),
      new GenericNote("c", null, 5),
      new GenericNote("g", null, 5),
      new GenericNote("c", null, 6),
    ],
    staffOptions: {
      clef: "treble"
    }
  } as DrillOptions);

  const handleSelectedDrillOptions = (options: DrillOptions) => {
    setSelectedDrillOptions(options);
  }

  useEffect(() => {
    ConnectDevice();
  }, []);

  return (
    <>
      <MidiInputDetection isConnected={isConnected} errorMessage={error} connectionfunc={ConnectDevice} />
      <NoteDrillOptionsSelector SetSelectedOptions={handleSelectedDrillOptions} />
      <NoteDrill midiNotePlayed={lastNotePlayed} drillOptions={selectedDrillOptions} />
    </>
  )
}

export default App
