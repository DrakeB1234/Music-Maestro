import { useState } from "react";
import styles from './DrillPage.module.css';
import Card from "@/components/UIComponents/Card";
import Button from "@/components/UIComponents/Button";
import IconWrapper from "@/components/UIComponents/IconWrapper";
import { QueueMusicIcon, TuneIcon } from "@/components/Icons/Icons";
import PresetDrills from "@/components/NoteDrillComponents/PresetDrillCard/PresetDrills";

// Null represents nothing selected, so show default
type ActiveComponent = "main" | "preset" | "custom"

export default function DrillPage() {

  const [activeComponent, setActiveComponent] = useState<ActiveComponent>("main");
  const togglePresetComponent = () => setActiveComponent("preset");
  const toggleCustomComponent = () => setActiveComponent("custom");
  const backToMain = () => setActiveComponent("main");

  return (
    <div className={styles.NoteDrillPageWrapper}>
      <div className="size-wrapper">
        {activeComponent === "main" && (
          <MainComponent
            togglePresetComponent={togglePresetComponent}
            toggleCustomComponent={toggleCustomComponent}
          />
        )}
        {activeComponent === "preset" && <PresetDrills onBack={backToMain} />}
        {activeComponent === "custom" && <h1>Custom</h1>}

      </div>
    </div>
  )
}

interface MainComponentProps {
  togglePresetComponent?: () => void;
  toggleCustomComponent?: () => void;
}

function MainComponent({
  togglePresetComponent,
  toggleCustomComponent
}: MainComponentProps) {
  return (
    <>
      <div className={styles.HeaderContainer}>
        <h1>Drill Practice</h1>
      </div>
      <div className={styles.CardContainer}>
        <Card onClick={togglePresetComponent} padding="none">
          <div className={styles.CardContent}>
            <div className={styles.IconContainer}>
              <IconWrapper icon={<QueueMusicIcon />} />
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
        <Card onClick={toggleCustomComponent} padding="none">
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
    </>
  );
}