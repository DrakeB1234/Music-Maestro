import { BackIcon } from '@components/Icons/Icons';
import Button from '@/components/UIComponents/Inputs/Button';
import styles from './BackButtonContainer.module.css';

export default function BackButtonContainer({ onBack }: { onBack: () => void }) {
  return (
    <div className={styles.BackButtonWrapper}>
      <Button onClick={onBack} icon={<BackIcon />} text='Back' variant='text-secondary' />
    </div>
  )
}
