import BackButtonContainer from '@/components/BackButtonContainer/BackButtonContainer';
import styles from './PresetDrills.module.css';
import { PlayIcon, PlaylistIcon } from '@/components/Icons/Icons';
import Card from '@/components/UIComponents/Card';
import Button from '@/components/UIComponents/Button';
import { defaultDrillPresetsData } from '@/data/NoteDrillPresets';
import type { DrillPreset } from '@/types/DrillTypes';
import { useNavigate } from 'react-router-dom';

interface Props {
  onBack: () => void;
}

export default function PresetDrills({ onBack }: Props) {
  const navigate = useNavigate();

  const startPresetDrill = (id: string) => {
    navigate("/drills/start", { state: { type: "preset", id } });
  };

  return (
    <div className={styles.PresetDrillsWrapper}>
      <div className={styles.HeadingContainer}>
        <h1>Preset Drills</h1>
      </div>
      <BackButtonContainer onBack={onBack} />
      <div className={styles.CardContainer}>
        {defaultDrillPresetsData.map((e: DrillPreset) => (
          <PresetCard
            key={e.id}
            headerText={e.name}
            descriptionText={e.description}
            handleNavigate={startPresetDrill}
            drillId={e.id}
          />
        ))}
      </div>
    </div>
  )
}

interface CardProps {
  headerText: string;
  descriptionText: string;
  drillId: string,
  handleNavigate: (id: string) => void;
}

function PresetCard({
  headerText,
  descriptionText,
  drillId,
  handleNavigate
}: CardProps) {
  return (
    <Card padding="none">
      <div className={styles.TextContainer}>
        <div className={styles.HeaderContainer}>
          <PlaylistIcon color='var(--color-primary)' />
          <h2 className='heading truncate-overflow-text'>{headerText}</h2>
        </div>
        <p className='caption'>{descriptionText}</p>
      </div>
      <div className={styles.PracticeButtonContainer}>
        <Button text='Progress' variant='outlined' fullWidth={true} />
        <Button onClick={() => handleNavigate(drillId)} icon={<PlayIcon color='var(--color-app-surface)' />} text='Practice' fullWidth={true} />
      </div>
    </Card>
  )
}
