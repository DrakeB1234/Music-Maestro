import BackButtonContainer from "../BackButtonContainer/BackButtonContainer";
import { ArrowDownIcon, DialPadIcon, MIDIIcon, PianoIcon, StatusIcon } from '@/components/Icons/Icons';
import Card from '@/components/UIComponents/Card';
import Button from '@/components/UIComponents/Button';
import ToggleButton from '@/components/UIComponents/ToggleButton';
import { useEffect, useState } from 'react';
import { useNoteInputStore } from '@/store/noteInputStore';
import { PrintGenericNote, type GenericNote } from '@/helpers/NoteHelpers';
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
  const midiDeviceErrorMessage = useNoteInputStore((state) => state.midiDeviceErrorMessage);
  const isMidiDeviceConnected = useNoteInputStore((state) => state.isMidiDeviceConnected);

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
            <p className='caption'>MIDI {isMidiDeviceConnected ? "Connected" : "Disconnected"}</p>
          </div>
        </div>

        <div className={`${styles.InputDeviceDropDownButton} ${expanded && styles.Rotated}`}>
          <Button icon={<ArrowDownIcon />} onClick={() => setExpanded(!expanded)} variant='text-secondary' />
        </div>
      </div>

      <div className={`${styles.ExpandedContent} ${expanded ? styles.Show : ""}`}>
        {!isMidiDeviceConnected ?
          <>
            <p className='caption'>Connect your MIDI compatible keyboard in the app to read your inputs directly. </p>
            <p className={`caption ${styles.ErrorText}`}>{midiDeviceErrorMessage && `Error: ${midiDeviceErrorMessage}`}</p>
            <div className={styles.ExpandedContentButtonContainer}>
              <Button text='Connect' onClick={connectMidiDevice} />
            </div>
          </>
          :
          <>
            <p className='caption'>Test your device now by playing some notes!</p>
            <p className={`caption ${styles.ErrorText}`}>{midiDeviceErrorMessage && `Error: ${midiDeviceErrorMessage}`}</p>
            <div>
              <PlayedNoteText />
            </div>
            <div className={styles.ExpandedContentButtonContainer}>
              <Button text='Connect' onClick={connectMidiDevice} />
            </div>
          </>
        }
      </div>
    </Card>
  )
}

function PlayedNoteText() {
  const [playedNote, setPlayedNote] = useState<GenericNote | null>(null);
  const addMidiListener = useNoteInputStore((state) => state.addMidiListener);
  const removeMidiListener = useNoteInputStore((state) => state.removeMidiListener);

  useEffect(() => {
    const handleMidiEvent = (note: GenericNote) => {
      setPlayedNote(note);
    }

    addMidiListener(handleMidiEvent);

    return () => removeMidiListener(handleMidiEvent);
  }, [addMidiListener, removeMidiListener]);

  return <p>{playedNote && PrintGenericNote(playedNote)}</p>
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