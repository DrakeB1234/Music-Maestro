import styles from './KeyVisualizerPage.module.css';
import { useNavigate } from 'react-router-dom';
import BackButtonContainer from '@/components/BackButtonContainer/BackButtonContainer';
import SelectInput from '@/components/UIComponents/Inputs/SelectInput';
import Button from '@/components/UIComponents/Button';
import { useEffect, useRef, useState } from 'react';
import { type NOTE_SEMITONES_NAME_TYPES } from '@/types/DrillTypes';
import { getChordsInScale, getScaleNotes, NOTE_SEMITONE_NAMES, SCALE_TYPES_ARR, type GetChordsInScaleReturn, type ScaleTypes } from '@/helpers/NoteHelpers';

export default function KeyVisualizerPage() {
  const rootRef = useRef<HTMLSelectElement>(null);
  const scaleRef = useRef<HTMLSelectElement>(null);
  const [rootError, setRootError] = useState<string>("");
  const [scaleNotes, setScaleNotes] = useState<NOTE_SEMITONES_NAME_TYPES[]>([]);
  const [scaleChords, setScaleChords] = useState<GetChordsInScaleReturn[]>([]);

  const navigate = useNavigate();

  function handleBackPressed() {
    navigate("/");
  };

  function handleInputChange() {
    if (!scaleRef.current) return;
    if (!rootRef.current) return;

    const rootNoteName = rootRef.current.value.toUpperCase() as NOTE_SEMITONES_NAME_TYPES;
    const scaleName = scaleRef.current.value as ScaleTypes;

    const idx = NOTE_SEMITONE_NAMES.findIndex(e => e === rootNoteName)
    if (idx === -1) {
      setRootError("Invalid note");
      return;
    }
    getKeyScaleData(rootNoteName, scaleName);

    if (rootError) {
      setRootError("");
    }
  }

  function getKeyScaleData(rootNote: NOTE_SEMITONES_NAME_TYPES, scale: ScaleTypes) {
    const res = getScaleNotes(rootNote, scale);
    setScaleNotes(res)
    const chords = getChordsInScale(rootNote, scale);
    setScaleChords(chords);
  }

  useEffect(() => {
    handleInputChange();
  }, []);

  return (
    <div className={styles.KeyVisualizerPageWrapper}>
      <div className={styles.SizeWrapper}>
        <BackButtonContainer onBack={handleBackPressed} />

        <div className={styles.KeyWrapper}>
          <p>Key</p>
          <div className={styles.KeyInputWrapper}>
            <SelectInput
              label=''
              htmlName='scale'
              options={NOTE_SEMITONE_NAMES.map(e => (
                { label: e, value: e }
              ))}
              ref={rootRef}
              handleChange={handleInputChange}
            />
            <SelectInput
              label=''
              htmlName='scale'
              options={SCALE_TYPES_ARR.map(e => (
                { label: e, value: e }
              ))}
              ref={scaleRef}
              handleChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles.NotesInScaleWrapper}>
          <p>Notes in scale</p>
          <div className={styles.NotesContainer}>
            {scaleNotes.map(e => <p className='heading' key={e}>{e}</p>)}
          </div>
        </div>

        <div className={styles.ChordsInScaleWrapper}>
          <p>Chords in scale</p>
          {scaleChords.map(e => (
            <ChordItem
              key={e.chordName}
              chordName={e.chordName}
              chordNotes={e.chordNotes}
              degree={e.degree}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

interface ChordItemProps {
  degree: string;
  chordName: string;
  chordNotes: string[];
}

function ChordItem({
  degree,
  chordName,
  chordNotes
}: ChordItemProps) {

  return (
    <div className={styles.ChordWrapper}>
      <div className={styles.ChordButtonContainer}>
        <p>{degree}</p>
        <div className={styles.ChordNotes}>{chordNotes.map(e => <p key={e}>{e}</p>)}</div>
        <Button text={chordName} size='small' variant='outlined' disabled />
      </div>
    </div>
  )
}
