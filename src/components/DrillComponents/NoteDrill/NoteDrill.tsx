import StaffGeneration from "@components/StaffGeneration/StaffGeneration";
import styles from './NoteDrill.module.css';
import Button from "@components/UIComponents/Button";
import Card from "@/components/UIComponents/Card";
import { CheckValidButtonNotePlayed, CheckValidMidiNotePlayed, GenerateRandomInclusiveNote, GenerateRandomNote, GenericNote, PrintGenericNote } from "@/helpers/NoteHelpers";
import { useNoteDrillStore } from "@/store/noteDrillStore";
import NoteButtonInput from "@/components/NoteButtonInput/NoteButtonInput";
import { useEffect } from "react";
import { useNoteInputStore } from "@/store/noteInputStore";

export default function NoteDrill() {
  // Store states
  const drillOptions = useNoteDrillStore((state) => state.drillOptions);
  const setCurrentNote = useNoteDrillStore((state) => state.setCurrentNote);
  const incrementTotalNotesPlayed = useNoteDrillStore((state) => state.incrementTotalNotesPlayed);
  const incrementCorrectNotesPlayed = useNoteDrillStore((state) => state.incrementCorrectNotesPlayed);
  const setPlayedNote = useNoteDrillStore((state) => state.setPlayedNote);

  const setButtonInputListener = useNoteInputStore(
    (s) => s.setButtonInputListener
  );
  const addMidiListener = useNoteInputStore((state) => state.addMidiListener);
  const removeMidiListener = useNoteInputStore((state) => state.removeMidiListener);
  const forceMidiInput = useNoteInputStore((state) => state.forceMidiInput);
  const connectMidiDevice = useNoteInputStore((state) => state.connectMidiDevice);

  function handleGenerateNote() {
    const { currentNote } = useNoteDrillStore.getState();
    let newNote: GenericNote;

    if (drillOptions.inclusiveNotes && drillOptions.inclusiveNotes?.length > 1) {
      newNote = GenerateRandomInclusiveNote(
        drillOptions.inclusiveNotes,
        currentNote ? currentNote : null,
      );
    }
    else {
      newNote = GenerateRandomNote(
        currentNote ? currentNote : null,
        drillOptions.allowedAccidentals,
        drillOptions.minOctave,
        drillOptions.maxOctave,
      );
    }

    setCurrentNote(newNote);
  }

  function handleButtonPlayed(note: GenericNote) {
    const { currentNote } = useNoteDrillStore.getState();
    setPlayedNote(note);

    if (currentNote && CheckValidButtonNotePlayed(note, currentNote)) {
      handleCorrectNotePlayed();
      return;
    };
    handleIncorrectNotePlayed();
  }

  function handleMidiPlayed(note: GenericNote) {
    const { currentNote } = useNoteDrillStore.getState();
    setPlayedNote(note);

    if (currentNote && CheckValidMidiNotePlayed(note, currentNote)) {
      handleCorrectNotePlayed();
      return;
    };
    handleIncorrectNotePlayed();
  };

  function handleIncorrectNotePlayed() {
    incrementTotalNotesPlayed();
  }

  function handleCorrectNotePlayed() {
    handleGenerateNote();
    incrementCorrectNotesPlayed();
    incrementTotalNotesPlayed();
  }

  function handleForceMidiInput() {
    const newNote = GenerateRandomNote(
      null,
      drillOptions.allowedAccidentals,
      drillOptions.minOctave,
      drillOptions.maxOctave,
    );
    forceMidiInput(newNote);
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
      <Card padding="none">
        <StaffGeneration staffOptions={drillOptions.staffOptions} />
        <Info />
        <Stats />
        <Button text="Connect Midi" onClick={connectMidiDevice} />
        <Button text="Force Midi" onClick={handleForceMidiInput} />
        <Button text="Generate Note" onClick={handleGenerateNote} />
        <NoteButtonInput />
      </Card>
    </div>
  );
};

function Info() {
  const currentNote = useNoteDrillStore((state) => state.currentNote);
  const playedNote = useNoteDrillStore((state) => state.playedNote);

  return (
    <h1>{playedNote ? PrintGenericNote(playedNote) : '-'}/{currentNote && PrintGenericNote(currentNote)}</h1>
  )
}

function Stats() {
  const totalNotesPlayed = useNoteDrillStore((state) => state.totalNotesPlayed);
  const correctNotesPlayed = useNoteDrillStore((state) => state.correctNotesPlayed);
  const correctPercentage = `${Math.ceil((correctNotesPlayed / totalNotesPlayed) * 100)}%`

  return (
    <h1>{correctNotesPlayed}/{totalNotesPlayed} {correctPercentage}</h1>
  )
}


