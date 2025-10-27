import { GenericNote, NOTE_NAMES } from "@/helpers/NoteHelpers";
import Button from "../UIComponents/Button";
import styles from './NoteButtonInput.module.css';
import { useState } from "react";
import { FlatIcon, SharpIcon } from "../Icons/Icons";
import { useNoteInputStore } from "@/store/noteInputStore";

type Props = {
}

type ActiveAccidental = "#" | "b" | null

export default function NoteButtonInput() {
  const triggerButtonInput = useNoteInputStore((s) => s.triggerButtonInput);
  const [activeAccidental, setActiveAccidental] = useState<ActiveAccidental>(null);

  const HandleNoteButtonPressed = (noteName: string) => {
    const genericNote = {
      name: noteName,
      accidental: activeAccidental,
      octave: null
    } as GenericNote
    triggerButtonInput(genericNote);
  }

  const HandleAccidentalButtonPressed = (accidental: ActiveAccidental) => {
    if (accidental === activeAccidental) {
      setActiveAccidental(null);
      return
    }
    setActiveAccidental(accidental);
  }

  return (
    <div className={styles.NoteButtonInputWrapper}>
      <div className={styles.AccidentalButtonsContainer}>
        <Button active={activeAccidental === "#" ? true : false} onClick={() => HandleAccidentalButtonPressed("#")} variant="outlined" icon={<SharpIcon />} />
        <Button active={activeAccidental === "b" ? true : false} onClick={() => HandleAccidentalButtonPressed("b")} variant="outlined" icon={<FlatIcon />} />
      </div>
      <div className={styles.NoteButtonsContainer}>
        {NOTE_NAMES.map((e: string) => (
          <Button key={e} onClick={() => HandleNoteButtonPressed(e)} variant="outlined" size="large" text={e} />
        ))}
      </div>
    </div>
  )
}