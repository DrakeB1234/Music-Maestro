import { useEffect, useRef } from "react";
import styles from './DrillStaff.module.css';
import { useNoteDrillStore } from "@/store/noteDrillStore";
import GenerateStave from "@/helpers/GenerateStave";

export default function DrillStaff() {
  const currentNote = useNoteDrillStore((state) => state.currentNote);

  const containerRef = useRef<HTMLDivElement>(null);
  const staveRef = useRef<GenerateStave>(null);

  useEffect(() => {
    const drillOptions = useNoteDrillStore.getState().drillOptions;
    if (!containerRef.current || !drillOptions) return;

    if (!staveRef.current) {
      const newStaveObj = new GenerateStave(containerRef.current, drillOptions.clef, undefined, undefined, 1);
      if (!newStaveObj) return;

      staveRef.current = newStaveObj;
    }
    else if (currentNote) {
      staveRef.current.drawNote(currentNote);
    };

  }, [currentNote]);

  return (
    <div className={styles.StaffContainer} ref={containerRef} />
  )
}
