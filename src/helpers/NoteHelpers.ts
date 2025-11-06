import type { Accidental, AllowedAccidentals, DrillClefTypes, NOTE_NAME_TYPES, NOTE_SEMITONES_NAME_TYPES, OctaveRange } from "@/types/DrillTypes";
import { Note } from "webmidi";

// Building keys / scales / chords
type ScaleDegree = "I" | "i" | "i°" |
  "II" | "ii" | "ii°" |
  "III" | "iii" | "iii°" |
  "IV" | "iv" | "iv°" |
  "V" | "v" | "v°" | "V°" |
  "VI" | "vi" | "vi°" |
  "VII" | "vii" | "vii°";
type ChordType = "Major" | "Minor" | "Diminished";
export type ScaleTypes = "Major" | "Minor" | "Lydian" | "Dorian" | "Mixolydian" | "Phrygian" | "Locrian";
export const SCALE_TYPES_ARR = ["Major", "Minor", "Lydian", "Dorian", "Mixolydian", "Phrygian", "Locrian"];

type ChordPatternEntry = {
  degrees: { degree: ScaleDegree; chordType: ChordType }[];
  scaleSteps: number[];
};

const CHORD_PATTERNS: Record<ScaleTypes, ChordPatternEntry> = {
  Major: {
    degrees: [
      { degree: "I", chordType: "Major" },
      { degree: "ii", chordType: "Minor" },
      { degree: "iii", chordType: "Minor" },
      { degree: "IV", chordType: "Major" },
      { degree: "V", chordType: "Major" },
      { degree: "vi", chordType: "Minor" },
      { degree: "vii°", chordType: "Diminished" },
    ],
    scaleSteps: [2, 2, 1, 2, 2, 2, 1],
  },

  Minor: {
    degrees: [
      { degree: "i", chordType: "Minor" },
      { degree: "ii°", chordType: "Diminished" },
      { degree: "III", chordType: "Major" },
      { degree: "iv", chordType: "Minor" },
      { degree: "v", chordType: "Minor" },
      { degree: "VI", chordType: "Major" },
      { degree: "VII", chordType: "Major" },
    ],
    scaleSteps: [2, 1, 2, 2, 1, 2, 2],
  },

  Lydian: {
    degrees: [
      { degree: "I", chordType: "Major" },
      { degree: "II", chordType: "Major" },
      { degree: "iii", chordType: "Minor" },
      { degree: "iv°", chordType: "Diminished" },
      { degree: "V", chordType: "Major" },
      { degree: "vi", chordType: "Minor" },
      { degree: "vii", chordType: "Minor" },
    ],
    scaleSteps: [2, 2, 2, 1, 2, 2, 1],
  },

  Dorian: {
    degrees: [
      { degree: "i", chordType: "Minor" },
      { degree: "ii", chordType: "Minor" },
      { degree: "III", chordType: "Major" },
      { degree: "IV", chordType: "Major" },
      { degree: "v", chordType: "Minor" },
      { degree: "vi°", chordType: "Diminished" },
      { degree: "VII", chordType: "Major" },
    ],
    scaleSteps: [2, 1, 2, 2, 2, 1, 2],
  },

  Mixolydian: {
    degrees: [
      { degree: "I", chordType: "Major" },
      { degree: "ii", chordType: "Minor" },
      { degree: "iii°", chordType: "Diminished" },
      { degree: "IV", chordType: "Major" },
      { degree: "v", chordType: "Minor" },
      { degree: "vi", chordType: "Minor" },
      { degree: "VII", chordType: "Major" },
    ],
    scaleSteps: [2, 2, 1, 2, 2, 1, 2],
  },

  Phrygian: {
    degrees: [
      { degree: "i", chordType: "Minor" },
      { degree: "II", chordType: "Major" },
      { degree: "iii", chordType: "Minor" },
      { degree: "iv", chordType: "Minor" },
      { degree: "V°", chordType: "Diminished" },
      { degree: "VI", chordType: "Major" },
      { degree: "vii", chordType: "Minor" },
    ],
    scaleSteps: [1, 2, 2, 2, 1, 2, 2],
  },

  Locrian: {
    degrees: [
      { degree: "i°", chordType: "Diminished" },
      { degree: "II", chordType: "Major" },
      { degree: "iii", chordType: "Minor" },
      { degree: "iv", chordType: "Minor" },
      { degree: "V", chordType: "Major" },
      { degree: "vi", chordType: "Minor" },
      { degree: "vii", chordType: "Minor" },
    ],
    scaleSteps: [1, 2, 2, 1, 2, 2, 2],
  },
};


export function getScaleNotes(root: NOTE_SEMITONES_NAME_TYPES, scaleType: ScaleTypes): NOTE_SEMITONES_NAME_TYPES[] {
  const pattern = CHORD_PATTERNS[scaleType].scaleSteps;

  let index = NOTE_SEMITONE_NAMES.indexOf(root);
  if (index === -1) return [];

  const scale: NOTE_SEMITONES_NAME_TYPES[] = [root];

  for (let i = 0; i < pattern.length - 1; i++) {
    index = (index + pattern[i]) % NOTE_SEMITONE_NAMES.length;
    scale.push(NOTE_SEMITONE_NAMES[index] as NOTE_SEMITONES_NAME_TYPES);
  }

  return scale;
}

export interface GetChordsInScaleReturn {
  degree: ScaleDegree,
  chordType: ChordType,
  chordName: string,
  chordNotes: string[]
}

export function getChordsInScale(root: NOTE_SEMITONES_NAME_TYPES, scaleType: ScaleTypes): GetChordsInScaleReturn[] {
  const scale = getScaleNotes(root, scaleType);
  const degrees = CHORD_PATTERNS[scaleType].degrees;

  const chords: GetChordsInScaleReturn[] = [];

  for (let i = 0; i < degrees.length; i++) {
    const degreeEntry = degrees[i];

    const chordNotes = [
      scale[i % 7],
      scale[(i + 2) % 7],
      scale[(i + 4) % 7],
    ];

    const chordName = `${scale[i]} ${degreeEntry.chordType}`;

    const chordObj: GetChordsInScaleReturn = {
      degree: degreeEntry.degree,
      chordType: degreeEntry.chordType,
      chordName,
      chordNotes,
    };

    chords.push(chordObj);
  }

  return chords;
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
    octave: number | null
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

export function ConvertStringNoteToGenericNote(noteStr: string): GenericNote {
  let name: NOTE_NAME_TYPES;
  let accidental: Accidental | null = null;

  const match = noteStr.match(/^([A-Ga-g])([#b]?)$/);
  if (!match) {
    throw new Error(`Invalid note string: ${noteStr}`);
  }

  name = match[1].toUpperCase() as NOTE_NAME_TYPES;

  if (match[2]) {
    accidental = match[2] === '#' ? '#' : 'b';
  }

  return new GenericNote(name, accidental, 4);
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