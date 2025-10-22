import { useEffect, useRef, useState } from "react";
import StaffGeneration from "@components/StaffGeneration/StaffGeneration";
import { GenerateRandomNote, GenericNote, IsNoteEnharmonic, PrintGenericNote, GenerateRandomInclusiveNote } from "@helpers/NoteHelpers";
import styles from './NoteDrill.module.css';
import Button from "@components/UIComponents/Button";
import useTimerRef from "@/hooks/useTimerRef";
import type { DrillOptions } from "@/types/DrillTypes";
import { useMidiProvider } from "@/context/MidiProvider";
import NoteButtonInput from "@components/NoteButtonInput/NoteButtonInput";

type Props = {
  drillOptions: DrillOptions;
  HandleQuit: () => void;
  forceTimerStop?: boolean;
};

export default function NoteDrill({ drillOptions, HandleQuit, forceTimerStop }: Props) {
  // Note State
  const [currentNote, setCurrentNote] = useState(new GenericNote("c", null, 4));
  const [totalCorrectNotesPlayed, setTotalCorrectNotesPlayed] = useState(0);
  const [lastGeneralNotePlayed, setLastGeneralNotePlayed] = useState<GenericNote | null>(null);
  const [lastButtonNotePlayed, SetLastButtonNotePlayed] = useState<GenericNote | null>(null);
  // Only generate notes SPECIFIED by note options
  const inclusiveNoteMode = useRef<boolean>(false);

  // Toggle States
  const [isDrillActive, setIsDrillActive] = useState(true);

  // Hooks
  const { lastNotePlayed: lastMidiNotePlayed } = useMidiProvider();

  function InitNoteDrill() {
    if (drillOptions.inclusiveNotes && drillOptions.inclusiveNotes.length > 1) {
      inclusiveNoteMode.current = true;
    }
    GenerateNote();
  }

  function GenerateNote() {
    if (!isDrillActive) return;

    let newNote: GenericNote = {} as GenericNote;
    // This will never be undefined due to check in InitNoteDrill(), but compiler gives issue
    if (drillOptions.inclusiveNotes && inclusiveNoteMode) {
      newNote = GenerateRandomInclusiveNote(drillOptions.inclusiveNotes, currentNote);
    }
    else {
      newNote = GenerateRandomNote(
        currentNote,
        drillOptions.allowAccidentals,
        drillOptions.minOctave,
        drillOptions.maxOctave,
      );
    }

    setCurrentNote(newNote);
  };

  function CheckValidMidiNotePlayed() {
    if (!lastMidiNotePlayed) return;
    setLastGeneralNotePlayed(lastMidiNotePlayed);

    if (PrintGenericNote(lastMidiNotePlayed) === PrintGenericNote(currentNote) || IsNoteEnharmonic(lastMidiNotePlayed, currentNote)) {
      HandleCorrectNotePlayed();
    }
    else {
      HandleIncorrectNotePlayed();
    }
  }

  function CheckValidButtonNotePlayed() {
    if (!lastButtonNotePlayed) return;
    setLastGeneralNotePlayed(lastButtonNotePlayed);

    // Ignores octave checking for button notes
    if (lastButtonNotePlayed.name === currentNote.name && lastButtonNotePlayed.accidental === currentNote.accidental) {
      HandleCorrectNotePlayed();
    }
    else {
      HandleIncorrectNotePlayed();
    }
  }

  function HandleCorrectNotePlayed() {
    console.log("Correct Note!")
    GenerateNote();
    setTotalCorrectNotesPlayed(totalCorrectNotesPlayed + 1);
  }

  function HandleIncorrectNotePlayed() {
    console.log("Incorrect Note!")
  }

  function HandleTimerOut() {
    setIsDrillActive(false)
    console.log("Time Up!");
  }

  // Functions to run at component start
  useEffect(() => {
    InitNoteDrill();
  }, []);

  // Input Detection
  useEffect(() => {
    if (!isDrillActive) return;
    CheckValidMidiNotePlayed();
  }, [lastMidiNotePlayed]);

  useEffect(() => {
    if (!isDrillActive) return;
    CheckValidButtonNotePlayed();
  }, [lastButtonNotePlayed]);

  return (
    <div className={styles.NoteDrillWrapper}>
      <Button onClick={HandleQuit} variant="outlined" text="Quit" />
      <div>
        <TimerDisplay duration={drillOptions.timer || 60} active={isDrillActive && !forceTimerStop} onTimeout={HandleTimerOut} />
      </div>
      <StaffGeneration currentNote={currentNote} staffOptions={drillOptions.staffOptions} />
      <Button onClick={GenerateNote} text="Generate Random Note" variant="outlined" />
      <h4>Last Note Played: {lastGeneralNotePlayed ? PrintGenericNote(lastGeneralNotePlayed) : ''}</h4>
      <h4>Current Note: {PrintGenericNote(currentNote)}</h4>
      <h4>Total Correct Notes: {totalCorrectNotesPlayed}</h4>

      <NoteButtonInput SetNotePressed={SetLastButtonNotePlayed} />
    </div>
  );
};

function TimerDisplay({ duration, active, onTimeout }: { duration: number, active: boolean, onTimeout?: () => void }) {
  const timeLeft = useTimerRef(active, duration, onTimeout);
  return <h4>Time Left: {timeLeft}</h4>;
}
