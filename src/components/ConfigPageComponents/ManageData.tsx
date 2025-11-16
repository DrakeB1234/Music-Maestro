import { useRef, useState } from "react";
import BackButtonContainer from "../BackButtonContainer/BackButtonContainer";
import { ArrowDownIcon, DeleteIcon, FileExportIcon, FileImportIcon } from "../Icons/Icons";
import Card from "../UIComponents/Card";
import styles from './ConfigPageComponents.module.css';
import Button from "../UIComponents/Inputs/Button";
import { useDrillProgressResults } from "@/hooks/useDrillProgressResultStorage";
import CustomFileInput from "../UIComponents/Inputs/CustomFileInput";

interface ManageDataProps {
  onBack: () => void;
}

export default function ManageData({
  onBack
}: ManageDataProps) {

  return (
    <div className={styles.SizeWrapper}>
      <BackButtonContainer onBack={onBack} />
      <div className={styles.CardsWrapper}>
        <ExportDataCard />
        <ImportDataCard />
        <ClearDataCard />
      </div>
    </div>
  )
}


function ExportDataCard() {
  const [expanded, setExpanded] = useState(false);
  const { exportResults } = useDrillProgressResults();

  return (
    <Card>
      <div className={styles.InputDeviceHeader}>

        <div className={styles.InputDeviceTextContainer}>
          <div className={styles.InputDeviceTextItem}>
            <FileExportIcon />
            <p>Export Data</p>
          </div>
        </div>

        <div className={`${styles.InputDeviceDropDownButton} ${expanded && styles.Rotated}`}>
          <Button icon={<ArrowDownIcon />} onClick={() => setExpanded(!expanded)} variant='text-secondary' />
        </div>
      </div>

      <div className={`${styles.ExpandedContent} ${styles.MidiPlaybackExapandedContent} ${expanded ? styles.Show : ""}`}>
        <p className="caption-secondary">Export your data in a convenient file that can be later imported into the app!</p>
        <p className="caption-secondary">Clicking export data below will download a JSON file that will contain your data from preset drill runs. This is mainly used for a personal backup of data in wanted.</p>
        <div className={styles.ExpandedContentButtonContainer}>
          <Button text='Export Data' onClick={exportResults} />
        </div>
      </div>
    </Card>
  )
}

function ImportDataCard() {
  const [expanded, setExpanded] = useState(false);
  const selectedFile = useRef<File | undefined>(undefined);
  const { importResults } = useDrillProgressResults();

  function handleImportDataButtonClicked() {
    if (!selectedFile.current) return;
    importResults(selectedFile.current);
  };

  function handleFileSelect(file: File) {
    selectedFile.current = file;
  }

  return (
    <Card>
      <div className={styles.InputDeviceHeader}>

        <div className={styles.InputDeviceTextContainer}>
          <div className={styles.InputDeviceTextItem}>
            <FileImportIcon />
            <p>Import Data</p>
          </div>
        </div>

        <div className={`${styles.InputDeviceDropDownButton} ${expanded && styles.Rotated}`}>
          <Button icon={<ArrowDownIcon />} onClick={() => setExpanded(!expanded)} variant='text-secondary' />
        </div>
      </div>

      <div className={`${styles.ExpandedContent} ${styles.MidiPlaybackExapandedContent} ${expanded ? styles.Show : ""}`}>
        <p className="caption-secondary">Import app data from a JSON file to get back where you started!</p>
        <p className="caption-secondary">Importing data will ERASE current stored data, so only use this feature as a means to restore a personal backup of app data.</p>
        <CustomFileInput
          accept="application/json"
          onFileSelect={handleFileSelect}
        />
        <div className={styles.ExpandedContentButtonContainer}>
          <Button text='Import Data' onClick={handleImportDataButtonClicked} />
        </div>
      </div>
    </Card>
  )
}

function ClearDataCard() {
  const [expanded, setExpanded] = useState(false);
  const { clearResults } = useDrillProgressResults();

  function handleClearDataPressed() {
    clearResults();
  };


  return (
    <Card>
      <div className={styles.InputDeviceHeader}>

        <div className={styles.InputDeviceTextContainer}>
          <div className={styles.InputDeviceTextItem}>
            <DeleteIcon />
            <p>Clear App Data</p>
          </div>
        </div>

        <div className={`${styles.InputDeviceDropDownButton} ${expanded && styles.Rotated}`}>
          <Button icon={<ArrowDownIcon />} onClick={() => setExpanded(!expanded)} variant='text-secondary' />
        </div>
      </div>

      <div className={`${styles.ExpandedContent} ${styles.MidiPlaybackExapandedContent} ${expanded ? styles.Show : ""}`}>
        <p className="caption-secondary">This option will CLEAR ALL application data. If you would like, please export your data first, then clear if you would like to later backup your data.</p>
        <div className={styles.ExpandedContentButtonContainer}>
          <Button text='CLEAR ALL DATA' onClick={handleClearDataPressed} />
        </div>
      </div>
    </Card>
  )
}