import { useMidiProvider } from "@/context/MidiProvider";
import Modal from '../UIComponents/Modal';
import { LinkIcon } from "../Icons/Icons";
import styles from './MidiDeviceSelection.module.css';
import Button from "../UIComponents/Button";

export default function MidiDeviceSelection() {

  const { isConnected, ConnectDevice, error, lastNotePlayed } = useMidiProvider();

  return (
    <Modal headerText="Connect Device" icon={<LinkIcon />}>
      <div className={styles.ContentContainer}>
        <h2 className="body-secondary">Plug in your keyboard or controller to practice!</h2>
        {error ?
          <p>Error: {error}</p> :
          <></>
        }
      </div>
      <div className={styles.ButtonContainer}>
        <Button text="Connect Device" />
      </div>
    </Modal>
  )
}
