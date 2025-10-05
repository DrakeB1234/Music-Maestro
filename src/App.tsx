import { useEffect } from "react";
import { useMidiInput } from "./hooks/useMidiInput"
import MidiInputDetection from "./components/MidiInputDetection/MidiInputDetection";
import NoteDrill from "./components/NoteDrill/NoteDrill";

function App() {

  // 👇 Hook handles connecting, listening, cleanup
  const { ConnectDevice, isConnected, error, lastNotePlayed } = useMidiInput();

  useEffect(() => {
    ConnectDevice();
  }, [])

  return (
    <>
      <MidiInputDetection isConnected={isConnected} errorMessage={error} connectionfunc={ConnectDevice} />
      <NoteDrill midiNotePlayed={lastNotePlayed} />
    </>
  )
}

export default App
