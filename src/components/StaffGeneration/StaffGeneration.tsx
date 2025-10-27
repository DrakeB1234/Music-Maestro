import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Formatter, type StaveNoteStruct, Accidental } from "vexflow";
import { ConvertGenericNoteToVexNote } from "@helpers/NoteHelpers";
import styles from './StaffGeneration.module.css';
import { useNoteDrillStore } from "@/store/noteDrillStore";

export default function StaffGeneration() {
  const currentNote = useNoteDrillStore((state) => state.currentNote);
  const containerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const drillOptions = useNoteDrillStore.getState().drillOptions;

    const optionsClef = drillOptions.staffOptions.clef ? drillOptions.staffOptions.clef : 'treble';

    const renderer = new Renderer(containerRef.current, Renderer.Backends.CANVAS);
    renderer.resize(190, 210);
    const context = renderer.getContext();
    context.scale(1.5, 1.5);

    const stave = new Stave(0, 20, 125);
    stave.addClef(optionsClef).setContext(context).draw();

    if (!currentNote) {
      stave.draw();
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

    Formatter.FormatAndDraw(context, stave, [staveNote]);
  }, [currentNote]);

  return (
    <div className={styles.StaffGenerationWrapper}>
      <canvas className={styles.StaffContainer} ref={containerRef}></canvas>
    </div>
  )
}
