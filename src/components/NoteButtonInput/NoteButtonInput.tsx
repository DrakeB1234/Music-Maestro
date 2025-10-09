import { GenericNote, NOTE_NAMES } from "@/helpers/NoteHelpers";
import Button from "../UIComponents/Button";
import styles from './NoteButtonInput.module.css';
import { useState } from "react";

type Props = {
  SetNotePressed: (note: GenericNote) => void
}

type ActiveAccidental = "#" | "b" | null

export default function NoteButtonInput({ SetNotePressed: NotePressed }: Props) {

  const [activeAccidental, setActiveAccidental] = useState<ActiveAccidental>(null);

  const HandleNoteButtonPressed = (noteName: string) => {
    const genericNote = {
      name: noteName,
      accidental: activeAccidental,
      octave: null
    } as GenericNote
    NotePressed(genericNote);
    return;
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
      <div className={styles.ButtonsWrapper}>
        <div className={styles.AccidentalButtonsContainer}>
          <Button active={activeAccidental === "#" ? true : false} onClick={() => HandleAccidentalButtonPressed("#")}>#</Button>
          <Button active={activeAccidental === "b" ? true : false} onClick={() => HandleAccidentalButtonPressed("b")}>b</Button>
        </div>
        <div className={styles.NoteButtonsContainer}>
          {NOTE_NAMES.map((e: string) => (
            <Button key={e} onClick={() => HandleNoteButtonPressed(e)}>{e}</Button>
          ))}
        </div>
      </div>
    </div>
  )
}
