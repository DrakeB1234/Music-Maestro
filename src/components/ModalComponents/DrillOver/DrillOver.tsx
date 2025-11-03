import Modal from '@components/UIComponents/Modal';
import { TrophyIcon } from "@components/Icons/Icons";
import styles from './DrillOver.module.css';
import Button from "@components/UIComponents/Button";
import { useNoteDrillStore } from '@/store/noteDrillStore';

interface DrillOverProps {
  drillScore: number;
  correctNotesPlayed: number;
  totalNotesPlayed: number;
  handleDrillExit: () => void;
  handleDrillTryAgain: () => void;
}

export default function DrillOver({
  drillScore,
  correctNotesPlayed,
  totalNotesPlayed,
  handleDrillExit,
  handleDrillTryAgain,
}: DrillOverProps) {

  const accuracyPercantageString = `${Math.ceil(correctNotesPlayed / totalNotesPlayed * 100)}%`;
  const drillOptions = useNoteDrillStore.getState().drillOptions;

  return (
    <Modal headerText="Drill Over!" icon={<TrophyIcon />} overrideExitButtonPressed={handleDrillExit}>
      <div className={styles.ModalContentContainer}>
        <div className={styles.ContentWrapper}>
          <h1 className='body'>Your Score</h1>
          <div className={styles.ScoreContainer}>
            <p className='large-heading'>{drillScore}</p>
          </div>
        </div>
        <div className={styles.ContentWrapper}>
          <h1 className='body'>Accuracy</h1>
          <div className={styles.AccuracyContainer}>
            <p className='heading-secondary'>{`Correct: ${correctNotesPlayed}/${totalNotesPlayed}`}</p>
            <p className='heading-secondary'>{accuracyPercantageString}</p>
          </div>
        </div>
        <p>{drillOptions?.drillId}</p>
      </div>
      <div className={styles.ModalActionButtonsContainer}>
        <Button text="Close" variant='outlined' fullWidth={true} onClick={handleDrillExit} />
        <Button text="Try Again" fullWidth={true} onClick={handleDrillTryAgain} />
      </div>
    </Modal>
  )
}
