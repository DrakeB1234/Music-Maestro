import { useNoteInputStore } from '@/store/noteInputStore';
import styles from './PianoRollInput.module.css';
import { ACCIDENTAL_NOTE_NAMES, NOTE_NAMES } from '@/helpers/NoteHelpers';
import type { Accidental, NOTE_NAME_TYPES } from '@/types/DrillTypes';

const ACCIDENTAL_NOTE_NAMES_KEYOFFSETS = [
  15,
  36,
  76,
  96,
  116
]

export default function PianoRollInput() {
  const triggerButtonInput = useNoteInputStore((s) => s.triggerButtonInput);

  function splitNote(note: string) {
    const match = note.match(/^([A-G])([#b]?)/);
    if (!match) return { letter: note, accidental: "" };
    return { noteName: match[1], noteAccidental: match[2] };
  }

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    // Only handle clicks on a key element
    const target = e.target as SVGElement;
    const note = target.getAttribute("id");
    if (note) {
      const { noteName, noteAccidental } = splitNote(note);
      if (!noteName) return;
      triggerButtonInput({ name: noteName as NOTE_NAME_TYPES, accidental: noteAccidental ? noteAccidental as Accidental : null, octave: null });
    }
  };

  return (
    <svg
      width="140"
      height="80"
      fill="none"
      viewBox="0 0 140 80"
      onClick={handleClick}
      className={styles.PianoRollWrapper}
    >
      {NOTE_NAMES.map((note, idx) => (
        <g className={styles.WhiteKey} key={note}>
          <rect
            id={note}
            width={20}
            height={80}
            fill='var(--color-surface-light-1)'
            x={20 * idx}
          />
          <line
            x1={idx * 20 + 1}
            x2={idx * 20 + 1}
            y1={0}
            y2={80}
            stroke="var(--color-surface-border-2)"
            strokeWidth={0}
          />
          <line
            x1={idx * 20 + 20}
            x2={idx * 20 + 20}
            y1={0}
            y2={80}
            stroke="var(--color-surface-border-2)"
            strokeWidth={0.5}
          />
        </g>
      ))}
      {ACCIDENTAL_NOTE_NAMES.map((note, idx) => (
        <g className={styles.BlackKey} key={note}>
          <rect
            id={note}
            width={9}
            height={70}
            fill='#282828'
            stroke='#000'
            strokeWidth={3}
            x={ACCIDENTAL_NOTE_NAMES_KEYOFFSETS[idx]}
            y={-27}
          />
        </g>
      ))}
    </svg>
  );
}
