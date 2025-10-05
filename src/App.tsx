import { useState } from "react";
import { useMidiInput } from "./hooks/useMidiInput"
import MidiInputDetection from "./components/MidiInputDetection/MidiInputDetection";
import NoteDrill from "./components/NoteDrill/NoteDrill";
import NoteDrillOptionsSelector from "./components/NoteDrillOptionsSelector/NoteDrillOptionsSelector";
import type { DrillOptions } from "./types/DrillOptions";

function App() {
  // 👇 Hook handles connecting, listening, cleanup
  const { ConnectDevice, isConnected, error, fullError, lastNotePlayed } = useMidiInput();
  const [selectedDrillOptions, setSelectedDrillOptions] = useState<DrillOptions>({} as DrillOptions);

  const handleSelectedDrillOptions = (options: DrillOptions) => {
    setSelectedDrillOptions(options);
  }

  return (
    <>
      <MidiInputDetection isConnected={isConnected} errorMessage={error} fullError={fullError} connectionfunc={ConnectDevice} />
      <NoteDrillOptionsSelector SetSelectedOptions={handleSelectedDrillOptions} />
      <NoteDrill midiNotePlayed={lastNotePlayed} drillOptions={selectedDrillOptions} />
    </>
  )
}

export default App
