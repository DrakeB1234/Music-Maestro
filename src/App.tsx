import { Route, Routes } from "react-router-dom";
import NoteDrillPage from "./pages/NoteDrillPage";
import Navbar from "./components/Navbar/Navbar";

function App() {

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
