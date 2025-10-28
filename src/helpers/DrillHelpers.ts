import type { DrillOptions } from "@/types/DrillTypes";

export const defaultDrillOptions: DrillOptions = {
  minOctave: 4,
  maxOctave: 4,
  timer: 60,
  allowedAccidentals: {
    naturals: true
  },
  staffOptions: {
    clef: "treble"
  }
};