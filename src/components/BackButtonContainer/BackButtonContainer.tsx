import { BackIcon } from '../Icons/Icons';
import styles from './BackButtonContainer.module.css';

export default function BackButtonContainer({ onBack }: { onBack: () => void }) {
  return (
    <div className={styles.BackButtonWrapper}>
      <div onClick={onBack} className={styles.BackButtonContainer}>
        <BackIcon />
        <h2 className='body'>Back</h2>
      </div>
    </div>
  )
}
