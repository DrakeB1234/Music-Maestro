import type { Accidental, AllowedAccidentals, NOTE_NAME_TYPES, OctaveRange } from "@/types/DrillTypes";
import { Note } from "webmidi";

export const NOTE_NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const NOTE_SEMITONE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const NOTE_SEMITONES: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

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
  octaveRange: OctaveRange,
  allowedAccidentals?: AllowedAccidentals,
) {
  const MIN_OCTAVE_SEMITONE = NoteToAbsoluteSemitone(octaveRange.minOctave);
  const MAX_OCTAVE_SEMITONE = NoteToAbsoluteSemitone(octaveRange.maxOctave);
  const SEMITONE_ACCIDENTAL_OFFSET = 1;

  // Handle edgecase of min > max, or the inverse
  const minOctaveSemitone = Math.min(MIN_OCTAVE_SEMITONE, MAX_OCTAVE_SEMITONE);
  const maxOctaveSemitone = Math.max(MIN_OCTAVE_SEMITONE, MAX_OCTAVE_SEMITONE);

  const randomSemitone = minOctaveSemitone + Math.floor(Math.random() * (maxOctaveSemitone - minOctaveSemitone + SEMITONE_ACCIDENTAL_OFFSET));
  const randomNote = AbsoluteSemitoneToNote(randomSemitone);

  let accidental: string | null = null;
  if (allowedAccidentals) {
    const accidentalPool: string[] = [];
    if (allowedAccidentals.naturals) accidentalPool.push("n");
    if (allowedAccidentals.sharps) accidentalPool.push("#");
    if (allowedAccidentals.flats) accidentalPool.push("b");

    if (accidentalPool.length > 0) {
      accidental = accidentalPool[Math.floor(Math.random() * accidentalPool.length)];
      if (accidental === "n") accidental = null;
    }
  }

  randomNote.accidental = accidental as Accidental;

  // Generate new note name if duplicate was found, ignore if min / max octave ranges are the same
  if (!(MIN_OCTAVE_SEMITONE === MAX_OCTAVE_SEMITONE) && exclusiveNote && randomNote.name === exclusiveNote.name && randomNote.octave === exclusiveNote.octave) {
    const nameIdx = NOTE_NAMES.findIndex(name => name == exclusiveNote.name);
    randomNote.name = NOTE_NAMES[(nameIdx + 1) % NOTE_NAMES.length] as NOTE_NAME_TYPES;
  }

  return randomNote;
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
export function NoteToAbsoluteSemitone(note: GenericNote): number {
  const naturalSemitone = NOTE_SEMITONES[note.name];
  let accidentalOffset = 0;
  if (note.accidental === ACCIDENTALS.Sharp) accidentalOffset = 1;
  if (note.accidental === ACCIDENTALS.Flat) accidentalOffset = -1;

  const octave = note.octave ? note.octave : 0;

  return naturalSemitone + accidentalOffset + octave * 12;
}

export function AbsoluteSemitoneToNote(semitone: number): GenericNote {
  const octave = Math.floor(semitone / 12);
  const noteName = NOTE_SEMITONE_NAMES[semitone % 12];

  let name: NOTE_NAME_TYPES;
  let accidental: Accidental | null = null;

  if (noteName.includes("#")) {
    name = noteName[0] as NOTE_NAME_TYPES;
    accidental = "#";
  } else {
    name = noteName as NOTE_NAME_TYPES;
  }

  return { name, accidental, octave };
}

export function ShiftNoteByName(note: GenericNote, shift: number): GenericNote {
  const newNoteIdx: number = NOTE_NAMES.findIndex((e) => e === note.name);

  const length = NOTE_NAMES.length;
  const shiftedIdx = ((newNoteIdx + shift) % length + length) % length;

  let shiftedOctave: number = 0;
  if (newNoteIdx + shift > length - 1) {
    shiftedOctave = 1;
  }
  else if (newNoteIdx + shift < 0) {
    shiftedOctave = -1;
  }

  const newNote = {
    ...note,
    name: NOTE_NAMES[shiftedIdx] as NOTE_NAME_TYPES,
    octave: note.octave ? note.octave + shiftedOctave : null
  };

  return newNote;
};

export function ConvertGenericNoteToVexNote(genericNote: GenericNote): string {
  return `${genericNote.name}/${genericNote.octave}` as string;
};

export function ConvertMidiNoteToGenericNote(midiNote: Note): GenericNote {
  return new GenericNote(midiNote.name.toUpperCase() as NOTE_NAME_TYPES, midiNote.accidental as Accidental | null, midiNote.octave);
}

export function PrintGenericNote(genericNote: GenericNote): string {
  return `${genericNote.name}${genericNote.accidental ? genericNote.accidental : ''}${genericNote.octave ? genericNote.octave : ''}` as string;
}