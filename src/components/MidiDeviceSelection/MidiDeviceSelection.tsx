import { useMidiInput } from '@/hooks/useMidiInput';
import styles from './MidiDeviceSelection.module.css';
import Button from '../UIComponents/Button';

export default function MidiDeviceSelection() {

  const { isConnected, ConnectDevice, error } = useMidiInput();

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
      </div>
    </div>
  )
}
