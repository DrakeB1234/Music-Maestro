import { Route, Routes } from "react-router-dom";
import NoteDrillPage from "./pages/NoteDrillPage";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { useMidiProvider } from "./context/MidiProvider";

function App() {

  const { ConnectDevice } = useMidiProvider();

  // Attempt Midi Device connection on app startup
  useEffect(() => {
    ConnectDevice();
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<NoteDrillPage />} />
      </Routes>
    </>
  )
}

export default App
