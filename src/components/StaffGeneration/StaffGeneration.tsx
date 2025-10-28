import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Formatter, type StaveNoteStruct, Accidental, RenderContext } from "vexflow";
import { ConvertGenericNoteToVexNote, GenericNote } from "@helpers/NoteHelpers";
import styles from './StaffGeneration.module.css';
import { useNoteDrillStore } from "@/store/noteDrillStore";

export default function StaffGeneration() {
  const currentNote = useNoteDrillStore((state) => state.currentNote);

  const containerRef = useRef<HTMLCanvasElement>(null);
  const staveRef = useRef<Stave>(null);
  const rendererRef = useRef<Renderer>(null);
  const contextRef = useRef<RenderContext>(null);

  function StaffGenerationInit() {
    if (!containerRef.current) return;
    const drillOptions = useNoteDrillStore.getState().drillOptions;
    let clefOption = drillOptions.staffOptions.clef ? drillOptions.staffOptions.clef : 'treble';

    const renderer = new Renderer(containerRef.current, Renderer.Backends.CANVAS);
    renderer.resize(190, 210);
    const context = renderer.getContext();
    context.scale(1.5, 1.5);
    const stave = new Stave(0, 20, 125);
    stave.addClef(clefOption).setContext(context).draw();

    rendererRef.current = renderer;
    contextRef.current = context;
    staveRef.current = stave;
  }

  function ClearStaff() {
    if (!contextRef.current || !staveRef.current || !containerRef.current) return;

    const canvas = containerRef.current
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    staveRef.current.draw();
  }

  function DrawNoteOnStaff(note: GenericNote) {
    if (!contextRef.current || !staveRef.current) return;

    const drillOptions = useNoteDrillStore.getState().drillOptions;
    const optionsClef = drillOptions.staffOptions.clef ? drillOptions.staffOptions.clef : 'treble';
    const convertedVexNote = ConvertGenericNoteToVexNote(note);

    const staveNote = new StaveNote({
      keys: [convertedVexNote],
      duration: "q",
      clef: optionsClef
    } as StaveNoteStruct);
    if (note.accidental) {
      staveNote.addModifier(new Accidental(note.accidental));
    }
    Formatter.FormatAndDraw(contextRef.current, staveRef.current, [staveNote]);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    if (!contextRef.current || !staveRef.current) {
      StaffGenerationInit();
    }

    ClearStaff();
    if (currentNote) {
      DrawNoteOnStaff(currentNote);
    }

  }, [currentNote]);

  return (
    <div className={styles.StaffGenerationWrapper}>
      <canvas className={styles.StaffContainer} ref={containerRef}></canvas>
    </div>
  )
}
