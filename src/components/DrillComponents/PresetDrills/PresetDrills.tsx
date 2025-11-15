import BackButtonContainer from '@/components/BackButtonContainer/BackButtonContainer';
import styles from './PresetDrills.module.css';
import { PlayIcon, PlaylistIcon } from '@/components/Icons/Icons';
import Card from '@/components/UIComponents/Card';
import Button from '@/components/UIComponents/Button';
import { defaultDrillPresetsData } from '@/data/NoteDrillPresets';
import type { DrillPreset } from '@/types/DrillTypes';
import { useNavigate } from 'react-router-dom';
import { useNoteDrillStore } from '@/store/noteDrillStore';
import { defaultDrillOptions } from '@/helpers/DrillHelpers';
import { useModal } from '@/context/ModalProvider';
import DrillProgress from '@/components/ModalComponents/DrillProgress/DrillProgress';

interface Props {
  onBack: () => void;
}

export default function PresetDrills({ onBack }: Props) {
  const setDrillOptions = useNoteDrillStore((state) => state.setDrillOptions);
  const setIsDrillStarted = useNoteDrillStore((state) => state.setIsDrillStarted);
  const navigate = useNavigate();

  const { openModal } = useModal();

  const startPresetDrill = (id: string) => {
    const drillOptions = defaultDrillPresetsData.find((e) => e.id === id)?.drillOptions
    if (drillOptions) {
      drillOptions.drillId = id;
      setDrillOptions(drillOptions);
    };
    if (!drillOptions) setDrillOptions(defaultDrillOptions);

    setIsDrillStarted(false);
    navigate("/drills/start");
  };

  function handleOpenModal(id: string) {
    openModal(<DrillProgress presetId={id} />)
  }

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
            difficulty={e.difficulty}
            handleStartPressed={startPresetDrill}
            handleProgressPressed={handleOpenModal}
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
  drillId: string;
  difficulty: string;
  handleStartPressed: (id: string) => void;
  handleProgressPressed: (id: string) => void;
}

function PresetCard({
  headerText,
  descriptionText,
  drillId,
  difficulty,
  handleStartPressed,
  handleProgressPressed
}: CardProps) {
  return (
    <Card>
      <div className={styles.TextContainer}>
        <div className={styles.HeaderContainer}>
          <PlaylistIcon color='var(--color-main-2)' />
          <h2 className='heading truncate-overflow-text'>{headerText}</h2>
        </div>
        <div>
          <p className={`caption-secondary ${styles.DifficultyPill}`}>{difficulty}</p>
        </div>
        <p className='caption-secondary'>{descriptionText}</p>
      </div>
      <div className={styles.PracticeButtonContainer}>
        <Button onClick={() => handleProgressPressed(drillId)} text='Progress' variant='outlined' fullWidth={true} />
        <Button onClick={() => handleStartPressed(drillId)} icon={<PlayIcon color='var(--color-text-main-1)' />} text='Practice' fullWidth={true} />
      </div>
    </Card>
  )
}
