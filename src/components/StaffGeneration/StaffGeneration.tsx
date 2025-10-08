import { useEffect, useRef, useState } from "react";
import { Renderer, Stave, StaveNote, Formatter, type StaveNoteStruct, Accidental } from "vexflow";
import { ConvertGenericNoteToVexNote, type GenericNote } from "@helpers/NoteHelpers";
import styles from './StaffGeneration.module.css';
import type { StaffOptions } from "@customtypes/DrillOptions";

type Props = {
  currentNote?: GenericNote
  staffOptions: StaffOptions
}

export default function Staff({ currentNote, staffOptions }: Props) {
  const [isError, setIsError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    setIsError(false);

    const optionsClef = staffOptions.clef ? staffOptions.clef : 'treble';

    // Clear previous SVG before redrawing
    containerRef.current.innerHTML = "";

    // Setup renderer
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(250, 150);
    const context = renderer.getContext();

    // Draw the staff
    const stave = new Stave(0, 0, 230);
    stave.addClef(optionsClef).setContext(context).draw();

    if (!currentNote || currentNote.name === "") {
      console.error('Error drawing staff, no note was found.');
      stave.draw();
      setIsError(true);
      return;
    }
    const convertedVexNote = ConvertGenericNoteToVexNote(currentNote);

    const staveNote = new StaveNote({
      keys: [convertedVexNote],
      duration: "q",
      clef: optionsClef
    } as StaveNoteStruct);
    if (currentNote.accidental) {
      staveNote.addModifier(new Accidental(currentNote.accidental));
    }

    // Format and draw
    Formatter.FormatAndDraw(context, stave, [staveNote]);
  }, [currentNote]);

  return (
    <div className={styles.StaffGenerationWrapper}>
      <div className={styles.StaffContainer} ref={containerRef}></div>
      <h3>{isError ? 'Error drawing note: No note found' : ''}</h3>
    </div>
  )
}
