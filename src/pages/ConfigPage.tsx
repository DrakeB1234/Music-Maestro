import styles from './ConfigPage.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

import DeviceSetup from '@/components/ConfigPageComponents/DeviceSetup';
import MidiPlayback from '@/components/ConfigPageComponents/MidiPlayback';
import ManageData from '@/components/ConfigPageComponents/ManageData';
import ConfigPWA from '@/components/ConfigPageComponents/ConfigPWA';

export const CONFIG_ROUTE_PARAMS = {
  DeviceSetup: "devicesetup",
  MIDIPlayback: "midiplayback",
  ManageData: "managedata",
  PWA: "pwa",
}

export default function ConfigPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  let searchKey = "";

  if (q) {
    const result = Object.entries(CONFIG_ROUTE_PARAMS).filter(e => e[1] === q)[0][1];
    searchKey = result;
  }

  function handleBackButtonPressed() {
    navigate("/");
  };

  return (
    <div className={styles.PageWrapper}>
      {searchKey === CONFIG_ROUTE_PARAMS.DeviceSetup ? <DeviceSetup onBack={handleBackButtonPressed} /> :
        searchKey === CONFIG_ROUTE_PARAMS.MIDIPlayback ? <MidiPlayback onBack={handleBackButtonPressed} />
          :
          searchKey === CONFIG_ROUTE_PARAMS.ManageData ? <ManageData onBack={handleBackButtonPressed} />
            :
            searchKey === CONFIG_ROUTE_PARAMS.PWA ? <ConfigPWA onBack={handleBackButtonPressed} />
              : <></>
      }
    </div>
  );
};


