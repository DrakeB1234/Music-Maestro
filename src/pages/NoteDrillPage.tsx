import { useMidiProvider } from "@/context/MidiProvider";
import { defaultDrillOptions, type DrillProfile } from "@/types/DrillOptions";
import { useState } from "react";
import styles from './NoteDrillPage.module.css';
import Button from "@/components/UIComponents/Button";
import NoteDrillOptionsSelector from "@/components/NoteDrillOptionsSelector/NoteDrillOptionsSelector";
import NoteDrillProfileSelector from "@/components/NoteDrillProfileSelection/NoteDrillProfileSelector";
import NoteDrill from "@/components/NoteDrill/NoteDrill";

// Null represents nothing selected, so show default
type SelectedOptionsComponent = "DrillOptions" | "DrillProfile" | "Default"

export default function NoteDrillPage() {
  const { ClearInput: ClearMidiInput } = useMidiProvider();
  const [selectedDrillOptions, SetSelectedDrillOptions] = useState(
    structuredClone(defaultDrillOptions)
  );
  const [selectedDrillProfile, SetSelectedDrillProfile] = useState<DrillProfile | null>(null);

  // Toggle Components
  const [toggleSelectedOptions, SetToggleSelectedOptions] = useState<SelectedOptionsComponent>("Default");
  const [toggleStartDrill, SetToggleStartDrill] = useState<Boolean>(false);

  const HandleDrillQuit = () => {
    SetToggleStartDrill(false);
    SetToggleSelectedOptions("Default");
  }

  return (
    <div className={styles.NoteDrillPageWrapper}>
      <>
        {!toggleStartDrill ?
          toggleSelectedOptions === "DrillOptions" ?
            <DrillSelectionWrapper onBack={() => SetToggleSelectedOptions("Default")} onStart={() => SetToggleStartDrill(true)}>
              <NoteDrillOptionsSelector SetSelectedOptions={SetSelectedDrillOptions} currentOptions={selectedDrillOptions} />
            </DrillSelectionWrapper>
            : toggleSelectedOptions === "DrillProfile" ?
              <DrillSelectionWrapper onBack={() => SetToggleSelectedOptions("Default")} onStart={() => SetToggleStartDrill(true)}>
                <NoteDrillProfileSelector profileSelected={SetSelectedDrillProfile} />
              </DrillSelectionWrapper>
              :
              <div className={styles.SelectorsParent}>
                <div className={styles.SelectorsWrapper}>
                  <div className={styles.SelectorContainer} onClick={() => SetToggleSelectedOptions("DrillProfile")}>
                    <h3>Profile</h3>
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
                  <Button variant="filled-primary" onClick={() => SetToggleStartDrill(true)}>Quick Start Drill</Button>
                  <h3>*Uses last used drill options</h3>
                </div>
              </div>
          :
          <NoteDrill drillOptions={selectedDrillOptions} HandleQuit={HandleDrillQuit} />
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
      <Button onClick={onBack}>Back</Button>
      {children}
      <Button variant="filled-primary" onClick={onStart}>Start Drill</Button>
    </div>
  );
}