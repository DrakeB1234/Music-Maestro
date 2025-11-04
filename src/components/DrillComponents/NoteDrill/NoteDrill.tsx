import DrillStaff from "@/components/DrillComponents/DrillStaff/DrillStaff";
import styles from './NoteDrill.module.css';
import Card from "@/components/UIComponents/Card";
import { CheckValidButtonNotePlayed, CheckValidMidiNotePlayed, GenerateRandomInclusiveNote, GenerateRandomNote, GenericNote, PrintGenericNote } from "@/helpers/NoteHelpers";
import { useNoteDrillStore } from "@/store/noteDrillStore";
import NoteButtonInput from "@/components/NoteButtonInput/NoteButtonInput";
import { useEffect, useRef } from "react";
import { useNoteInputStore } from "@/store/noteInputStore";
import { formatSeconds } from "@/helpers/helpers";
import { PianoAudioPlayer } from "@/helpers/PianoAudioPlayer";
import { useModal } from "@/context/ModalProvider";
import DrillOver from "@/components/ModalComponents/DrillOver/DrillOver";
import { useNavigate } from "react-router-dom";
import { useDrillProgressResults } from "@/hooks/useDrillProgressResultStorage";

const MAX_SCORE: number = 150;
const SCORE_DECAY_RATE: number = 0.0004;

export default function NoteDrill() {
  // Store states
  const setCurrentNote = useNoteDrillStore((state) => state.setCurrentNote);
  const setPlayedNote = useNoteDrillStore((state) => state.setPlayedNote);
  const setPlayedNoteStatus = useNoteDrillStore((state) => state.setPlayedNoteStatus);
  const setTimeSinceLastCorrectNote = useNoteDrillStore((state) => state.setTimeSinceLastCorrectNote);
  const setDrillScore = useNoteDrillStore((state) => state.setDrillScore);
  const setIsDrillStarted = useNoteDrillStore((state) => state.setIsDrillStarted);
  const resetDrillOptions = useNoteDrillStore((state) => state.resetDrillOptions);
  const setDrillOptions = useNoteDrillStore((state) => state.setDrillOptions);

  const setButtonInputListener = useNoteInputStore((state) => state.setButtonInputListener);
  const addMidiListener = useNoteInputStore((state) => state.addMidiListener);
  const removeMidiListener = useNoteInputStore((state) => state.removeMidiListener);

  const { addResult } = useDrillProgressResults();

  const totalNotesPlayed = useRef<number>(0);
  const correctNotesPlayed = useRef<number>(0);

  const { openModal, setPreventClose, closeModal } = useModal();
  const navigate = useNavigate();

  function handleGenerateNote() {
    const drillOptions = useNoteDrillStore.getState().drillOptions;
    if (!drillOptions) return;

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
    const isDrillRunning = useNoteDrillStore.getState().isDrillStarted;
    if (!isDrillRunning) return;

    const currentNote = useNoteDrillStore.getState().currentNote;
    setPlayedNote(note);

    if (currentNote && CheckValidButtonNotePlayed(note, currentNote)) {
      note.octave = currentNote?.octave || null;
      handleCorrectNotePlayed(currentNote);
      return;
    };

    note.octave = currentNote?.octave || null;
    handleIncorrectNotePlayed(note);
  }

  function handleMidiPlayed(note: GenericNote) {
    const isDrillRunning = useNoteDrillStore.getState().isDrillStarted;
    if (!isDrillRunning) return;

    const currentNote = useNoteDrillStore.getState().currentNote;
    setPlayedNote(note);

    if (currentNote && CheckValidMidiNotePlayed(note, currentNote)) {
      handleCorrectNotePlayed(note);
      return;
    };
    handleIncorrectNotePlayed(note);
  };

  function handleIncorrectNotePlayed(note: GenericNote) {
    totalNotesPlayed.current += 1;
    setPlayedNoteStatus("wrong", note);
  }

  function handleCorrectNotePlayed(note: GenericNote) {
    handleGenerateNote();
    totalNotesPlayed.current += 1;
    correctNotesPlayed.current += 1;

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
    const score = useNoteDrillStore.getState().drillScore;
    const drillOptions = useNoteDrillStore.getState().drillOptions;
    const drillTime = drillOptions?.timer ? drillOptions.timer : 1;
    const correctNotesPerMinute = Math.round(correctNotesPlayed.current / drillTime * 60);

    console.log(correctNotesPerMinute)

    // Only store data if drillId is provided (id's are only set on preset drills)
    if (drillOptions?.drillId) {
      addResult({
        id: drillOptions.drillId,
        correctNotes: correctNotesPlayed.current,
        totalNotes: totalNotesPlayed.current,
        score: score,
        correctNotesPerMinute: correctNotesPerMinute
      });
    };

    setIsDrillStarted(false);
    handleOpenModal();
  };

  function handleDrillExit() {
    setPreventClose(false);
    closeModal();
    resetDrillOptions();
    navigate("/");
  };

  function handleDrillTryAgain() {
    const drillOptions = useNoteDrillStore.getState().drillOptions;
    correctNotesPlayed.current = 0;
    totalNotesPlayed.current = 0;
    setDrillScore(0);

    if (drillOptions) {
      setDrillOptions({ ...drillOptions });
    };

    setPreventClose(false);
    closeModal();
  };

  const handleOpenModal = () => {
    const drillScore = useNoteDrillStore.getState().drillScore;

    setPreventClose(true);
    openModal(
      <DrillOver
        drillScore={drillScore}
        correctNotesPlayed={correctNotesPlayed.current}
        totalNotesPlayed={totalNotesPlayed.current}
        handleDrillExit={handleDrillExit}
        handleDrillTryAgain={handleDrillTryAgain}
      />
    );
  };

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
          <DrillScore />
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

function DrillScore() {
  const drillScore = useNoteDrillStore((state) => state.drillScore);

  return (
    <p>{drillScore}</p>
  )
}

interface DrillTimerProps {
  handleTimeOut: () => void;
}

function DrillTimer({ handleTimeOut }: DrillTimerProps) {
  const drillTime = useNoteDrillStore((state) => state.drillTime);
  const isDrillStarted = useNoteDrillStore((state) => state.isDrillStarted);
  const decrementDrillTime = useNoteDrillStore((state) => state.decrementDrillTime);

  useEffect(() => {
    if (!isDrillStarted) return;

    if (drillTime < 1) {
      handleTimeOut();
      return;
    };

    const interval = setInterval(() => {
      decrementDrillTime();
    }, 1000);

    return () => {
      clearInterval(interval)
    };
  }, [drillTime]);

  return (
    <p>{formatSeconds(drillTime)}</p>
  )

}


