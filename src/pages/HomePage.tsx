import Card from '@/components/UIComponents/Card';
import styles from './HomePage.module.css';
import IconWrapper from '@/components/UIComponents/IconWrapper';
import { MusicNoteIcon } from '@/components/Icons/Icons';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  function handleNoteDrillPressed() {
    navigate("/drills");
  }

  function handleKeyVisualizerPressed() {
    navigate("/keyvisualizer");
  }

  return (
    <div className={styles.HomePageWrapper}>

      <div className={styles.SizeWrapper}>
        <div className={styles.HeaderContainer}>
          <h1 className={`heading`}>Music Maestro</h1>
        </div>

        <div className={styles.ItemsContainer}>
          <h2>Exercises</h2>
          <div className={styles.CardContainer}>
            <Card onClick={handleNoteDrillPressed}>
              <div className={styles.CardContent}>
                <div className={styles.IconContainer}>
                  <IconWrapper icon={<MusicNoteIcon />} />
                </div>
                <div className={styles.TextContainer}>
                  <h2 className="heading">Note Drills</h2>
                  <p className={`caption-secondary`}>Practice your sightreading note identification through note drills!</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className={styles.ItemsContainer}>
          <h2>Resources</h2>
          <div className={styles.CardContainer}>
            <Card onClick={handleKeyVisualizerPressed}>
              <div className={styles.CardContent}>
                <div className={styles.IconContainer}>
                  <IconWrapper icon={<MusicNoteIcon />} />
                </div>
                <div className={styles.TextContainer}>
                  <h2 className="heading">Key Visualizer</h2>
                  <p className={`caption-secondary`}>See and hear what notes and chords go along with a key and mode!</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

      </div>

    </div>
  )
}
