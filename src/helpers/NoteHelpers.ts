import type { AllowedAccidentals } from "@/types/DrillTypes";
import { Note } from "webmidi";

const MIN_OCTAVE_RANGE = 0;
const MAX_OCTAVE_RANGE = 7;
export const NOTE_NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export type NOTE_NAME_TYPES = "C" | "D" | "E" | "F" | "G" | "A" | "B";


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
  name: NOTE_NAME_TYPES;
  accidental: Accidental | null;
  octave: number | null;

  constructor(
    name: NOTE_NAME_TYPES,
    accidental: Accidental | null,
    octave: number
  ) {
    this.name = name;
    this.accidental = accidental;
    this.octave = octave;
  }
}

export function GenerateRandomNote(
  exclusiveNote: GenericNote | null,
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
  if (exclusiveNote && noteName === exclusiveNote.name && octave === exclusiveNote.octave) {
    const nameIdx = NOTE_NAMES.findIndex(name => name == exclusiveNote.name);
    noteName = NOTE_NAMES[(nameIdx + 1) % NOTE_NAMES.length];
  }

  return { name: noteName, accidental: accidental, octave: octave } as GenericNote;
};

export function GenerateRandomInclusiveNote(inclusiveNotes: GenericNote[], exclusiveNote: GenericNote | null): GenericNote {
  let newNote = inclusiveNotes[Math.floor(Math.random() * inclusiveNotes.length)];
  if (!exclusiveNote) {
    return newNote;
  }

  if (newNote.name === exclusiveNote.name && newNote.octave === exclusiveNote.octave) {
    let newIdx = inclusiveNotes.findIndex(prev => prev === newNote);
    newNote = inclusiveNotes[(newIdx + 1) % inclusiveNotes.length];
  }

  return newNote;
}

// This means that a G# is also a Ab. This checks whether the note played is enharmonic to another
function IsNoteEnharmonic(playedNote: GenericNote, targetNote: GenericNote): boolean {
  const originalNoteSemitone: number = NoteToAbsoluteSemitone(playedNote);
  const targetNoteSemitone: number = NoteToAbsoluteSemitone(targetNote);
  if (originalNoteSemitone == targetNoteSemitone) {
    return true
  }
  else {
    return false;
  }
};

export function CheckValidButtonNotePlayed(playedNote: GenericNote, targetNote: GenericNote): boolean {
  // Ignores octave checking for button notes
  if (playedNote.name === targetNote.name && playedNote.accidental === targetNote.accidental) {
    return true;
  }
  if (IsNoteEnharmonic(playedNote, targetNote)) {
    return true;
  }
  return false;
}

export function CheckValidMidiNotePlayed(playedNote: GenericNote, targetNote: GenericNote): boolean {
  if (playedNote.name === targetNote.name && playedNote.accidental === targetNote.accidental && playedNote.octave === targetNote.octave) {
    return true;
  }
  if (IsNoteEnharmonic(playedNote, targetNote)) {
    return true;
  }
  return false;
}

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
  return new GenericNote(midiNote.name.toUpperCase() as NOTE_NAME_TYPES, midiNote.accidental as Accidental | null, midiNote.octave);
}

export function PrintGenericNote(genericNote: GenericNote): string {
  return `${genericNote.name}${genericNote.accidental ? genericNote.accidental : ''}${genericNote.octave ? genericNote.octave : ''}` as string;
}
