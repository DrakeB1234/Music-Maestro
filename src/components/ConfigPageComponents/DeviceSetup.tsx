import BackButtonContainer from "../BackButtonContainer/BackButtonContainer";
import { ArrowDownIcon, DialPadIcon, MIDIIcon, PianoIcon, StatusIcon } from '@/components/Icons/Icons';
import Card from '@/components/UIComponents/Card';
import Button from '@/components/UIComponents/Button';
import ToggleButton from '@/components/UIComponents/ToggleButton';
import { useState } from 'react';
import { useNoteInputStore } from '@/store/noteInputStore';
import styles from './ConfigPageComponents.module.css';
import { useAppPreferences } from "@/hooks/useAppPreferences";

interface DeviceSetupProps {
  onBack: () => void;
}

export default function DeviceSetup({
  onBack
}: DeviceSetupProps) {

  return (
    <div className={styles.SizeWrapper}>
      <BackButtonContainer onBack={onBack} />
      <div className={styles.CardsWrapper}>
        <MIDIInputCard />
        <InputCards />
      </div>
    </div>
  )
}

function MIDIInputCard({

}) {
  const [expanded, setExpanded] = useState(false);
  const connectMidiDevice = useNoteInputStore((state) => state.connectMidiDevice);
  const enableMidiAutoReconnect = useNoteInputStore((state) => state.enableMidiAutoReconnect);
  const disableMidiAutoReconnect = useNoteInputStore((state) => state.disableMidiAutoReconnect);
  const midiDeviceErrorMessage = useNoteInputStore((state) => state.midiDeviceErrorMessage);
  const isMidiDeviceConnected = useNoteInputStore((state) => state.isMidiDeviceConnected);

  const { setPrefsByKey, prefs } = useAppPreferences();

  const [activeToggle, setActiveToggle] = useState<boolean>(prefs.midiDeviceAutoConnect);

  function handleToggleChanged(value: boolean,) {
    setActiveToggle(value);
    setPrefsByKey("midiDeviceAutoConnect", value);

    if (value) {
      enableMidiAutoReconnect();
    }
    else {
      disableMidiAutoReconnect();
    }
  };


  return (
    <Card>
      <div className={styles.InputDeviceHeader}>

        <div className={styles.InputDeviceTextContainer}>
          <div className={styles.InputDeviceTextItem}>
            <MIDIIcon />
            <p>External MIDI Device</p>
          </div>
          <div className={styles.InputDeviceTextItem}>
            <StatusIcon color={isMidiDeviceConnected ? 'var(--color-success)' : 'var(--color-error)'} />
            <p className='caption-secondary'>MIDI {isMidiDeviceConnected ? "Connected" : "Disconnected"}</p>
          </div>
        </div>

        <div className={`${styles.InputDeviceDropDownButton} ${expanded && styles.Rotated}`}>
          <Button icon={<ArrowDownIcon />} onClick={() => setExpanded(!expanded)} variant='text-secondary' />
        </div>
      </div>

      <div className={`${styles.ExpandedContent} ${expanded ? styles.Show : ""}`}>
        <p className='caption-secondary'>Connect your MIDI compatible keyboard in the app to read your inputs directly. </p>
        <p className={`caption-secondary ${styles.ErrorText}`}>{midiDeviceErrorMessage && `Error: ${midiDeviceErrorMessage}`}</p>
        <div className={styles.InputDeviceButtonContainer}>
          <p>Auto Reconnect</p>
          <ToggleButton value={activeToggle} onChange={handleToggleChanged} />
        </div>
        <div className={styles.ExpandedContentButtonContainer}>
          {!isMidiDeviceConnected ?
            <Button text='Connect' onClick={connectMidiDevice} />
            :
            <Button text='Disconnect' onClick={connectMidiDevice} />
          }
        </div>
      </div>
    </Card>
  )
}

function InputCards({

}) {
  type ActiveToggle = "buttons" | "piano";
  const { setInputType, prefs } = useAppPreferences();

  const [activeToggle, setActiveToggle] = useState<ActiveToggle | null>(prefs.inputType);

  function handleToggleChanged(type: ActiveToggle,) {
    if (activeToggle === type) {
      setActiveToggle(null);
      setInputType(null);
    }
    else {
      setActiveToggle(type);
      setInputType(type);
    };
  };

  return (
    <>
      <Card>
        <div className={styles.InputDeviceHeader}>

          <div className={styles.InputDeviceTextContainer}>
            <div className={styles.InputDeviceTextItem}>
              <DialPadIcon />
              <p>Buttons</p>
            </div>
            <div className={styles.InputDeviceButtonContainer}>
              <ToggleButton value={activeToggle == "buttons"} onChange={(_) => handleToggleChanged("buttons")} />
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div className={styles.InputDeviceHeader}>

          <div className={styles.InputDeviceTextContainer}>
            <div className={styles.InputDeviceTextItem}>
              <PianoIcon />
              <p>Piano Roll</p>
            </div>
            <div className={styles.InputDeviceButtonContainer}>
              <ToggleButton value={activeToggle == "piano"} onChange={(_) => handleToggleChanged("piano")} />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};