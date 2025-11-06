import NoteDrill from "@/components/DrillComponents/NoteDrill/NoteDrill";
import styles from './DrillStartPage.module.css';
import { useEffect } from "react";
import { useNoteDrillStore } from "@/store/noteDrillStore";
import { useNavigate } from "react-router-dom";
import { PianoAudioPlayer } from "@/helpers/PianoAudioPlayer";
import { useAppPreferences } from "@/hooks/useAppPreferences";

export default function DrillStartPage() {
  const { prefs } = useAppPreferences();
  const drillOptions = useNoteDrillStore((state) => state.drillOptions);
  const setDrillTime = useNoteDrillStore((state) => state.setDrillTime);
  const setIsDrillStarted = useNoteDrillStore((state) => state.setIsDrillStarted);
  const resetDrill = useNoteDrillStore((state) => state.resetDrill);
  const setTimeSinceLastCorrectNote = useNoteDrillStore((state) => state.setTimeSinceLastCorrectNote);

  const navigate = useNavigate();

  useEffect(() => {
    if (!drillOptions) {
      navigate("/");
      return;
    };

    resetDrill();
    setDrillTime(drillOptions.timer ? drillOptions.timer : 10);
    setIsDrillStarted(true);
    setTimeSinceLastCorrectNote(Date.now());

    if (prefs.midiPlaybackEnabled)
      if (prefs.midiPlaybackEnabled && prefs.midiPlaybackVolume) {
        PianoAudioPlayer.applyPreferences({
          playbackEnabled: prefs.midiPlaybackEnabled,
          volume: prefs.midiPlaybackVolume
        });
        PianoAudioPlayer.loadAllSamples();
      }

  }, [drillOptions]);

  if (!drillOptions) {
    return;
  };

  return (
    <div className={styles.DrillStartWrapper}>
      <div className="size-wrapper">
        <NoteDrill />
      </div>
    </div>
  );
}
