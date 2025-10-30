import type { DrillPreset } from "@/types/DrillTypes";

export const defaultDrillPresetsData: DrillPreset[] = [
  {
    name: "Treble Landmark Notes",
    id: "3b1d93ed-0358-4fe6-979e-85a375de6478",
    difficulty: "easy",
    description: "C/G notes for learning landmark system",
    drillOptions: {
      timer: 60,
      inclusiveNotes: [
        { name: "C", accidental: null, octave: 4 },
        { name: "G", accidental: null, octave: 4 },
        { name: "C", accidental: null, octave: 5 }
      ],
      clef: "treble"
    }
  },
  {
    name: "Bass Landmark Notes",
    id: "ba032c09-fcc8-461a-b58e-74d492e35320",
    difficulty: "easy",
    description: "C/F notes for learning landmark system",
    drillOptions: {
      timer: 60,
      inclusiveNotes: [
        { name: "C", accidental: null, octave: 4 },
        { name: "F", accidental: null, octave: 3 },
        { name: "C", accidental: null, octave: 3 }
      ],
      clef: "bass"
    }
  }
];
