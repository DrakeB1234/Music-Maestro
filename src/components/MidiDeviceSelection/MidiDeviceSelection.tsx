import styles from './MidiDeviceSelection.module.css';
import Button from '../UIComponents/Button';
import { useMidiProvider } from "@/context/MidiProvider";
import { PrintGenericNote } from '@/helpers/NoteHelpers';

export default function MidiDeviceSelection() {

  const { isConnected, ConnectDevice, error, lastNotePlayed } = useMidiProvider();

  return (
    <div className={styles.MidiDeviceSelectionWrapper}>
      <div>
        <h3>{isConnected ? 'Device Connected' : 'Device Disconnected'}</h3>
        {!isConnected ?
          <Button variant='filled-surface' size='md' onClick={ConnectDevice}>Connect</Button> :
          <></>
        }
        {error ?
          <h4>Error: {error}</h4> :
          <></>
        }
        {lastNotePlayed ?
          <h4>Played {PrintGenericNote(lastNotePlayed)}</h4> :
          <></>
        }
      </div>
    </div>
  )
}
