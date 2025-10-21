import BackButtonContainer from '@/components/BackButtonContainer/BackButtonContainer';
import styles from './PresetDrills.module.css';
import { PlayIcon, PlaylistIcon } from '@/components/Icons/Icons';
import Card from '@/components/UIComponents/Card';
import ButtonGroup from '@/components/UIComponents/ButtonGroup';
import Button from '@/components/UIComponents/Button';

interface Props {
  onBack: () => void;
}

export default function PresetDrills({ onBack }: Props) {
  return (
    <div className={styles.PresetDrillsWrapper}>
      <BackButtonContainer onBack={onBack} />
      <h1 className="heading-secondary">Preset Drills</h1>
      <div className={styles.CardContainer}>
        <Card padding="none">
          <div className={styles.TextContainer}>
            <div className={styles.HeaderContainer}>
              <PlaylistIcon color='var(--color-primary)' />
              <h2 className='heading truncate-overflow-text'>Treble Landmark Notes</h2>
            </div>
            <p className='caption'>C/G notes for learning landmark system</p>
          </div>
          <div className={styles.DifficultyButtonsContainer}>
            <ButtonGroup />
          </div>
          <div className={styles.PracticeButtonContainer}>
            <Button text='Progress' variant='outlined' fullWidth={true} />
            <Button icon={<PlayIcon color='var(--color-app-surface)' />} text='Practice' fullWidth={true} />
          </div>
        </Card>
      </div>
    </div>
  )
}
