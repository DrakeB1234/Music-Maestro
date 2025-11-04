import Modal from '@components/UIComponents/Modal';
import { TrophyIcon } from "@components/Icons/Icons";
import styles from './DrillOver.module.css';
import Button from "@components/UIComponents/Button";

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

  const accuracyPercantage = Math.ceil(correctNotesPlayed / totalNotesPlayed * 100);

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
            <p className='heading-secondary'>{!isNaN(accuracyPercantage) ? accuracyPercantage : 0}%</p>
          </div>
        </div>
      </div>
      <div className={styles.ModalActionButtonsContainer}>
        <Button text="Close" variant='outlined' fullWidth={true} onClick={handleDrillExit} />
        <Button text="Try Again" fullWidth={true} onClick={handleDrillTryAgain} />
      </div>
    </Modal>
  )
}
