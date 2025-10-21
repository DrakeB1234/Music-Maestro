import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { DrillOptions } from "@/types/DrillOptionTypes";
import { defaultDrillPresetsData } from "@/data/NoteDrillPresets";
import NoteDrill from "@/components/NoteDrillComponents/NoteDrill/NoteDrill";

export default function DrillStart() {
  const navigate = useNavigate();
  const location = useLocation();
  const paramOptions = location.state as
    | { type: "preset"; id: string }
    | { type: "custom"; options: DrillOptions }
    | undefined;

  const [drillOptions, setDrillOptions] = useState<DrillOptions | null>(null);

  function Init() {
    if (!paramOptions) {
      navigate("/");
      return;
    }

    let options: DrillOptions | null = null;

    if (paramOptions.type === "preset") {
      const preset = defaultDrillPresetsData.find(e => e.id === paramOptions.id);
      options = preset ? preset.drillOptions : null;
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

  if (!paramOptions) return <p>No drill data provided.</p>;

  return (
    <div className="size-wrapper">
      <h1>Starting Drill...</h1>
      {paramOptions.type === "preset" &&
        <div>
          <p>Preset drill ID: {paramOptions.id}</p>
          <pre>{JSON.stringify(drillOptions, null, 2)}</pre>
        </div>
      }
      {paramOptions.type === "custom" && <pre>{JSON.stringify(paramOptions.options, null, 2)}</pre>}
      {drillOptions && <NoteDrill drillOptions={drillOptions} HandleQuit={HandleQuit} />}
    </div>
  );
}
