import { useMidiProvider } from "@/context/MidiProvider";
import Modal from '../UIComponents/Modal';
import { LinkIcon, MusicNoteIcon } from "../Icons/Icons";
import styles from './MidiDeviceSelection.module.css';
import Button from "../UIComponents/Button";
import { PrintGenericNote } from "@/helpers/NoteHelpers";

export default function MidiDeviceSelection() {

  const { isConnected, ConnectDevice, error, lastNotePlayed } = useMidiProvider();

  return (
    <Modal headerText="Connect Device" icon={<LinkIcon />}>
      {!isConnected ?
        <div className={styles.ContentContainer}>
          <h2 className="body-secondary">Plug in your keyboard or controller to practice!</h2>
          {error ?
            <p>Error: {error}</p> :
            <></>
          }
        </div> :
        <div className={styles.ContentContainer}>
          <h2 className="body-secondary">Play a note to test!</h2>
          <div className={styles.NoteContainer}>
            <MusicNoteIcon color="var(--color-primary)" />
            <p>{lastNotePlayed && PrintGenericNote(lastNotePlayed)}</p>
          </div>
        </div>
      }
      <div className={styles.ButtonContainer}>
        <Button text="Connect Device" onClick={ConnectDevice} />
      </div>
    </Modal>
  )
}
