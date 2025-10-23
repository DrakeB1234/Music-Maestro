import { useCallback, useEffect, useRef, useState } from "react";
import StaffGeneration from "@components/StaffGeneration/StaffGeneration";
import { GenerateRandomNote, GenericNote, IsNoteEnharmonic, PrintGenericNote, GenerateRandomInclusiveNote } from "@helpers/NoteHelpers";
import styles from './NoteDrill.module.css';
import Button from "@components/UIComponents/Button";
import useTimerRef from "@/hooks/useTimerRef";
import type { DrillOptions } from "@/types/DrillTypes";
import { useMidiProvider } from "@/context/MidiProvider";
import NoteButtonInput from "@components/NoteButtonInput/NoteButtonInput";
import Card from "@/components/UIComponents/Card";
import { SettingsIcon } from "@/components/Icons/Icons";

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
  const { lastNotePlayed: lastMidiNotePlayed, ClearInput: ClearMidiInput } = useMidiProvider();

  function InitNoteDrill() {
    if (drillOptions.inclusiveNotes && drillOptions.inclusiveNotes.length > 1) {
      inclusiveNoteMode.current = true;
    }
    if (!drillOptions.allowedAccidentals.naturals && !drillOptions.allowedAccidentals.flats && !drillOptions.allowedAccidentals.sharps) {
      drillOptions.allowedAccidentals.naturals = true;
    }

    ClearMidiInput();
    GenerateNote();
  }

  function GenerateNote() {
    if (!isDrillActive) return;

    let newNote: GenericNote = {} as GenericNote;
    // This will never be undefined due to check in InitNoteDrill(), but compiler gives issue
    if (drillOptions.inclusiveNotes && inclusiveNoteMode.current) {
      newNote = GenerateRandomInclusiveNote(drillOptions.inclusiveNotes, currentNote);
    }
    else {
      newNote = GenerateRandomNote(
        currentNote,
        drillOptions.allowedAccidentals,
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

  const handleNoteButtonPressed = useCallback((note: GenericNote) => {
    SetLastButtonNotePlayed(note);
  }, []);

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
      <Card padding="none">
        <div className={styles.headingContainer}>
          <div className={styles.InfoContainer}>
            <p>1/9</p>
            <p>11%</p>
            <TimerDisplay duration={drillOptions.timer || 60} active={isDrillActive && !forceTimerStop} onTimeout={HandleTimerOut} />
          </div>
          <Button variant="text" icon={<SettingsIcon color="var(--color-onprimary)" />} />
        </div>
        <div className={styles.StaffContainer}>
          <StaffGeneration currentNote={currentNote} staffOptions={drillOptions.staffOptions} />
        </div>
        <p>{`${lastGeneralNotePlayed && PrintGenericNote(lastGeneralNotePlayed)} / ${PrintGenericNote(currentNote)}`}</p>
        <div className={styles.ButtonInputWrapper}>
          <NoteButtonInput SetNotePressed={handleNoteButtonPressed} />
        </div>
      </Card>
    </div>
  );
};

function TimerDisplay({ duration, active, onTimeout }: { duration: number, active: boolean, onTimeout?: () => void }) {
  const timeLeft = useTimerRef(active, duration, onTimeout);
  return <p>{formatSeconds(timeLeft)}</p>;
}

export function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
