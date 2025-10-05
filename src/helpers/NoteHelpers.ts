import { Note } from "webmidi";

const MIN_OCTAVE_RANGE = 0;
const MAX_OCTAVE_RANGE = 7;
const NOTE_NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const ACCIDENTALS = {
  Sharp: "#",
  Flat: "b",
  Natural: "n"
}
const NOTE_SEMITONES: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

export class GenericNote {
  name: string
  accidental: string | null
  octave: number

  constructor(
    name: string,
    accidental: string | null,
    octave: number
  ) {
    this.name = name.toUpperCase();
    this.accidental = accidental;
    this.octave = octave;
  }
}

export function GenerateRandomNote(
  generateAccidentals: boolean = false,
  minOctave: number = 2,
  maxOctave: number = 6,
): GenericNote {
  const noteName = NOTE_NAMES[Math.floor(Math.random() * NOTE_NAMES.length)];

  if (maxOctave > MAX_OCTAVE_RANGE) maxOctave = MAX_OCTAVE_RANGE;
  if (minOctave < MIN_OCTAVE_RANGE) minOctave = MIN_OCTAVE_RANGE;

  let octave = Math.floor(Math.random() * (maxOctave + 1));
  let accidental = null;

  if (octave < minOctave) {
    octave = minOctave;
  }
  if (generateAccidentals) {
    const isGenerate = Math.floor(Math.random() * 3);
    switch (isGenerate) {
      case 0:
        accidental = ACCIDENTALS.Flat;
        break;
      case 1:
        accidental = ACCIDENTALS.Sharp;
        break;
      default:
        accidental = null
    }
  }
  return { name: noteName, accidental: accidental, octave: octave } as GenericNote;
};

export function GenerateRandomOverrideNote(overrideNotes: GenericNote[]): GenericNote {
  const newNote = overrideNotes[Math.floor(Math.random() * overrideNotes.length)];
  return newNote;
}

// This means that a G# is also a Ab. This checks whether the note played is enharmonic to another
export function IsNoteEnharmonic(originalNote: GenericNote, targetNote: GenericNote): boolean {
  const originalNoteSemitone: number = NoteToAbsoluteSemitone(originalNote);
  const targetNoteSemitone: number = NoteToAbsoluteSemitone(targetNote);
  if (originalNoteSemitone == targetNoteSemitone) {
    return true
  }
  else {
    return false;
  }
};

// Returns TOTAL number of semitones from C0
function NoteToAbsoluteSemitone(note: GenericNote): number {
  const naturalSemitone = NOTE_SEMITONES[note.name];

  const accidentalOffset = parseAccidental(note.accidental);
  return naturalSemitone + accidentalOffset + note.octave * 12;
}

function parseAccidental(accidental: string | null): number {
  if (!accidental) return 0;
  if (accidental === ACCIDENTALS.Sharp) return 1;
  if (accidental === ACCIDENTALS.Flat) return -1;
  return 0;
}

export function ConvertGenericNoteToVexNote(genericNote: GenericNote): string {
  return `${genericNote.name}/${genericNote.octave}` as string;
};

export function ConvertMidiNoteToGenericNote(midiNote: Note): GenericNote {
  return new GenericNote(midiNote.name, midiNote.accidental, midiNote.octave);
}

export function PrintGenericNote(genericNote: GenericNote): string {
  return `${genericNote.name}${genericNote.accidental ? genericNote.accidental : ''}${genericNote.octave}` as string;
}
