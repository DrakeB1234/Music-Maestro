import Modal from '@components/UIComponents/Modal';
import styles from './DrillProgress.module.css';
import Button from "@components/UIComponents/Button";
import { useModal } from '@/context/ModalProvider';
import { useDrillProgressResults } from '@/hooks/useDrillProgressResultStorage';
import { ScoreLineGraph } from '@/components/ScoreLineGraph/ScoreLineGraph';
import { defaultDrillPresetsData } from '@/data/NoteDrillPresets';
import { HeadphonesGraphic } from '@/components/Icons/Icons';

interface DrillProgressProps {
  presetId: string;
}

const LINE_GRAPH_HEIGHT = 140;
const LINE_GRAPH_WIDTH = 600;

export default function DrillProgress({
  presetId
}: DrillProgressProps) {

  const { closeModal } = useModal();
  const { getResultsById } = useDrillProgressResults();

  const presetData = defaultDrillPresetsData.find(e => e.id === presetId);

  const data = getResultsById(presetId);
  const averageScore = Math.round(data.reduce((sum, obj) => sum + obj.score, 0) / data.length);
  const correctNotes = data.reduce((sum, obj) => sum + obj.correctNotes, 0);
  const totalNotes = data.reduce((sum, obj) => sum + obj.totalNotes, 0);
  const averageAccuracy = Math.round(correctNotes / totalNotes * 100);
  const totalCorrectNotesPerMinute = data.reduce((sum, obj) => sum + obj.correctNotesPerMinute, 0);
  const averageCorrectNotesPerMinute = totalCorrectNotesPerMinute / data.length;

  const graphData = data.map(e => ({
    ...e,
    score: e.score
  }));

  if (data.length < 1) {
    return (
      <Modal headerText="Drill Progress">
        <div className={styles.ModalContentContainer}>
          <h1>{presetData?.name && presetData?.name}</h1>
          <div className={styles.EmptyGraphContainer} style={{ height: `${LINE_GRAPH_HEIGHT}px` }}>
            <HeadphonesGraphic scale={2.2} />
            <p>Practice this drill again to see your progress!</p>
          </div>
        </div>
        <div className={styles.ModalActionButtonsContainer}>
          <Button text="Close" variant='outlined' fullWidth={true} onClick={closeModal} />
        </div>
      </Modal>
    );
  };

  return (
    <Modal headerText="Drill Progress">
      {data.length < 1 && <p>No Data Found!</p>}
      <div className={styles.ModalContentContainer}>
        <h1>{presetData?.name && presetData?.name}</h1>
        {data.length > 1 ? <ScoreLineGraph data={graphData} width={LINE_GRAPH_WIDTH} height={LINE_GRAPH_HEIGHT} className={styles.LineGraphContainer} />
          :
          <div className={styles.EmptyGraphContainer} style={{ minHeight: `${LINE_GRAPH_HEIGHT}px` }}>
            <HeadphonesGraphic scale={2.2} />
            <p>Practice this drill again to see a graph of your progress!</p>
          </div>
        }

        <h2 className='body'>Average Score</h2>
        <p className={`heading ${styles.DataContainer}`}>{!isNaN(averageScore) ? averageScore : 0}</p>
        <h2 className='body'>Average Accuracy</h2>
        <p className={`heading ${styles.DataContainer}`}>{!isNaN(averageAccuracy) ? averageAccuracy : 0}%</p>
        <h2 className='body'>Average Correct Notes Per Minute</h2>
        <p className={`heading ${styles.DataContainer}`}>{!isNaN(averageCorrectNotesPerMinute) ? averageCorrectNotesPerMinute : 0}</p>
      </div>
      <div className={styles.ModalActionButtonsContainer}>
        <Button text="Close" variant='outlined' fullWidth={true} onClick={closeModal} />
      </div>
    </Modal>
  )
}
