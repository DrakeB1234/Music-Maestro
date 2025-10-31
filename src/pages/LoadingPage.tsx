import { LoadingSpininer } from '@/components/Icons/Icons';
import styles from './LoadingPage.module.css';

export default function LoadingPage() {
  return (
    <div className={styles.LoadingWrapper}>
      <LoadingSpininer size={60} />
    </div>
  )
}

