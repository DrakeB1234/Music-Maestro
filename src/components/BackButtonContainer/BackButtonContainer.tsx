import { BackIcon } from '../Icons/Icons';
import Button from '../UIComponents/Button';
import styles from './BackButtonContainer.module.css';

export default function BackButtonContainer({ onBack }: { onBack: () => void }) {
  return (
    <div className={styles.BackButtonWrapper}>
      <Button onClick={onBack} icon={<BackIcon />} text='Back' variant='text-secondary' />
    </div>
  )
}
