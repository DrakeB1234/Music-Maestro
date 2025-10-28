import { GenericNote, NOTE_NAMES } from "@/helpers/NoteHelpers";
import Button from "../UIComponents/Button";
import styles from './NoteButtonInput.module.css';
import { useRef, useState } from "react";
import { FlatIcon, SharpIcon } from "../Icons/Icons";
import { useNoteInputStore } from "@/store/noteInputStore";

type ActiveAccidental = "#" | "b" | null

export default function NoteButtonInput() {
  const activeAccidental = useRef<ActiveAccidental>(null);
  const triggerButtonInput = useNoteInputStore((s) => s.triggerButtonInput);

  const handleNoteButtonPressed = (noteName: string) => {
    const genericNote = {
      name: noteName,
      accidental: activeAccidental.current,
      octave: null
    } as GenericNote
    triggerButtonInput(genericNote);
  }

  const handleSetAccidentalRef = (accidental: ActiveAccidental) => {
    activeAccidental.current = accidental;
  }

  return (
    <div className={styles.NoteButtonInputWrapper}>
      <AccidentalButtons onAccidentalSet={handleSetAccidentalRef} />
      <div className={styles.NoteButtonsContainer}>
        {NOTE_NAMES.map((e: string) => (
          <Button key={e} onClick={() => handleNoteButtonPressed(e)} variant="outlined" size="large" text={e} />
        ))}
      </div>
    </div>
  )
}

interface AccidentalButtonsProps {
  onAccidentalSet: (accidental: ActiveAccidental) => void;
}

function AccidentalButtons({ onAccidentalSet }: AccidentalButtonsProps) {
  const [activeAccidental, setActiveAccidental] = useState<ActiveAccidental>(null);

  const handleAccidentalButtonPressed = (accidental: ActiveAccidental) => {
    if (accidental === activeAccidental) {
      setActiveAccidental(null);
      onAccidentalSet(null);
      return
    }
    onAccidentalSet(accidental);
    setActiveAccidental(accidental);
  }

  return (
    <div className={styles.AccidentalButtonsContainer}>
      <Button active={activeAccidental === "#" ? true : false} onClick={() => handleAccidentalButtonPressed("#")} variant="outlined" icon={<SharpIcon />} />
      <Button active={activeAccidental === "b" ? true : false} onClick={() => handleAccidentalButtonPressed("b")} variant="outlined" icon={<FlatIcon />} />
    </div>
  )
}