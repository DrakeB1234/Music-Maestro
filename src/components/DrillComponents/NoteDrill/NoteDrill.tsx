import DrillStaff from "@/components/DrillComponents/DrillStaff/DrillStaff";
import styles from './NoteDrill.module.css';
import Card from "@/components/UIComponents/Card";
import { CheckValidButtonNotePlayed, CheckValidMidiNotePlayed, GenerateRandomInclusiveNote, GenerateRandomNote, GenericNote, PrintGenericNote } from "@/helpers/NoteHelpers";
import { useNoteDrillStore } from "@/store/noteDrillStore";
import NoteButtonInput from "@/components/NoteButtonInput/NoteButtonInput";
import { useEffect } from "react";
import { useNoteInputStore } from "@/store/noteInputStore";
import { formatSeconds } from "@/helpers/helpers";

export default function NoteDrill() {
  // Store states
  const setCurrentNote = useNoteDrillStore((state) => state.setCurrentNote);
  const incrementTotalNotesPlayed = useNoteDrillStore((state) => state.incrementTotalNotesPlayed);
  const incrementCorrectNotesPlayed = useNoteDrillStore((state) => state.incrementCorrectNotesPlayed);
  const setPlayedNote = useNoteDrillStore((state) => state.setPlayedNote);
  const setPlayedNoteStatus = useNoteDrillStore((state) => state.setPlayedNoteStatus);

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
      handleCorrectNotePlayed();
      return;
    };
    handleIncorrectNotePlayed();
  }

  function handleMidiPlayed(note: GenericNote) {
    const isDrillTimerRunning = useNoteDrillStore.getState().isDrillTimerRunning;
    if (!isDrillTimerRunning) return;

    const currentNote = useNoteDrillStore.getState().currentNote;
    setPlayedNote(note);

    if (currentNote && CheckValidMidiNotePlayed(note, currentNote)) {
      handleCorrectNotePlayed();
      return;
    };
    handleIncorrectNotePlayed();
  };

  function handleIncorrectNotePlayed() {
    incrementTotalNotesPlayed();
    setPlayedNoteStatus("wrong");
  }

  function handleCorrectNotePlayed() {
    handleGenerateNote();
    incrementCorrectNotesPlayed();
    incrementTotalNotesPlayed();
    setPlayedNoteStatus("correct");
  }

  function handleDrillTimeout() {
    console.log("OVER");
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
  // const playedNote = useNoteDrillStore((state) => state.playedNote);

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


