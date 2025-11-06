import { useState } from "react";
import styles from './DrillPage.module.css';
import Card from "@/components/UIComponents/Card";
import Button from "@/components/UIComponents/Button";
import IconWrapper from "@/components/UIComponents/IconWrapper";
import { DialPadIcon, MIDIIcon, PianoIcon, QueueMusicIcon, StatusIcon, TuneIcon } from "@/components/Icons/Icons";
import PresetDrills from "@/components/DrillComponents/PresetDrills/PresetDrills";
import CustomDrills from "@/components/DrillComponents/CustomDrills/CustomDrills";
import { useAppPreferences } from "@/hooks/useAppPreferences";
import { useNoteInputStore } from "@/store/noteInputStore";
import { useNavigate } from "react-router-dom";
import { CONFIG_ROUTE_PARAMS } from "./ConfigPage";

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
        {activeComponent === "custom" && <CustomDrills onBack={backToMain} />}

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
      <ShowCurrentDevice />
      <div className={styles.CardContainer}>
        <Card onClick={togglePresetComponent}>
          <div className={styles.CardContent}>
            <div className={styles.IconContainer}>
              <IconWrapper icon={<QueueMusicIcon />} />
            </div>
            <div className={styles.TextContainer}>
              <h2 className="heading">Preset Drills</h2>
              <p className={`caption-secondary`}>Practice with designed exercises covering rhythm patterns, note reading, and intervals</p>
            </div>
            <div className={styles.ButtonContainer}>
              <Button variant="contained" text="Start Practice" fullWidth={true} />
            </div>
          </div>
        </Card>
        <Card onClick={toggleCustomComponent}>
          <div className={styles.CardContent}>
            <div className={styles.IconContainer}>
              <IconWrapper icon={<TuneIcon />} />
            </div>
            <div className={styles.TextContainer}>
              <h2 className="heading">Custom Drill</h2>
              <p className={`caption-secondary`}>Create your own personalized exercises tailored to your specific learning goals</p>
            </div>
            <div className={styles.ButtonContainer}>
              <Button variant="contained" text="Customize Drill" fullWidth={true} />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function ShowCurrentDevice() {
  const { prefs } = useAppPreferences();
  const isMidiDeviceConnected = useNoteInputStore(state => state.isMidiDeviceConnected);
  const navigate = useNavigate();

  function handleChangeDevicePressed() {
    navigate(`/config?q=${CONFIG_ROUTE_PARAMS.DeviceSetup}`);
  }

  return (
    <div className={styles.DeviceContainer}>
      <h2 className="body">Current Input Devices</h2>
      <div className={styles.DeviceContainerTextContainer}>
        {isMidiDeviceConnected ?
          <>
            <MIDIIcon />
            <p className="caption-secondary">MIDI</p>
          </>
          : <></>
        }
      </div>
      <div className={styles.DeviceContainerTextContainer}>
        {prefs.inputType === "buttons" ?
          <>
            <DialPadIcon />
            <p className="caption-secondary">Buttons</p>
          </>
          :
          prefs.inputType === "piano" ?
            <>
              <PianoIcon />
              <p className="caption-secondary">Piano Roll</p>
            </>
            : <></>
        }
      </div>
      <Button text="Change Device" variant="text-secondary" onClick={handleChangeDevicePressed} />
    </div>
  )
}