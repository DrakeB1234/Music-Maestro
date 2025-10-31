import { useEffect, useRef } from "react";
import styles from './DrillStaff.module.css';
import { useNoteDrillStore } from "@/store/noteDrillStore";
import GenerateStave from "@/helpers/GenerateStave";
import { GetSpacesAboveStaff, GetSpacesBelowStaff } from "@/helpers/NoteHelpers";

export default function DrillStaff() {
  const currentNote = useNoteDrillStore((state) => state.currentNote);
  const playedStatusNote = useNoteDrillStore((state) => state.playedStatusNote);

  const containerRef = useRef<HTMLDivElement>(null);
  const staveRef = useRef<GenerateStave>(null);

  useEffect(() => {
    const drillOptions = useNoteDrillStore.getState().drillOptions;
    if (!containerRef.current || !drillOptions) return;

    if (!staveRef.current) {
      const maxOctave = drillOptions.octaveRange?.maxOctave;
      const minOctave = drillOptions.octaveRange?.minOctave;
      const spacesAboveStaff = maxOctave ? GetSpacesAboveStaff(maxOctave, drillOptions.clef || "treble") : 0;
      const spacesBelowStaff = minOctave ? GetSpacesBelowStaff(minOctave, drillOptions.clef || "treble") : 0;

      const newStaveObj = new GenerateStave(containerRef.current, drillOptions.clef, undefined, undefined, 1, spacesAboveStaff, spacesBelowStaff);
      if (!newStaveObj) return;

      staveRef.current = newStaveObj;
    }
    else if (currentNote) {
      staveRef.current.drawNote(currentNote);
    };

  }, [currentNote]);

  useEffect(() => {
    const playedNote = useNoteDrillStore.getState().playedNote;
    const playedNoteStatus = useNoteDrillStore.getState().playedNoteStatus;
    const playedStatusNote = useNoteDrillStore.getState().playedStatusNote;

    if (!playedStatusNote || !playedNote || !currentNote || playedNoteStatus === "correct") return;

    staveRef.current?.drawWrongNote(currentNote, playedStatusNote);

  }, [playedStatusNote]);

  return (
    <div className={styles.StaffContainer} ref={containerRef} />
  )
}
