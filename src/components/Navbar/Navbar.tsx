import { useModal } from '@/context/ModalContext';
import Button from '../UIComponents/Button';
import styles from './Navbar.module.css';
import MidiDeviceSelection from '../MidiDeviceSelection/MidiDeviceSelection';
import { useMidiInput } from '@/hooks/useMidiInput';

export default function Navbar() {

  const { openModal, closeModal } = useModal();
  const { ConnectDevice, isConnected, fullError, error } = useMidiInput();

  const handleOpenModal = () => {
    openModal(
      <MidiDeviceSelection
        connectionfunc={ConnectDevice}
        isConnected={isConnected}
        fullError={fullError}
        errorMessage={error}
      />
    );
  };

  return (
    <div className={styles.NavbarWrapper}>
      <div className={`${styles.TitleContainer} ${styles.NavbarPadding}`}>
        <h3>Note App</h3>
      </div>

      <div className={styles.DeviceSetupContainer}>
        <Button variant='filled-surface' size='md' onClick={handleOpenModal}>Device Setup</Button>
      </div>
    </div>
  )
}
