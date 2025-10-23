import { useEffect, useRef, useState } from "react";
import { Renderer, Stave, StaveNote, Formatter, type StaveNoteStruct, Accidental } from "vexflow";
import { ConvertGenericNoteToVexNote, type GenericNote } from "@helpers/NoteHelpers";
import styles from './StaffGeneration.module.css';
import type { StaffOptions } from "@/types/DrillTypes";

type Props = {
  currentNote?: GenericNote
  staffOptions: StaffOptions
}

export default function StaffGeneration({ currentNote, staffOptions }: Props) {
  const [isError, setIsError] = useState(false);
  const containerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    setIsError(false);

    const optionsClef = staffOptions.clef ? staffOptions.clef : 'treble';

    // Setup renderer
    const renderer = new Renderer(containerRef.current, Renderer.Backends.CANVAS);
    renderer.resize(190, 210); // more vertical room
    const context = renderer.getContext();
    context.scale(1.5, 1.5);

    // Draw the staff 
    const stave = new Stave(0, 20, 125);
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
      <canvas className={styles.StaffContainer} ref={containerRef}></canvas>
      <p className="caption">{isError && 'Error generating staff'}</p>
    </div>
  )
}
