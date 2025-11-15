import type { DrillPreset } from "@/types/DrillTypes";

export const defaultDrillPresetsData: DrillPreset[] = [
  {
    name: "Treble Landmark Notes",
    id: "3b1d93ed-0358-4fe6-979e-85a375de6478",
    difficulty: "Easy",
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
    name: "Treble Landmark Notes",
    id: "c4bb47d9-b0e5-4f6d-9785-60b2a0fb4e64",
    difficulty: "Medium",
    description: "C/G notes for learning landmark system",
    drillOptions: {
      timer: 60,
      inclusiveNotes: [
        { name: "C", accidental: null, octave: 4 },
        { name: "G", accidental: null, octave: 4 },
        { name: "C", accidental: null, octave: 5 },
        { name: "G", accidental: null, octave: 5 },
        { name: "C", accidental: null, octave: 6 },
      ],
      clef: "treble"
    }
  },
  {
    name: "Bass Landmark Notes",
    id: "ba032c09-fcc8-461a-b58e-74d492e35320",
    difficulty: "Easy",
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
    name: "Bass Landmark Notes",
    id: "06f3f4c3-7c6f-4931-9a6f-8adb4c0156f3",
    difficulty: "Medium",
    description: "C/F notes for learning landmark system",
    drillOptions: {
      timer: 60,
      inclusiveNotes: [
        { name: "C", accidental: null, octave: 4 },
        { name: "F", accidental: null, octave: 3 },
        { name: "C", accidental: null, octave: 3 },
        { name: "F", accidental: null, octave: 2 },
        { name: "C", accidental: null, octave: 2 },
      ],
      clef: "bass"
    }
  },
  {
    name: "Treble Drill",
    id: "5d24460b-15ac-4288-be18-97f1559b88f9",
    difficulty: "Easy",
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
    name: "Treble Drill",
    id: "dce1e681-85ac-4459-b506-8f492df87553",
    difficulty: "Medium",
    description: "Play notes from C4 to C6",
    drillOptions: {
      timer: 60,
      octaveRange: {
        minOctave: { name: "C", accidental: null, octave: 4 },
        maxOctave: { name: "C", accidental: null, octave: 6 }
      },
      clef: "treble"
    }
  },
  {
    name: "Bass Drill",
    id: "7040190f-db2c-4926-a3dc-8e937a620f8a",
    difficulty: "Easy",
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
  {
    name: "Bass Drill",
    id: "2de0922a-041d-48a7-8962-38352454f4a0",
    difficulty: "Medium",
    description: "Play notes from C4 to C2",
    drillOptions: {
      timer: 60,
      octaveRange: {
        minOctave: { name: "C", accidental: null, octave: 2 },
        maxOctave: { name: "C", accidental: null, octave: 4 }
      },
      clef: "bass"
    }
  },
];
