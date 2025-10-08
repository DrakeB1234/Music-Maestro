import { useEffect, useState } from "react";
import StaffGeneration from "../StaffGeneration/StaffGeneration";
import { GenerateRandomNote, GenericNote, IsNoteEnharmonic, NOTE_NAMES, PrintGenericNote } from "@helpers/NoteHelpers";
import styles from './NoteDrill.module.css';
import type { DrillOptions } from "@customtypes/DrillOptions";
import Button from "../UIComponents/Button";
import React from "react";
import useTimerRef from "@/hooks/useTimerRef";

type Props = {
  midiNotePlayed: GenericNote | null;
  buttonNotePlayed: GenericNote | null;
  drillOptions: DrillOptions;
  HandleQuit: () => void;
  forceTimerStop?: boolean;
};

export default function NoteDrill({ midiNotePlayed, buttonNotePlayed, drillOptions, HandleQuit, forceTimerStop }: Props) {

  const [currentNote, setCurrentNote] = useState(new GenericNote("c", null, 4));
  const [isCorrectNotePlayed, setIsCorrectNotePlayed] = useState(false);
  const [totalCorrectNotesPlayed, setTotalCorrectNotesPlayed] = useState(0);
  const [isDrillActive, setIsDrillActive] = useState(true);
  const [lastGeneralNotePlayed, setLastGeneralNotePlayed] = useState<GenericNote | null>(null);

  function GenerateNote() {
    if (!isDrillActive) return;

    const newNote = GenerateRandomNote(
      drillOptions.allowAccidentals,
      drillOptions.minOctaveRange,
      drillOptions.maxOctaveRange,
    );

    if (newNote.name === currentNote.name) {
      newNote.name = NOTE_NAMES[Math.floor(Math.random() * NOTE_NAMES.length)];
    }
    setCurrentNote(newNote);
  };

  function CheckValidMidiNotePlayed() {
    if (!midiNotePlayed) return;
    setLastGeneralNotePlayed(midiNotePlayed);

    if (PrintGenericNote(midiNotePlayed) === PrintGenericNote(currentNote) || IsNoteEnharmonic(midiNotePlayed, currentNote)) {
      HandleCorrectNotePlayed();
    }
    else {
      HandleIncorrectNotePlayed();
    }
  }

  function CheckValidButtonNotePlayed() {
    if (!buttonNotePlayed) return;
    setLastGeneralNotePlayed(buttonNotePlayed);

    if (buttonNotePlayed.name === currentNote.name && buttonNotePlayed.accidental === currentNote.accidental) {
      HandleCorrectNotePlayed();
    }
    else {
      HandleIncorrectNotePlayed();
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
    console.log("Time Up!");
  }

  // Functions to run at component start
  useEffect(() => {
    GenerateNote();
  }, []);

  // Input Detection
  useEffect(() => {
    if (!isDrillActive) return;
    CheckValidMidiNotePlayed();
  }, [midiNotePlayed]);

  useEffect(() => {
    if (!isDrillActive) return;
    CheckValidButtonNotePlayed();
  }, [buttonNotePlayed]);

  return (
    <div className={styles.NoteDrillWrapper}>
      <Button onClick={HandleQuit}>Quit</Button>
      <div>
        <TimerDisplay duration={60} active={isDrillActive && !forceTimerStop} onTimeout={HandleTimerOut} />
      </div>
      <StaffGeneration currentNote={currentNote} staffOptions={drillOptions.staffOptions} />
      <Button size="sm" onClick={GenerateNote}>Generate Random Note</Button>
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

function TimerDisplay({ duration, active, onTimeout }: { duration: number, active: boolean, onTimeout?: () => void }) {
  const timeLeft = useTimerRef(active, duration, onTimeout);
  return <h4>Time Left: {timeLeft}</h4>;
}
