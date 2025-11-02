import DrillStaff from "@/components/DrillComponents/DrillStaff/DrillStaff";
import styles from './NoteDrill.module.css';
import Card from "@/components/UIComponents/Card";
import { CheckValidButtonNotePlayed, CheckValidMidiNotePlayed, GenerateRandomInclusiveNote, GenerateRandomNote, GenericNote, PrintGenericNote } from "@/helpers/NoteHelpers";
import { useNoteDrillStore } from "@/store/noteDrillStore";
import NoteButtonInput from "@/components/NoteButtonInput/NoteButtonInput";
import { useEffect } from "react";
import { useNoteInputStore } from "@/store/noteInputStore";
import { formatSeconds } from "@/helpers/helpers";
import { PianoAudioPlayer } from "@/helpers/PianoAudioPlayer";

const MAX_SCORE: number = 200;
const SCORE_DECAY_RATE: number = 0.0002;

export default function NoteDrill() {
  // Store states
  const setCurrentNote = useNoteDrillStore((state) => state.setCurrentNote);
  const incrementTotalNotesPlayed = useNoteDrillStore((state) => state.incrementTotalNotesPlayed);
  const incrementCorrectNotesPlayed = useNoteDrillStore((state) => state.incrementCorrectNotesPlayed);
  const setPlayedNote = useNoteDrillStore((state) => state.setPlayedNote);
  const setPlayedNoteStatus = useNoteDrillStore((state) => state.setPlayedNoteStatus);
  const setTimeSinceLastCorrectNote = useNoteDrillStore((state) => state.setTimeSinceLastCorrectNote);
  const setDrillScore = useNoteDrillStore((state) => state.setDrillScore);
  // const resetDrillOptions = useNoteDrillStore((state) => state.resetDrillOptions);

  const setButtonInputListener = useNoteInputStore(
    (s) => s.setButtonInputListener
  );
  const addMidiListener = useNoteInputStore((state) => state.addMidiListener);
  const removeMidiListener = useNoteInputStore((state) => state.removeMidiListener);

  function handleGenerateNote() {
    const isDrillTimerRunning = useNoteDrillStore.getState().isDrillTimerRunning;
    const drillOptions = useNoteDrillStore.getState().drillOptions;
    if (!isDrillTimerRunning || !drillOptions) return;

    const currentNote = useNoteDrillStore.getState().currentNote;

    let newNote: GenericNote | null = null;

    if (drillOptions.inclusiveNotes && drillOptions.inclusiveNotes?.length > 1) {
      newNote = GenerateRandomInclusiveNote(
        drillOptions.inclusiveNotes,
        currentNote ? currentNote : null,
      );
    }
    else if (drillOptions.octaveRange) {
      newNote = GenerateRandomNote(
        currentNote ? currentNote : null,
        drillOptions.octaveRange,
        drillOptions.allowedAccidentals
      );
    }

    if (newNote) setCurrentNote(newNote);
  }

  function handleButtonPlayed(note: GenericNote) {
    const isDrillTimerRunning = useNoteDrillStore.getState().isDrillTimerRunning;
    if (!isDrillTimerRunning) return;

    const currentNote = useNoteDrillStore.getState().currentNote;
    setPlayedNote(note);

    if (currentNote && CheckValidButtonNotePlayed(note, currentNote)) {
      note.octave = currentNote?.octave || null;
      handleCorrectNotePlayed(note);
      return;
    };

    note.octave = currentNote?.octave || null;
    handleIncorrectNotePlayed(note);
  }

  function handleMidiPlayed(note: GenericNote) {
    const isDrillTimerRunning = useNoteDrillStore.getState().isDrillTimerRunning;
    if (!isDrillTimerRunning) return;

    const currentNote = useNoteDrillStore.getState().currentNote;
    setPlayedNote(note);

    if (currentNote && CheckValidMidiNotePlayed(note, currentNote)) {
      handleCorrectNotePlayed(note);
      return;
    };
    handleIncorrectNotePlayed(note);
  };

  function handleIncorrectNotePlayed(note: GenericNote) {
    incrementTotalNotesPlayed();
    setPlayedNoteStatus("wrong", note);
  }

  function handleCorrectNotePlayed(note: GenericNote) {
    handleGenerateNote();
    incrementCorrectNotesPlayed();
    incrementTotalNotesPlayed();
    setPlayedNoteStatus("correct", note);
    determineScoreAwarded();
    PianoAudioPlayer.playNote(note);
  }

  function determineScoreAwarded() {
    const timeSinceLastCorrectNote = useNoteDrillStore.getState().timeSinceLastCorrectNote;
    const timeCorrectNotePlayed: number = Date.now();
    const elapsedTime = timeCorrectNotePlayed - timeSinceLastCorrectNote;
    setTimeSinceLastCorrectNote(timeCorrectNotePlayed);

    let score = Math.round(MAX_SCORE * Math.exp(-SCORE_DECAY_RATE * elapsedTime));
    score = Math.max(score, 0);
    setDrillScore(score);
  }

  function handleDrillTimeout() {
    const drillScore = useNoteDrillStore.getState().drillScore;
    // resetDrillOptions();
    console.log(`TIMEOUT: SCORE ${drillScore}`);
  }

  useEffect(() => {
    setButtonInputListener((note) => handleButtonPlayed(note));

  }, [setButtonInputListener]);

  useEffect(() => {
    addMidiListener(handleMidiPlayed);

    return () => {
      removeMidiListener(handleMidiPlayed);
    }
  }, [addMidiListener, removeMidiListener]);

  useEffect(() => {
    handleGenerateNote();
  }, []);

  return (
    <div className={styles.NoteDrillWrapper}>
      <Card>
        <div className={styles.TopBarWrapper}>
          <DrillTimer handleTimeOut={handleDrillTimeout} />
          <Stats />
        </div>
        <StatusBar />
        <DrillStaff />
        <Info />
        <div className={styles.ButtonInputWrapper}>
          <NoteButtonInput />
        </div>
      </Card>
    </div>
  );
};

