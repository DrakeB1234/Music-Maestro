import Modal from '@components/UIComponents/Modal';
import { LinkIcon, MusicNoteIcon } from "@components/Icons/Icons";
import styles from './MidiDeviceSelection.module.css';
import Button from "@components/UIComponents/Button";
import { GenericNote, PrintGenericNote } from "@/helpers/NoteHelpers";
import { useNoteInputStore } from '@/store/noteInputStore';
import { useEffect, useState } from 'react';

export default function MidiDeviceSelection() {
  const midiDeviceErrorMessage = useNoteInputStore((state) => state.midiDeviceErrorMessage);
  const isMidiDeviceConnected = useNoteInputStore((state) => state.isMidiDeviceConnected);
  const connectMidiDevice = useNoteInputStore((state) => state.connectMidiDevice);

  return (
    <Modal headerText="Connect Device" icon={<LinkIcon />}>
      <div className={styles.ContentContainer}>
        {isMidiDeviceConnected
          ?
          <>
            <h2 className="body-secondary">Play a note to test!</h2>
            <div className={styles.NoteContainer}>
              <MusicNoteIcon color="var(--color-main-2)" />
              <PlayedNoteText />
            </div>
          </>
          :
          <h2 className="body-secondary">Plug in your keyboard or controller to practice!</h2>
        }
        <p className={styles.errorText}>{midiDeviceErrorMessage && `Error: ${midiDeviceErrorMessage}`}</p>

        <div className={styles.ButtonContainer}>
          <Button text="Connect Device" onClick={connectMidiDevice} />
        </div>
      </div>
    </Modal>
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
