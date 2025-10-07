import { useModal } from '@/components/UIComponents/ModalContext';
import Button from '../UIComponents/Button';
import styles from './Navbar.module.css';
import MidiDeviceSelection from '../MidiDeviceSelection/MidiDeviceSelection';

export default function Navbar() {

  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <MidiDeviceSelection />
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
