import BackButtonContainer from '@/components/BackButtonContainer/BackButtonContainer';
import styles from './PresetDrills.module.css';

interface Props {
  onBack: () => void;
}

export default function PresetDrills({ onBack }: Props) {
  return (
    <div className={styles.PresetDrillsWrapper}>
      <BackButtonContainer onBack={onBack} />
      <h1>Preset Drills</h1>
    </div>
  )
}
