import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.HomePageWrapper}>
      <div className={styles.SizeWrapper}>
        <div className={styles.HeaderContainer}>
          <h1 className={`main-heading`}>Welcome Back!</h1>
          <h2 className={`light-heading`}>Start your music practice and get ready to learn</h2>
        </div>
        <div className={styles.CardWrapper}>
          <h2>Practice Modes</h2>
          <div className={styles.CardContainer}>

          </div>
        </div>
      </div>
    </div>
  )
}
