import { useEffect, useState } from "react";
import StaffGeneration from "../StaffGeneration/StaffGeneration";
import { GenerateRandomNote, GenerateRandomOverrideNote, GenericNote, IsNoteEnharmonic, PrintGenericNote } from "@helpers/NoteHelpers";
import styles from './NoteDrill.module.css';
import type { DrillOptions } from "@customtypes/DrillOptions";

type Props = {
  midiNotePlayed: GenericNote | null
  drillOptions: DrillOptions
};

export default function NoteDrill({ midiNotePlayed, drillOptions }: Props) {

  const [currentNote, setCurrentNote] = useState(new GenericNote("c", null, 4));
  const [isCorrectNotePlayed, setIsCorrectNotePlayed] = useState(false);
  const [totalCorrectNotesPlayed, setTotalCorrectNotesPlayed] = useState(0);

  function GenerateNote() {
    let newNote = null;
    if (drillOptions.overrideAllowedNotes && drillOptions.overrideAllowedNotes.length > 0) {
      newNote = GenerateRandomOverrideNote(drillOptions.overrideAllowedNotes);
    }
    else {
      newNote = GenerateRandomNote(
        drillOptions.allowAccidentals,
        drillOptions.minOctaveRange,
        drillOptions.maxOctaveRange,
      );
    }
    setCurrentNote(newNote);
  };

  function CheckValidNotePlayed() {
    if (!midiNotePlayed) return;
    if (PrintGenericNote(currentNote) == PrintGenericNote(midiNotePlayed) || IsNoteEnharmonic(midiNotePlayed, currentNote)) {
      setIsCorrectNotePlayed(true);
      GenerateNote();
      setTotalCorrectNotesPlayed(totalCorrectNotesPlayed + 1);
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
      <StaffGeneration currentNote={currentNote} staffOptions={drillOptions.staffOptions} />
      <button onClick={GenerateNote}>Generate Random Note</button>
      <h4>Last Note Played: {midiNotePlayed ? PrintGenericNote(midiNotePlayed) : ''}</h4>
      <h4>Current Note: {PrintGenericNote(currentNote)}</h4>
      {isCorrectNotePlayed ?
        <h4>Correct!</h4> :
        <></>
      }
      <h4>Total Correct Notes: {totalCorrectNotesPlayed}</h4>
    </div>
  );
};
