import { useMidiProvider } from "@/context/MidiProvider";
import { defaultDrillOptions, type DrillOptions, type DrillKind } from "@/types/DrillOptionTypes";
import { useRef, useState } from "react";
import styles from './NoteDrillPage.module.css';
import Button from "@/components/UIComponents/Button";
import NoteDrillOptionsSelector from "@/components/NoteDrillOptionsSelector/NoteDrillOptionsSelector";
import NoteDrillPresetSelector from "@/components/NoteDrillPresetsSelection/NoteDrillPresetsSelector";
import NoteDrill from "@/components/NoteDrill/NoteDrill";

// Null represents nothing selected, so show default
type SelectedOptionsComponent = "DrillOptions" | "DrillPreset" | "Default"

export default function NoteDrillPage() {

  // 
  // Custom Options are manually set options from the user. The alternative to this is Preset options. Which are
  // options that are set by Preset data. Options mode is used to determine where the options was retrieved from
  // so that further processing can be made depending on what is set.
  //  

  const [selectedCustomOptions, SetSelectedDrillOptions] = useState<DrillOptions>(
    structuredClone(defaultDrillOptions)
  );

  const [toggleSelectedOptions, SetToggleSelectedOptions] = useState<SelectedOptionsComponent>("Default");
  const [toggleStartDrill, SetToggleStartDrill] = useState<Boolean>(false);

  const selectedPresetOptions = useRef<DrillOptions | null>(null);
  const optionsMode = useRef<DrillKind>("custom");
  const drillOptions = useRef<DrillOptions>({} as DrillOptions);

  const { ClearInput: ClearMidiInput } = useMidiProvider();

  const HandleDrillStartCustomOptions = () => {
    ClearMidiInput();
    drillOptions.current = selectedCustomOptions;
    optionsMode.current = "custom";
    SetToggleStartDrill(true);
  }

  const HandleDrillStartPresetOptions = () => {
    if (!selectedPresetOptions.current) return;
    ClearMidiInput();
    drillOptions.current = selectedPresetOptions.current;
    optionsMode.current = "preset";
    SetToggleStartDrill(true);
  }

  const HandleDrillQuit = () => {
    SetToggleStartDrill(false);
    SetToggleSelectedOptions("Default");
  }

  return (
    <div className={styles.NoteDrillPageWrapper}>
      <>
        {!toggleStartDrill ?
          toggleSelectedOptions === "DrillOptions" ?
            <DrillSelectionWrapper onBack={() => SetToggleSelectedOptions("Default")} onStart={HandleDrillStartCustomOptions}>
              <NoteDrillOptionsSelector SetSelectedOptions={SetSelectedDrillOptions} currentOptions={selectedCustomOptions} />
            </DrillSelectionWrapper>
            : toggleSelectedOptions === "DrillPreset" ?
              <DrillSelectionWrapper onBack={() => SetToggleSelectedOptions("Default")} onStart={HandleDrillStartPresetOptions}>
                <NoteDrillPresetSelector optionsRef={selectedPresetOptions} />
              </DrillSelectionWrapper>
              :
              <div className={styles.SelectorsParent}>
                <div className={styles.SelectorsWrapper}>
                  <div className={styles.SelectorContainer} onClick={() => SetToggleSelectedOptions("DrillPreset")}>
                    <h3>Preset</h3>
                    <h3>Use preset options to test your skills</h3>
                    <h3>Tracks progress</h3>
                  </div>
                  <div className={styles.SelectorContainer} onClick={() => SetToggleSelectedOptions("DrillOptions")}>
                    <h3>Custom Options</h3>
                    <h3>Quickly customize options for your drill</h3>
                    <h3>Does not track progress</h3>
                  </div>
                </div>
                <div className={styles.StartDrillContainer}>
                  <Button text="Quick Start Drill" onClick={HandleDrillStartCustomOptions} />
                  <h3>*Uses last used drill options</h3>
                </div>
              </div>
          :
          <NoteDrill drillOptions={drillOptions.current} HandleQuit={HandleDrillQuit} />
        }
      </>
    </div>
  )
}

interface DrillSelectionWrapperProps {
  onBack: () => void
  children: React.ReactNode;
  onStart: () => void
}

function DrillSelectionWrapper({ children, onBack, onStart }: DrillSelectionWrapperProps) {
  return (
    <div className={styles.DrillSelectionWrapper}>
      <Button variant="outlined" text="Back" onClick={onBack} />
      {children}
      <Button text="Drill Start" onClick={onStart} />
    </div>
  );
}