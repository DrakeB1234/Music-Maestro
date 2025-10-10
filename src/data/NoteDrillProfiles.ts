import type { DrillProfile } from "@/types/DrillOptionTypes";

export const defaultDrillProfileData: DrillProfile[] = [
  {
    name: "Treble Landmark Notes",
    id: "3b1d93ed-0358-4fe6-979e-85a375de6478",
    drillOptions: {
      minOctave: 4,
      maxOctave: 5,
      timer: 999,
      allowAccidentals: false,
      excludedNoteNames: [
        "D", "E", "F", "A", "B"
      ],
      staffOptions: {
        clef: "treble"
      }
    }
  },
  {
    name: "Bass Landmark Notes",
    id: "ba032c09-fcc8-461a-b58e-74d492e35320",
    drillOptions: {
      minOctave: 3,
      maxOctave: 4,
      timer: 999,
      allowAccidentals: false,
      excludedNoteNames: [
        "D", "E", "G", "A", "B"
      ],
      staffOptions: {
        clef: "bass"
      }
    }
  }
];
