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
  },
  {
    name: "Treble Drill",
    id: "5d24460b-15ac-4288-be18-97f1559b88f9",
    difficulty: "easy",
    description: "Play notes from C4 to C5",
    drillOptions: {
      timer: 60,
      octaveRange: {
        minOctave: { name: "C", accidental: null, octave: 4 },
        maxOctave: { name: "C", accidental: null, octave: 5 }
      },
      clef: "treble"
    }
  },
  {
    name: "Bass Drill",
    id: "7040190f-db2c-4926-a3dc-8e937a620f8a",
    difficulty: "easy",
    description: "Play notes from C4 to C3",
    drillOptions: {
      timer: 60,
      octaveRange: {
        minOctave: { name: "C", accidental: null, octave: 3 },
        maxOctave: { name: "C", accidental: null, octave: 4 }
      },
      clef: "bass"
    }
  },
];
