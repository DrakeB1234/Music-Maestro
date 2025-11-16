import BackButtonContainer from "../BackButtonContainer/BackButtonContainer";
import { FileExportIcon } from "../Icons/Icons";
import Card from "../UIComponents/Card";
import styles from './ConfigPageComponents.module.css';
import Button from "../UIComponents/Inputs/Button";
import { usePWAInstallPrompt } from "@/hooks/usePWAInstallPrompt";

interface ConfigPWAProps {
  onBack: () => void;
}

export default function ConfigPWA({
  onBack
}: ConfigPWAProps) {

  return (
    <div className={styles.PWASizeWrapper}>
      <BackButtonContainer onBack={onBack} />
      <div className={styles.CardsWrapper}>
        <PWACard />
      </div>
    </div>
  )
}


function PWACard() {
  const { isInstallable, promptInstall } = usePWAInstallPrompt();

  return (
    <Card>
      <div className={styles.InputDeviceHeader}>

        <div className={styles.InputDeviceTextContainer}>
          <div className={styles.InputDeviceTextItem}>
            <FileExportIcon />
            <p>PWA</p>
          </div>
          <div className={styles.TextContent}>
            <p>Download the PWA of this web application for convenient native-like app experience!</p>
          </div>
          {!isInstallable &&
            <p className="caption-secondary">
              (Already installed or not supported)
            </p>
          }
          <div className={styles.ExpandedContentButtonContainer}>
            <Button text='Download' onClick={promptInstall} disabled={!isInstallable} />
          </div>
        </div>
      </div>
    </Card>
  )
}