import { ArrowDownIcon, ArrowUpIcon, MusicNoteIcon } from "@/components/Icons/Icons";
import Modal from "@/components/UIComponents/Modal";
import styles from './OctaveSelector.module.css';
import Button from "@/components/UIComponents/Button";
import { useModal } from "@/context/ModalProvider";
import { useEffect, useRef, useState } from "react";
import GenerateStave from "@/helpers/GenerateStave";
import { NoteToAbsoluteSemitone, PrintGenericNote, ShiftNoteByName, type GenericNote } from "@/helpers/NoteHelpers";
import type { OctaveRange } from "@/types/DrillTypes";

export const StaveButtonPressAction = {
  LEFT_INCREASE_OCTAVE: 0,
  LEFT_DECREASE_OCTAVE: 1,
  RIGHT_INCREASE_OCTAVE: 2,
  RIGHT_DECREASE_OCTAVE: 3,
};

type StaveButtonPressAction = typeof StaveButtonPressAction[keyof typeof StaveButtonPressAction];

export type OctaveRangeSides = {
  leftNote: GenericNote;
  rightNote: GenericNote;
}

interface OctaveSelectorProps {
  octaveRangeLimit: OctaveRange;
  setOctaveRange: (range: OctaveRangeSides) => void;
  prevOctaveRange: OctaveRange
}

export default function OctaveSelector({
  octaveRangeLimit,
  setOctaveRange,
  prevOctaveRange
}: OctaveSelectorProps) {
  const [currentOctaveRange, setCurrentOctaveRange] = useState<OctaveRangeSides>({
    leftNote: prevOctaveRange.minOctave ? prevOctaveRange.minOctave : { name: "C", accidental: null, octave: 4 },
    rightNote: prevOctaveRange.maxOctave ? prevOctaveRange.maxOctave : { name: "C", accidental: null, octave: 5 },
  });

  const svgRef = useRef<HTMLDivElement>(null);
  const staveRef = useRef<GenerateStave>(null);
  const { closeModal } = useModal();

  function handleOctaveButtonPressed(action: StaveButtonPressAction) {
    if (!currentOctaveRange) return;

    switch (action) {
      case StaveButtonPressAction.LEFT_INCREASE_OCTAVE:
        handleNoteChange("left", ShiftNoteByName(currentOctaveRange.leftNote, 1));
        break;
      case StaveButtonPressAction.LEFT_DECREASE_OCTAVE:
        handleNoteChange("left", ShiftNoteByName(currentOctaveRange.leftNote, -1));
        break;
      case StaveButtonPressAction.RIGHT_INCREASE_OCTAVE:
        handleNoteChange("right", ShiftNoteByName(currentOctaveRange.rightNote, 1));
        break;
      default:
        handleNoteChange("right", ShiftNoteByName(currentOctaveRange.rightNote, -1));
        break;
    };
  };

  function handleNoteChange(side: "left" | "right", newNote: GenericNote) {
    let drawNotesObj: OctaveRangeSides = { ...currentOctaveRange };
    let octaveMinSemitones = NoteToAbsoluteSemitone(octaveRangeLimit.minOctave);
    let octaveMaxSemitones = NoteToAbsoluteSemitone(octaveRangeLimit.maxOctave);
    let newNoteSemitones = NoteToAbsoluteSemitone(newNote);

    if (newNoteSemitones < octaveMinSemitones || newNoteSemitones > octaveMaxSemitones) {
      return;
    }

    if (side === "left") {
      drawNotesObj = { ...drawNotesObj, leftNote: newNote };
      setCurrentOctaveRange(e => ({ ...e, leftNote: newNote }));
    }
    else {
      drawNotesObj = { ...drawNotesObj, rightNote: newNote };
      setCurrentOctaveRange(e => ({ ...e, rightNote: newNote }));
    }
    drawNewNotes(drawNotesObj);
  }

  function drawNewNotes(newNotes: OctaveRangeSides) {
    staveRef.current?.drawListNotes([newNotes.leftNote, newNotes.rightNote]);
  }

  function PrintOctaveRange(): string {
    if (!currentOctaveRange) return " - ";

    let left = currentOctaveRange.leftNote
      ? PrintGenericNote(currentOctaveRange.leftNote)
      : "";
    let right = currentOctaveRange.rightNote
      ? PrintGenericNote(currentOctaveRange.rightNote)
      : "";

    return `${left} - ${right}`;
  };

  function handleSetPressed() {
    setOctaveRange(currentOctaveRange);
    closeModal();
  }

  useEffect(() => {
    if (!svgRef.current) return;

    const newStaveObj = new GenerateStave(svgRef.current, "treble", 240, undefined, 1.5);
    if (!newStaveObj) return;
    staveRef.current = newStaveObj;

    staveRef.current?.drawListNotes([currentOctaveRange.leftNote, currentOctaveRange.rightNote]);

  }, []);

  return (
    <Modal headerText="Octave Selector" icon={<MusicNoteIcon />}>
      <div className={styles.ModalContentContainer}>
        <StaveWithButtons handleButtonPress={handleOctaveButtonPressed}>
          <div ref={svgRef} className={styles.StaveContainer} />
        </StaveWithButtons>
        <div className={styles.RangeContainer}>
          <p className="body-secondary">Selected Range</p>
          <div className={styles.SelectedRangeContainer}>
            <p className="heading">{PrintOctaveRange()}</p>
          </div>
        </div>
      </div>
      <div className={styles.ModalActionButtonsContainer}>
        <Button onClick={closeModal} text="Cancel" variant="outlined" fullWidth={true} />
        <Button text="Set" variant="contained" fullWidth={true} onClick={handleSetPressed} />
      </div>
    </Modal>
  )
}

interface StaveWithButtonsProps {
  children: React.ReactNode;
  handleButtonPress: (action: StaveButtonPressAction) => void
}

function StaveWithButtons({ children, handleButtonPress }: StaveWithButtonsProps) {

  return (
    <div className={styles.ModalFlexContainer}>
      <div className={styles.OctaveButtonsContainer}>
        <Button icon={<ArrowUpIcon />} variant="outlined" onClick={() => handleButtonPress(StaveButtonPressAction.LEFT_INCREASE_OCTAVE)} />
        <Button icon={<ArrowDownIcon />} variant="outlined" onClick={() => handleButtonPress(StaveButtonPressAction.LEFT_DECREASE_OCTAVE)} />
      </div>
      {children}
      <div className={styles.OctaveButtonsContainer}>
        <Button icon={<ArrowUpIcon />} variant="outlined" onClick={() => handleButtonPress(StaveButtonPressAction.RIGHT_INCREASE_OCTAVE)} />
        <Button icon={<ArrowDownIcon />} variant="outlined" onClick={() => handleButtonPress(StaveButtonPressAction.RIGHT_DECREASE_OCTAVE)} />
      </div>
    </div>
  );
}