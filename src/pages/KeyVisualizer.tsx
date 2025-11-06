import styles from './KeyVisualizerPage.module.css';
import { useNavigate } from 'react-router-dom';
import BackButtonContainer from '@/components/BackButtonContainer/BackButtonContainer';
import Input from '@/components/UIComponents/Inputs/Input';
import SelectInput from '@/components/UIComponents/Inputs/SelectInput';
import { getChordsInScale, getScale, NOTE_SEMITONE_NAMES, type ScaleChordsReturn } from '@/helpers/NoteHelpers';
import Button from '@/components/UIComponents/Button';
import { useRef, useState } from 'react';
import { type NOTE_SEMITONES_NAME_TYPES, type ScaleTypes } from '@/types/DrillTypes';

export default function KeyVisualizerPage() {
  const rootRef = useRef<HTMLInputElement>(null);
  const scaleRef = useRef<HTMLSelectElement>(null);
  const [rootError, setRootError] = useState<string>("");
  const [scaleNotes, setScaleNotes] = useState<string[]>(getScale("C", "Major"));
  const [scaleChords, setScaleChords] = useState<ScaleChordsReturn>(getChordsInScale("C", "Major"));

  const navigate = useNavigate();

  function handleBackPressed() {
    navigate("/");
  };

  function handleInputBlur() {
    if (!scaleRef.current) return;
    if (!rootRef.current) return;

    const rootNoteName = rootRef.current.value.toUpperCase() as NOTE_SEMITONES_NAME_TYPES;
    const scaleName = scaleRef.current.value as ScaleTypes;

    const idx = NOTE_SEMITONE_NAMES.findIndex(e => e === rootNoteName)
    if (idx === -1) {
      setRootError("Invalid note");
      return;
    }
    if (rootError) {
      setRootError("");
    }

    setScaleNotes(getScale(rootNoteName, scaleName));

    setScaleChords(getChordsInScale(rootNoteName, scaleName));
  }

  return (
    <div className={styles.KeyVisualizerPageWrapper}>
      <div className={styles.SizeWrapper}>
        <BackButtonContainer onBack={handleBackPressed} />

        <div className={styles.KeyWrapper}>
          <p>Key</p>
          <div className={styles.KeyInputWrapper}>
            <Input
              label=''
              htmlName='rootnote'
              placeholder='C'
              type='text'
              defaultValue={"C"}
              ref={rootRef}
              onBlur={handleInputBlur}
              error={rootError}
              style={{ textTransform: "uppercase" }}
            />
            <SelectInput
              label=''
              htmlName='scale'
              options={[
                { label: "Major", value: "Major" },
                { label: "Minor", value: "Minor" },
              ]}
              ref={scaleRef}
              handleChange={handleInputBlur}
            />
          </div>
        </div>

        <div className={styles.NotesInScaleWrapper}>
          <p>Notes in scale</p>
          <div className={styles.NotesContainer}>
            {scaleNotes.map(e => <p className='heading' key={e}>{e}</p>)}
          </div>
          <Button text='Play notes' variant='outlined' />
        </div>

        <div className={styles.ChordsInScaleWrapper}>
          <p>Chords in scale</p>
          {scaleChords.map(e => (
            <ChordItem
              key={e.degree}
              degree={e.degree}
              chordName={e.chordName}
              chordNotes={e.notes}
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
        <Button text={chordName} size='small' variant='outlined' />
      </div>
      <div className={styles.ChordNotes}>{chordNotes.map(e => <p key={e}>{e}</p>)}</div>
    </div>
  )
}
