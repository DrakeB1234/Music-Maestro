import { useEffect, useState } from "react";
import { useMidiInput } from "./hooks/useMidiInput"
import MidiInputDetection from "./components/MidiInputDetection/MidiInputDetection";
import StaffGeneration from "./components/StaffGeneration/StaffGeneration";

function App() {

  const [lastNotePlayed, setLastNotePlayed] = useState("");

  const handleNotePlayed = (note: string) => {
    setLastNotePlayed(note);
  };

  // 👇 Hook handles connecting, listening, cleanup
  const { connect, isConnected, error } = useMidiInput(handleNotePlayed);

  useEffect(() => {
    connect();
  }, [])

  return (
    <>
      <MidiInputDetection isConnected={isConnected} errorMessage={error} />
      <StaffGeneration currentNote={lastNotePlayed} />
      <h3>Note Played: {lastNotePlayed}</h3>
      <button onClick={() => setLastNotePlayed("c/5")}>Change Note to c/5</button>
    </>
  )
}

export default App
