import type { DrillPreset } from "@/types/DrillTypes";

export const defaultDrillPresetsData: DrillPreset[] = [
  {
    name: "Treble Landmark Notes",
    id: "3b1d93ed-0358-4fe6-979e-85a375de6478",
    description: "C/G notes for learning landmark system",
    drillOptions: {
      timer: 999,
      allowAccidentals: false,
      inclusiveNotes: [
        { name: "C", accidental: null, octave: 4 },
        { name: "G", accidental: null, octave: 4 },
        { name: "C", accidental: null, octave: 5 },
        { name: "G", accidental: null, octave: 5 },
      ],
      staffOptions: {
        clef: "treble"
      }
    }
  },
  {
    name: "Bass Landmark Notes",
    id: "ba032c09-fcc8-461a-b58e-74d492e35320",
    description: "C/F notes for learning landmark system",
    drillOptions: {
      timer: 999,
      allowAccidentals: false,
      inclusiveNotes: [
        { name: "C", accidental: null, octave: 4 },
        { name: "F", accidental: null, octave: 3 },
        { name: "C", accidental: null, octave: 3 },
        { name: "F", accidental: null, octave: 2 },
      ],
      staffOptions: {
        clef: "bass"
      }
    }
  }
];
