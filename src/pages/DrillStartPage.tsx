import NoteDrill from "@/components/DrillComponents/NoteDrill/NoteDrill";
import styles from './DrillStartPage.module.css';
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import { useEffect } from "react";
import { useNoteDrillStore } from "@/store/noteDrillStore";
import { useNavigate } from "react-router-dom";
import { PianoAudioPlayer } from "@/helpers/PianoAudioPlayer";

export default function DrillStartPage() {
  const drillOptions = useNoteDrillStore((state) => state.drillOptions);
  const setDrillTime = useNoteDrillStore((state) => state.setDrillTime);
  const resetDrill = useNoteDrillStore((state) => state.resetDrill);
  const resetDrillOptions = useNoteDrillStore((state) => state.resetDrillOptions);
  const setTimeSinceLastCorrectNote = useNoteDrillStore((state) => state.setTimeSinceLastCorrectNote);

  const navigate = useNavigate();

  function handleBackButtonPressed() {
    resetDrillOptions();
    navigate("/");
    return;
  }

  useEffect(() => {
    if (!drillOptions) {
      navigate("/");
      return;
    };

    resetDrill();
    setDrillTime(drillOptions.timer ? drillOptions.timer : 10);
    setTimeSinceLastCorrectNote(Date.now());

    // Start up the singleton PianoAudioPlayer by loading samples
    PianoAudioPlayer.loadAllSamples();

  }, []);

  if (!drillOptions) {
    return;
  };

  return (
    <div className={styles.DrillStartWrapper}>
      <div className="size-wrapper">
        <BackButtonContainer onBack={handleBackButtonPressed} />
        <NoteDrill />
      </div>
    </div>
  );
}
