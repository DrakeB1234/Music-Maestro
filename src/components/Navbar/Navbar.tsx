import styles from './Navbar.module.css';
import { AppGraphic, CloseIcon, DashboardIcon, DataIcon, HomeIcon, LinkIcon, MenuIcon, VolumeMaxIcon, StatusIcon } from '@components/Icons/Icons';
import Button from '@/components/UIComponents/Inputs/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNoteInputStore } from '@/store/noteInputStore';
import { CONFIG_ROUTE_PARAMS } from '@/pages/ConfigPage';

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleIconPressed = () => {
    navigate("/");
    return;
  }

  return (
    <>
      <div className={styles.NavbarWrapper}>
        <div className={styles.SizeWrapper}>
          <div onClick={handleIconPressed} className={styles.IconTextContainer}>
            <AppGraphic size={40} />
            <h1 className='mobile-hide'>Music Maestro</h1>
            <div className={styles.TitleContainer}>
            </div>
          </div>
          <Button onClick={() => setSidebarOpen(true)} icon={<MenuIcon color='var(--color-dark-2)' />} variant='text-secondary' />
        </div>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isMidiDeviceConnected = useNoteInputStore((state) => state.isMidiDeviceConnected);

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;
  const url = pathname + search;

  function handleNavigate(route: string) {
    onClose();
    navigate(route);
  };

  return (
    <>
      <div
        className={`${styles.Backdrop} ${isOpen ? styles.show : ""}`}
        onClick={onClose}
      />

      <div className={`${styles.SidebarWrapper} ${isOpen ? styles.open : ""}`}>
        <div className={styles.Header}>
          <AppGraphic size={40} />
          <h1 className='truncate-overflow-text'>Music Maestro</h1>
          <Button variant='text-secondary' icon={<CloseIcon color='var(--color-shade-base)' />} onClick={onClose} />
        </div>
        <div className={`${styles.SidebarItemContainer} ${url === `/` && styles.Active}`} onClick={() => handleNavigate(`/`)} tabIndex={0}>
          <div className={styles.SidebarItemTextContainer}>
            <HomeIcon />
            <p>Home</p>
          </div>
        </div>
        <div className={`${styles.SidebarItemContainer} ${url === `/config?q=${CONFIG_ROUTE_PARAMS.DeviceSetup}` && styles.Active}`} onClick={() => handleNavigate(`/config?q=${CONFIG_ROUTE_PARAMS.DeviceSetup}`)} tabIndex={0}>
          <div className={styles.SidebarItemTextContainer}>
            <LinkIcon />
            <p>Device Setup</p>
          </div>
          {isMidiDeviceConnected ?
            <div className={styles.SidebarItemSubTextContainer}>
              <StatusIcon color='var(--color-success-base)' />
              <p className='caption-secondary'>MIDI Connected</p>
            </div>
            :
            <div className={styles.SidebarItemSubTextContainer}>
              <StatusIcon color='var(--color-error-base)' />
              <p className='caption-secondary'>MIDI Disconnected</p>
            </div>
          }
        </div>
        <div className={`${styles.SidebarItemContainer} ${url === `/config?q=${CONFIG_ROUTE_PARAMS.MIDIPlayback}` && styles.Active}`} onClick={() => handleNavigate(`/config?q=${CONFIG_ROUTE_PARAMS.MIDIPlayback}`)} tabIndex={0}>
          <div className={styles.SidebarItemTextContainer}>
            <VolumeMaxIcon />
            <p>MIDI Playback</p>
          </div>
        </div>
        <div className={`${styles.SidebarItemContainer} ${url === `/config?q=${CONFIG_ROUTE_PARAMS.ManageData}` && styles.Active}`} onClick={() => handleNavigate(`/config?q=${CONFIG_ROUTE_PARAMS.ManageData}`)} tabIndex={0}>
          <div className={styles.SidebarItemTextContainer}>
            <DataIcon />
            <p>Manage Data</p>
          </div>
        </div>
        {/* <div className={`${styles.SidebarItemContainer} ${url === `/config?q=${CONFIG_ROUTE_PARAMS.PWA}` && styles.Active}`} onClick={() => handleNavigate(`/config?q=${CONFIG_ROUTE_PARAMS.PWA}`)} tabIndex={0}>
          <div className={styles.SidebarItemTextContainer}>
            <DashboardIcon />
            <p>PWA Download</p>
          </div>
        </div> */}
      </div>
    </>
  );
}