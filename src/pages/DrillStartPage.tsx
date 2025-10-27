import NoteDrill from "@/components/DrillComponents/NoteDrill/NoteDrill";
import styles from './DrillStartPage.module.css';
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import { useEffect } from "react";
import { useNoteDrillStore } from "@/store/noteDrillStore";
import { defaultDrillPresetsData } from "@/data/NoteDrillPresets";
import type { DrillOptions } from "@/types/DrillTypes";
import { useLocation, useNavigate } from "react-router-dom";

export default function DrillStartPage() {
  const setDrillTime = useNoteDrillStore((state) => state.setDrillTime);
  const setDrillOptions = useNoteDrillStore((state) => state.setDrillOptions);
  const resetDrill = useNoteDrillStore((state) => state.reset);
  const navigate = useNavigate();
  const location = useLocation();

  const paramOptions = location.state as
    | { type: "preset"; id: string }
    | { type: "custom"; options: DrillOptions }
    | undefined;

  function handleBackButtonPressed() {
    navigate("/");
    return;
  }

  useEffect(() => {
    const handleProperDrillStart = (options: DrillOptions) => {
      resetDrill();
      setDrillOptions(options);
      setDrillTime(options.timer ? options.timer : 0);
    }

    if (!paramOptions) {
      console.warn("Failed to start drill. No drill options found.");
      navigate("/");
      return;
    }
    if (paramOptions.type === "preset") {
      const preset = defaultDrillPresetsData.find(e => e.id === paramOptions.id);
      if (preset) {
        handleProperDrillStart(preset.drillOptions);
      }
    }
    else if (paramOptions.type === "custom") {
      handleProperDrillStart(paramOptions.options);
    }
    else {
      console.warn("Failed to start drill.");
      navigate("/");
      return;
    }
  }, [paramOptions, navigate]);

  return (
    <div className={styles.DrillStartWrapper}>
      <div className="size-wrapper">
        <BackButtonContainer onBack={handleBackButtonPressed} />
        <NoteDrill />
      </div>
    </div>
  );
}
