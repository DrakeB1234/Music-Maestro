import styles from './LoadingPage.module.css';

export default function LoadingPage() {
  return (
    <div className={styles.LoadingWrapper}>
      <img src="/loading-spinner.svg" />
    </div>
  )
}
