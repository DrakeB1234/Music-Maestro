import { useEffect, useState } from "react";
import StaffGeneration from "../StaffGeneration/StaffGeneration";
import { GenerateRandomNote, GenericNote, PrintGenericNote } from "../../helpers/NoteHelpers";
import styles from './NoteDrill.module.css';

type Props = {
  midiNotePlayed: GenericNote | null
};

export default function NoteDrill({ midiNotePlayed }: Props) {

  const [currentNote, setCurrentNote] = useState(new GenericNote("c", null, 4));
  const [isCorrectNotePlayed, setIsCorrectNotePlayed] = useState(false);

  function GenerateNote() {
    const newNote = GenerateRandomNote(true);
    setCurrentNote(newNote);
  };

  function CheckValidNotePlayed() {
    if (!midiNotePlayed) return;
    if (PrintGenericNote(currentNote) == PrintGenericNote(midiNotePlayed)) {
      setIsCorrectNotePlayed(true);
    }
    else {
      setIsCorrectNotePlayed(false);
    }
  }

  useEffect(() => {
    CheckValidNotePlayed();
  }, [midiNotePlayed]);

  return (
    <div className={styles.NoteDrillWrapper}>
      <StaffGeneration currentNote={currentNote} />
      <button onClick={GenerateNote}>Generate Random Note</button>
      <h4>Last Note Played: {midiNotePlayed ? PrintGenericNote(midiNotePlayed) : ''}</h4>
      <h4>Current Note: {PrintGenericNote(currentNote)}</h4>
      {isCorrectNotePlayed ?
        <h4>Correct!</h4> :
        <></>
      }
    </div>
  );
};
