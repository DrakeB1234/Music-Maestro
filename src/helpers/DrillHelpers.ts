import type { DrillOptions, OctaveRangeSet } from "@/types/DrillTypes";

export const OCTAVE_RANGE_LIMITS: OctaveRangeSet[] = [
  {
    clef: "treble",
    range: {
      minOctave: { name: "D", accidental: null, octave: 3 },
      maxOctave: { name: "F", accidental: null, octave: 7 }
    }
  },
  {
    clef: "bass",
    range: {
      minOctave: { name: "F", accidental: null, octave: 1 },
      maxOctave: { name: "A", accidental: null, octave: 5 }
    }
  }
];
export const defaultDrillOptions: DrillOptions = {
  octaveRange: {
    minOctave: { name: "C", accidental: null, octave: 4 },
    maxOctave: { name: "C", accidental: null, octave: 5 }
  },
  timer: 60,
  allowedAccidentals: {
    naturals: true
  },
  clef: "treble"
};