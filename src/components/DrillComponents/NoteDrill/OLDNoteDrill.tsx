import { useEffect, useRef, useState } from "react";
import StaffGeneration from "@components/StaffGeneration/StaffGeneration";
import { GenerateRandomNote, GenericNote, IsNoteEnharmonic, PrintGenericNote, GenerateRandomInclusiveNote } from "@helpers/NoteHelpers";
import styles from './NoteDrill.module.css';
import Button from "@components/UIComponents/Button";
import type { DrillOptions } from "@/types/DrillTypes";
import { useMidiProvider } from "@/context/MidiProvider";
import NoteButtonInput from "@components/NoteButtonInput/NoteButtonInput";
import Card from "@/components/UIComponents/Card";
import { SettingsIcon } from "@/components/Icons/Icons";
import React from "react";
import TimerDisplay from "@/components/TimerDisplay";

type Props = {
  drillOptions: DrillOptions;
  HandleQuit: () => void;
  forceTimerStop?: boolean;
};

const startingNote = {
  name: "C",
  accidental: null
} as GenericNote;

export default function NoteDrill({ drillOptions, HandleQuit, forceTimerStop }: Props) {
  // Note State
  const [currentNote, setCurrentNote] = useState(startingNote);
  const [totalNotesPlayed, setTotalNotesPlayed] = useState(0);
  const [lastButtonNotePlayed, SetLastButtonNotePlayed] = useState<GenericNote | null>(null);
  const totalCorrectNotesPlayed = useRef<number>(0);

  // Only generate notes SPECIFIED by note options
  const inclusiveNoteMode = useRef<boolean>(false);

  // Toggle States
  const [isDrillActive, setIsDrillActive] = useState(true);

  // Hooks
  const { lastNotePlayed: lastMidiNotePlayed, ClearInput: ClearMidiInput, ForceInput } = useMidiProvider();

  // Memoed components
  const buttonInputs = React.useMemo(() =>
    <NoteButtonInput SetNotePressed={SetLastButtonNotePlayed} />
    , []);

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

    if (PrintGenericNote(lastMidiNotePlayed) === PrintGenericNote(currentNote) || IsNoteEnharmonic(lastMidiNotePlayed, currentNote)) {
      HandleCorrectNotePlayed();
    }
    else {
      HandleIncorrectNotePlayed();
    }
    setTotalNotesPlayed(totalNotesPlayed + 1);
  }

  function CheckValidButtonNotePlayed() {
    if (!lastButtonNotePlayed) return;

    // Ignores octave checking for button notes
    if (lastButtonNotePlayed.name === currentNote.name && lastButtonNotePlayed.accidental === currentNote.accidental) {
      HandleCorrectNotePlayed();
    }
    else {
      HandleIncorrectNotePlayed();
    }
    setTotalNotesPlayed(totalNotesPlayed + 1);
  }

  function HandleCorrectNotePlayed() {
    GenerateNote();
    totalCorrectNotesPlayed.current += 1;
  }

  function HandleIncorrectNotePlayed() {
  }

  function HandleTimerOut() {
    setIsDrillActive(false)
  }

  function DisplayCorrectNotes(): string {
    return `${totalCorrectNotesPlayed.current} / ${totalNotesPlayed}`
  }

  function DisplayCorrectPercentage(): string {
    const value = Math.floor((totalCorrectNotesPlayed.current / totalNotesPlayed) * 100);
    return !isNaN(value) ? `${value}%` : ''
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
      <Card>
        <div className={styles.headingContainer}>
          <div className={styles.InfoContainer}>
            <p>Correct: {DisplayCorrectNotes()}</p>
            <p>{DisplayCorrectPercentage()}</p>
            <TimerDisplay duration={drillOptions.timer || 60} onTimeout={HandleTimerOut} />
          </div>
          <Button variant="text" icon={<SettingsIcon color="var(--color-onprimary)" />} />
        </div>
        <div className={styles.StaffContainer}>
          <StaffGeneration currentNote={currentNote} staffOptions={drillOptions.staffOptions} />
        </div>
        <p>{PrintGenericNote(currentNote)}</p>
        <div className={styles.ButtonInputWrapper}>
          {buttonInputs}
        </div>
        <Button text="force midi" onClick={ForceInput} />
      </Card>
    </div>
  );
};


