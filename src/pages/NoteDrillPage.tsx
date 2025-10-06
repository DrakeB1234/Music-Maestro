import MidiInputDetection from "@/components/MidiDeviceSelection/MidiDeviceSelection";
import NoteDrill from "@/components/NoteDrill/NoteDrill";
import NoteDrillOptionsSelector from "@/components/NoteDrillOptionsSelector/NoteDrillOptionsSelector";
import { useMidiInput } from "@/hooks/useMidiInput";
import type { DrillOptions } from "@/types/DrillOptions";
import { useState } from "react";

export default function NoteDrillPage() {
  // 👇 Hook handles connecting, listening, cleanup
  const { ConnectDevice, isConnected, error, fullError, lastNotePlayed } = useMidiInput();
  const [selectedDrillOptions, setSelectedDrillOptions] = useState<DrillOptions>({} as DrillOptions);

  const handleSelectedDrillOptions = (options: DrillOptions) => {
    setSelectedDrillOptions(options);
  }

  return (
    <div>
      <MidiInputDetection isConnected={isConnected} errorMessage={error} fullError={fullError} connectionfunc={ConnectDevice} />
      <NoteDrillOptionsSelector SetSelectedOptions={handleSelectedDrillOptions} />
      <NoteDrill midiNotePlayed={lastNotePlayed} drillOptions={selectedDrillOptions} />
    </div>
  )
}
