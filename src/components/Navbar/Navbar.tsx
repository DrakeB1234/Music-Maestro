import { useModal } from '@/context/ModalProvider';
import styles from './Navbar.module.css';
import MidiDeviceSelection from '../MidiDeviceSelection/MidiDeviceSelection';
import { MenuIcon, MusicNoteIcon } from '../Icons/Icons';
import Button from '../UIComponents/Button';
import IconWrapper from '../UIComponents/IconWrapper';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { openModal } = useModal();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    openModal(
      <MidiDeviceSelection />
    );
  };

  return (
    <div className={styles.NavbarWrapper}>

      <div className={styles.SizeWrapper}>
        <div onClick={() => navigate("/")} className={styles.IconTextContainer}>
          <IconWrapper icon={<MusicNoteIcon />} />
          <div className={styles.TitleContainer}>
            <h1 className='body'>Sightreading</h1>
          </div>
        </div>
        <Button onClick={handleOpenModal} icon={<MenuIcon />} variant='outlined' />
      </div>

    </div>

  )
}
