import { Note } from "webmidi";

const MIN_OCTAVE_RANGE = 3;
const MAX_OCTAVE_RANGE = 6;
const NOTE_NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const ACCIDENTALS = {
  Sharp: "#",
  Flat: "b",
  Natural: "n"
}

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

export function GenerateRandomNote(generateAccidental: boolean = false): GenericNote {
  const noteName = NOTE_NAMES[Math.floor(Math.random() * NOTE_NAMES.length)];
  let octave = Math.floor(Math.random() * (MAX_OCTAVE_RANGE + 1));
  let accidental = null;

  if (octave < MIN_OCTAVE_RANGE) {
    octave = MIN_OCTAVE_RANGE;
  }
  if (generateAccidental) {
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

export function ConvertGenericNoteToVexNote(genericNote: GenericNote): string {
  return `${genericNote.name}/${genericNote.octave}` as string;
};

export function ConvertMidiNoteToGenericNote(midiNote: Note): GenericNote {
  return new GenericNote(midiNote.name, midiNote.accidental, midiNote.octave);
}

export function PrintGenericNote(genericNote: GenericNote): string {
  return `${genericNote.name}${genericNote.accidental ? genericNote.accidental : ''}${genericNote.octave}` as string;
}
