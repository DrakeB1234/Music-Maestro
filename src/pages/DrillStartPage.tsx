import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { DrillOptions } from "@/types/DrillTypes";
import { defaultDrillPresetsData } from "@/data/NoteDrillPresets";
import NoteDrill from "@/components/DrillComponents/NoteDrill/NoteDrill";
import { useMidiInput } from "@/hooks/useMidiInput";
import styles from './DrillStartPage.module.css';
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";

export default function DrillStart() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ClearInput: ClearMidiInput } = useMidiInput();

  const paramOptions = location.state as
    | { type: "preset"; id: string }
    | { type: "custom"; options: DrillOptions }
    | undefined;

  const [drillOptions, setDrillOptions] = useState<DrillOptions | null>(null);

  function Init() {
    ClearMidiInput();
    if (!paramOptions) {
      navigate("/");
      return;
    }

    let options: DrillOptions | null = null;

    if (paramOptions.type === "preset") {
      const preset = defaultDrillPresetsData.find(e => e.id === paramOptions.id);
      options = preset ? preset.drillOptions : null;
    }
    if (paramOptions.type === "custom") {
      options = paramOptions.options;
    }

    if (!options) {
      console.error("Failed to start drill. No drill options found.");
      navigate("/");
      return;
    }

    setDrillOptions(options);
  }

  function HandleQuit() {
    navigate("/");
  }

  useEffect(() => {
    Init();
  }, []);

  if (!paramOptions) return;

  return (
    <div className={styles.DrillStartWrapper}>
      <div className="size-wrapper">
        <BackButtonContainer onBack={HandleQuit} />
        {drillOptions && <NoteDrill drillOptions={drillOptions} HandleQuit={HandleQuit} />}
      </div>
    </div>
  );
}
