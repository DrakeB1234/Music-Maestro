import BackButtonContainer from "../BackButtonContainer/BackButtonContainer";
import { ArrowDownIcon, VolumeMaxIcon, VolumeMuteIcon } from '@/components/Icons/Icons';
import Card from '@/components/UIComponents/Card';
import Button from '@/components/UIComponents/Inputs/Button';
import { useEffect, useState } from 'react';
import styles from './ConfigPageComponents.module.css';
import ToggleButton from "../UIComponents/ToggleButton";
import { useAppPreferences } from "@/hooks/useAppPreferences";
import InputSlider from "../UIComponents/Inputs/InputSlider";
import { getCacheUsageByPath } from "@/helpers/helpers";

interface MidiPlaybackProps {
  onBack: () => void;
}

export default function MidiPlayback({
  onBack
}: MidiPlaybackProps) {

  return (
    <div className={styles.SizeWrapper}>
      <BackButtonContainer onBack={onBack} />
      <div className={styles.CardsWrapper}>
        <MidiPlaybackCard />
        <VolumeCard />
      </div>
    </div>
  )
}

function MidiPlaybackCard() {
  const { setPrefsByKey, prefs } = useAppPreferences();

  const [expanded, setExpanded] = useState(false);
  const [activeToggle, setActiveToggle] = useState<boolean>(prefs.midiPlaybackEnabled);
  const [cacheData, setCacheData] = useState<string | null>(null);

  useEffect(() => {
    async function loadCacheData() {
      const usage = await getCacheUsageByPath("/piano_samples/");
      setCacheData(usage.totalKB.toString());
    }

    loadCacheData();

  }, []);

  function handleToggleChanged(value: boolean) {
    setActiveToggle(value);
    setPrefsByKey("midiPlaybackEnabled", value);
  };

  return (
    <Card>
      <div className={styles.InputDeviceHeader}>

        <div className={styles.InputDeviceTextContainer}>
          <div className={styles.InputDeviceTextItem}>
            <VolumeMaxIcon />
            <p>Enable MIDI Playback</p>
          </div>
          <div className={styles.InputDeviceTextItem}>
            <ToggleButton value={activeToggle} onChange={handleToggleChanged} />
          </div>
        </div>

        <div className={`${styles.InputDeviceDropDownButton} ${expanded && styles.Rotated}`}>
          <Button icon={<ArrowDownIcon />} onClick={() => setExpanded(!expanded)} variant='text-secondary' />
        </div>
      </div>

      <div className={`${styles.ExpandedContent} ${styles.MidiPlaybackExapandedContent} ${expanded ? styles.Show : ""}`}>
        <p className="caption-secondary">MIDI playback can be used in certain features of this application, which will playback requested piano sounds.</p>
        <p className="caption-secondary">Current Cached Samples: <span className="body">{cacheData ? cacheData : "-"}kb</span></p>
      </div>
    </Card>
  )
}

function VolumeCard() {
  const { setPrefsByKey, prefs } = useAppPreferences();
  const [volume, setVolume] = useState(prefs.midiPlaybackVolume);

  function handleVolumeChange(value: number) {
    setVolume(value);
    setPrefsByKey("midiPlaybackVolume", value);
  }

  return (
    <Card>
      <div className={styles.InputDeviceHeader}>

        <div className={styles.InputDeviceTextContainer}>
          <div className={styles.InputDeviceTextItem}>
            <p>Volume</p>
          </div>
          <div className={`${styles.InputDeviceTextItem}`}>
            <VolumeMuteIcon />
            <InputSlider
              onChange={handleVolumeChange}
              min={0}
              max={100}
              value={volume}
              label="Volume"
              hideLabel
              step={5}
            />
            <VolumeMaxIcon />
          </div>
        </div>
      </div>
    </Card>
  )
}