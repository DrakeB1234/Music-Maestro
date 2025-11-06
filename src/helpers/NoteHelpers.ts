import type { Accidental, AllowedAccidentals, DrillClefTypes, NOTE_NAME_TYPES, NOTE_SEMITONES_NAME_TYPES, OctaveRange, ScaleTypes } from "@/types/DrillTypes";
import { Note } from "webmidi";

// Building keys / scales / chords
const MAJOR_SCALE_STEPS = [2, 2, 1, 2, 2, 2, 1];
const MINOR_SCALE_STEPS = [2, 1, 2, 2, 1, 2, 2];
const romanNumeralsMajor = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
const romanNumeralsMinor = ["i", "ii°", "III", "iv", "v", "VI", "VII"];

export const MAJOR_CHORD_PATTERN = [
  { degree: "I", type: "major" },
  { degree: "ii", type: "minor" },
  { degree: "iii", type: "minor" },
  { degree: "IV", type: "major" },
  { degree: "V", type: "major" },
  { degree: "vi", type: "minor" },
  { degree: "vii°", type: "diminished" },
];

export const MINOR_CHORD_PATTERN = [
  { degree: "i", type: "minor" },
  { degree: "ii°", type: "diminished" },
  { degree: "III", type: "major" },
  { degree: "iv", type: "minor" },
  { degree: "v", type: "minor" },
  { degree: "VI", type: "major" },
  { degree: "VII", type: "major" },
];

export function getScale(root: NOTE_SEMITONES_NAME_TYPES, type: ScaleTypes): string[] {
  const pattern = type === "Major" ? MAJOR_SCALE_STEPS : MINOR_SCALE_STEPS;
  const startIndex = NOTE_SEMITONE_NAMES.indexOf(root);
  if (startIndex === -1) return [];

  const scale: NOTE_SEMITONES_NAME_TYPES[] = [root];
  let current = startIndex;

  for (let i = 0; i < 6; i++) {
    current = (current + pattern[i]) % NOTE_SEMITONE_NAMES.length;
    scale.push(NOTE_SEMITONE_NAMES[current] as NOTE_SEMITONES_NAME_TYPES);
  }

  return scale;
}

export type ScaleChordsReturn = {
  degree: string;
  notes: string[];
  chordName: string;
}[]

export function getChordsInScale(root: NOTE_SEMITONES_NAME_TYPES, type: ScaleTypes): ScaleChordsReturn {
  const scale = getScale(root, type);
  if (type === "Major") {
    return scale.map((noteName, i) => ({
      degree: romanNumeralsMajor[i],
      notes: getChord(scale, i),
      chordName: `${noteName} ${MAJOR_CHORD_PATTERN[i].type}`
    }));
  }
  else {
    return scale.map((noteName, i) => ({
      degree: romanNumeralsMinor[i],
      notes: getChord(scale, i),
      chordName: `${noteName} ${MINOR_CHORD_PATTERN[i].type}`
    }));
  }
}

function getChord(scale: string[], i: number) {
  return [
    scale[i % 7],
    scale[(i + 2) % 7],
    scale[(i + 4) % 7],
  ];
}

export const NOTE_NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const ACCIDENTAL_NOTE_NAMES = ['C#', 'D#', 'F#', 'G#', 'A#'];
export const NOTE_SEMITONE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const NOTE_SEMITONES: Record<NOTE_NAME_TYPES, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

const TOP_LINE_NOTES: Record<DrillClefTypes, GenericNote> = {
  "treble": { name: "F", accidental: null, octave: 5 },
  "bass": { name: "A", accidental: null, octave: 3 },
};

const BOTTOM_LINE_NOTES: Record<DrillClefTypes, GenericNote> = {
  "treble": { name: "E", accidental: null, octave: 4 },
  "bass": { name: "G", accidental: null, octave: 2 },
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

  // Handle edgecase of min > max, or the inverse
  const minOctaveSemitone = Math.min(MIN_OCTAVE_SEMITONE, MAX_OCTAVE_SEMITONE);
  const maxOctaveSemitone = Math.max(MIN_OCTAVE_SEMITONE, MAX_OCTAVE_SEMITONE);

  const randomSemitone = Math.floor(Math.random() * (maxOctaveSemitone - minOctaveSemitone + 1)) + minOctaveSemitone;
  let randomNote = AbsoluteSemitoneToNote(randomSemitone);

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
    const newName = NOTE_NAMES[(nameIdx + 1) % NOTE_NAMES.length] as NOTE_NAME_TYPES;
    let newNote = { ...randomNote, name: newName };
    const newNoteSemitones = NoteToAbsoluteSemitone(newNote);

    // If new note is over octave range, bring down to min octave semitone
    if (newNoteSemitones > maxOctaveSemitone) {
      newNote = octaveRange.minOctave;
    };
    randomNote = newNote
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
function IsNoteEnharmonic(
  playedNote: GenericNote,
  targetNote: GenericNote
): boolean {
  const originalSemitone = NoteToAbsoluteSemitone(playedNote);
  const targetSemitone = NoteToAbsoluteSemitone(targetNote);

  if (!playedNote.octave) {
    return originalSemitone % 12 === targetSemitone % 12;
  }

  return originalSemitone === targetSemitone;
}

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

export function GetSpacesAboveStaff(targetNote: GenericNote, clef: DrillClefTypes): number {
  const topLineNote = TOP_LINE_NOTES[clef];
  if (!targetNote.octave || !topLineNote.octave) return -1;

  const topIdx = NOTE_NAMES.indexOf(topLineNote.name);
  const targetIdx = NOTE_NAMES.indexOf(targetNote.name);

  const letterSteps = (targetNote.octave - topLineNote.octave) * 7 + (targetIdx - topIdx);

  if (letterSteps <= 0) return 0;

  return Math.ceil(letterSteps / 2);
}

export function GetSpacesBelowStaff(targetNote: GenericNote, clef: DrillClefTypes): number {
  const bottomLineNote = BOTTOM_LINE_NOTES[clef];
  if (!targetNote.octave || !bottomLineNote.octave) return -1;

  const bottomIdx = NOTE_NAMES.indexOf(bottomLineNote.name);
  const targetIdx = NOTE_NAMES.indexOf(targetNote.name);

  const letterSteps = (bottomLineNote.octave - targetNote.octave) * 7 + (bottomIdx - targetIdx);

  if (letterSteps <= 0) return 0;

  return Math.ceil(letterSteps / 2);
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