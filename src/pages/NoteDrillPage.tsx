import { useMidiProvider } from "@/context/MidiProvider";
import { defaultDrillOptions, type DrillOptions, type DrillKind } from "@/types/DrillOptionTypes";
import { useRef, useState } from "react";
import styles from './NoteDrillPage.module.css';
import Card from "@/components/UIComponents/Card";
import Button from "@/components/UIComponents/Button";
import IconWrapper from "@/components/UIComponents/IconWrapper";
import { LyricsIcon, TuneIcon } from "@/components/Icons/Icons";

// Null represents nothing selected, so show default
type SelectedOptionsComponent = "DrillOptions" | "DrillPreset" | "Default"

export default function NoteDrillPage() {

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
      <div className={styles.SizeWrapper}>
        <div className={styles.HeaderContainer}>
          <h1 className="heading-secondary">Drill Practice</h1>
        </div>
        <div className={styles.CardWrapper}>
          <Card onClick={() => console.log("hello")} padding="none">
            <div className={styles.CardContent}>
              <div className={styles.IconContainer}>
                <IconWrapper icon={<LyricsIcon />} />
              </div>
              <div className={styles.TextContainer}>
                <h2 className="heading">Preset Drills</h2>
                <p className={`caption`}>Practice with designed exercises covering rhythm patterns, note reading, and intervals</p>
              </div>
              <div className={styles.ButtonContainer}>
                <Button variant="contained" text="Start Practice" fullWidth={true} />
              </div>
            </div>
          </Card>
          <Card onClick={() => console.log("hello")} padding="none">
            <div className={styles.CardContent}>
              <div className={styles.IconContainer}>
                <IconWrapper icon={<TuneIcon />} />
              </div>
              <div className={styles.TextContainer}>
                <h2 className="heading">Custom Drill</h2>
                <p className={`caption`}>Create your own personalized exercises tailored to your specific learning goals</p>
              </div>
              <div className={styles.ButtonContainer}>
                <Button variant="contained" text="Create Drill" fullWidth={true} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}