function StatusBar() {
  const playedNoteStatus = useNoteDrillStore((state) => state.playedNoteStatus);
  const determineClassNameStatus = playedNoteStatus == "correct" ? styles.StatusBarSuccess : playedNoteStatus == "wrong" ? styles.StatusBarError : '';

  return (
    <div className={`${styles.StatusBarContainer} ${determineClassNameStatus}`} />
  )
}

function Info() {
  const currentNote = useNoteDrillStore((state) => state.currentNote);

  return (
    <p className={styles.CurrentNoteContainer}>{currentNote && PrintGenericNote(currentNote)}</p>
  )
}

function Stats() {
  const totalNotesPlayed = useNoteDrillStore((state) => state.totalNotesPlayed);
  const correctNotesPlayed = useNoteDrillStore((state) => state.correctNotesPlayed);
  const calculatePercentage = Math.ceil((correctNotesPlayed / totalNotesPlayed) * 100);
  const correctPercentage = !isNaN(calculatePercentage) ? calculatePercentage + "%" : "0%"

  return (
    <>
      <p>{correctPercentage}</p>
      <p>{correctNotesPlayed}/{totalNotesPlayed}</p>
    </>
  )
}

interface DrillTimerProps {
  handleTimeOut: () => void;
}

function DrillTimer({ handleTimeOut }: DrillTimerProps) {
  const isDrillTimerRunning = useNoteDrillStore((state) => state.isDrillTimerRunning);
  const drillTime = useNoteDrillStore((state) => state.drillTime);
  const decrementDrillTime = useNoteDrillStore((state) => state.decrementDrillTime);

  useEffect(() => {
    if (!isDrillTimerRunning) {
      handleTimeOut();
      return;
    };

    const interval = setInterval(() => {
      decrementDrillTime();
    }, 1000);

    return () => {
      clearInterval(interval)
    };
  }, [isDrillTimerRunning, decrementDrillTime]);

  return (
    <p>{formatSeconds(drillTime)}</p>
  )

}


