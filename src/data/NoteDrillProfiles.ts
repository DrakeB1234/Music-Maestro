import type { DrillProfile } from "@customtypes/DrillOptions";

export const defaultDrillProfileData: DrillProfile[] = [
  {
    kind: "profile",
    name: "Treble Landmark Notes",
    id: "3b1d93ed-0358-4fe6-979e-85a375de6478",
    type: "default",
    drillOptions: {
      minOctave: 4,
      maxOctave: 5,
      timer: 60,
      allowAccidentals: false,
      excludedNoteNames: [
        "D", "E", "F", "A", "B"
      ],
      staffOptions: {
        clef: "treble"
      }
    },
  }
];
