import { useEffect, useState } from "react";
import StaffGeneration from "../StaffGeneration/StaffGeneration";
import { GenerateRandomNote, GenericNote, IsNoteEnharmonic, PrintGenericNote } from "@helpers/NoteHelpers";
import styles from './NoteDrill.module.css';
import type { DrillOptions } from "@customtypes/DrillOptions";
import Button from "../UIComponents/Button";

type Props = {
  midiNotePlayed: GenericNote | null;
  buttonNotePlayed: GenericNote | null;
  drillOptions: DrillOptions;
  handleQuit: () => void;
  forceTimerStop?: boolean;
};

export default function NoteDrill({ midiNotePlayed, buttonNotePlayed, drillOptions, handleQuit, forceTimerStop }: Props) {

  const [currentNote, setCurrentNote] = useState(new GenericNote("c", null, 4));
  const [isCorrectNotePlayed, setIsCorrectNotePlayed] = useState(false);
  const [totalCorrectNotesPlayed, setTotalCorrectNotesPlayed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(drillOptions.timer || 60);
  const [isDrillActive, setIsDrillActive] = useState(true);
  const [lastGeneralNotePlayed, setLastGeneralNotePlayed] = useState<GenericNote | null>(null);

  function GenerateNote() {
    if (!isDrillActive) return;

    const newNote = GenerateRandomNote(
      drillOptions.allowAccidentals,
      drillOptions.minOctaveRange,
      drillOptions.maxOctaveRange,
    );
    setCurrentNote(newNote);
  };

  function CheckValidNotePlayed() {
    if (midiNotePlayed) {
      setLastGeneralNotePlayed(midiNotePlayed);

      if (PrintGenericNote(currentNote) == PrintGenericNote(midiNotePlayed) || IsNoteEnharmonic(midiNotePlayed, currentNote)) {
        HandleCorrectNotePlayed();
      }
      else {
        HandleIncorrectNotePlayed()
      }
    }
    else if (buttonNotePlayed) {
      setLastGeneralNotePlayed(buttonNotePlayed);

      // Ignore octave checking
      if (currentNote.name == buttonNotePlayed.name && currentNote.accidental == currentNote.accidental) {
        HandleCorrectNotePlayed();
      }
      else {
        HandleIncorrectNotePlayed();
      }
    }
  }

  function HandleCorrectNotePlayed() {
    setIsCorrectNotePlayed(true);
    GenerateNote();
    setTotalCorrectNotesPlayed(totalCorrectNotesPlayed + 1);
  }

  function HandleIncorrectNotePlayed() {
    setIsCorrectNotePlayed(false);
  }

  function HandleTimerOut() {
    alert("Time Up!");
  }

  useEffect(() => {
    CheckValidNotePlayed();
  }, [midiNotePlayed, buttonNotePlayed]);

  useEffect(() => {
    if (!isDrillActive || forceTimerStop) return;

    if (timeLeft <= 0) {
      setIsDrillActive(false);
      HandleTimerOut();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isDrillActive]);

  return (
    <div className={styles.NoteDrillWrapper}>
      <div>
        <Button onClick={handleQuit}>Quit</Button>
      </div>
      <h4>Time Left: {timeLeft}</h4>
      <StaffGeneration currentNote={currentNote} staffOptions={drillOptions.staffOptions} />
      <button onClick={GenerateNote}>Generate Random Note</button>
      <h4>Last Note Played: {lastGeneralNotePlayed ? PrintGenericNote(lastGeneralNotePlayed) : ''}</h4>
      <h4>Current Note: {PrintGenericNote(currentNote)}</h4>
      {isCorrectNotePlayed ?
        <h4>Correct!</h4> :
        <></>
      }
      <h4>Total Correct Notes: {totalCorrectNotesPlayed}</h4>
    </div>
  );
};
