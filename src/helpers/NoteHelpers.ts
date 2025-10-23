import type { AllowedAccidentals } from "@/types/DrillTypes";
import { Note } from "webmidi";

const MIN_OCTAVE_RANGE = 0;
const MAX_OCTAVE_RANGE = 7;
export const NOTE_NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];


const NOTE_SEMITONES: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

type Accidental = "#" | "b" | "n";
export const ACCIDENTALS = {
  Sharp: "#" as Accidental,
  Flat: "b" as Accidental,
  Natural: "n" as Accidental
};

export class GenericNote {
  name: string
  accidental: string | null
  octave: number | null

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
  exclusiveNote: GenericNote,
  allowedAccidentals: AllowedAccidentals,
  minOctave: number = 2,
  maxOctave: number = 6,
) {
  let noteName = NOTE_NAMES[Math.floor(Math.random() * NOTE_NAMES.length)];

  if (maxOctave > MAX_OCTAVE_RANGE) maxOctave = MAX_OCTAVE_RANGE;
  if (minOctave < MIN_OCTAVE_RANGE) minOctave = MIN_OCTAVE_RANGE;

  let octave = Math.floor(Math.random() * (maxOctave + 1));
  if (octave < minOctave) {
    octave = minOctave;
  }

  const accidentalPool: string[] = [];
  if (allowedAccidentals.naturals) accidentalPool.push("n");
  if (allowedAccidentals.sharps) accidentalPool.push("#");
  if (allowedAccidentals.flats) accidentalPool.push("b");

  let accidental: string | null = null;
  if (accidentalPool.length > 0) {
    accidental = accidentalPool[Math.floor(Math.random() * accidentalPool.length)];
    if (accidental === "n") accidental = null;
  }

  // Generate new note name if duplicate was found
  if (noteName === exclusiveNote.name && octave === exclusiveNote.octave) {
    noteName = GenerateDifferentNoteName(noteName);
  }

  return { name: noteName, accidental: accidental, octave: octave } as GenericNote;
};

function GenerateDifferentNoteName(noteName: string): string {
  const nameIdx = NOTE_NAMES.findIndex(name => name == noteName);
  if (!nameIdx) return noteName;
  const nameIdxIncrement = Math.floor(Math.random() * NOTE_NAMES.length - 1);
  const newIdx = (nameIdx + nameIdxIncrement) % NOTE_NAMES.length;
  return NOTE_NAMES[newIdx];
}

export function GenerateRandomInclusiveNote(inclusiveNotes: GenericNote[], exclusiveNote: GenericNote): GenericNote {
  let newNote = inclusiveNotes[Math.floor(Math.random() * inclusiveNotes.length)];

  if (newNote.name === exclusiveNote.name && newNote.octave === exclusiveNote.octave) {
    let newIdx = inclusiveNotes.findIndex(prev => prev === newNote);
    newIdx = (newIdx + 1) % inclusiveNotes.length;
    newNote = inclusiveNotes[newIdx];
  }

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
  if (!note.octave) return 0;

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
  return `${genericNote.name}${genericNote.accidental ? genericNote.accidental : ''}${genericNote.octave ? genericNote.octave : ''}` as string;
}
