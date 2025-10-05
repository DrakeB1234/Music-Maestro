export interface NoteDrillProfiles {
  name: string,
  clef: "treble" | "bass";
  // If undefined, then all notes are allowed
  allowedNotes?: string[];
  allowedAccidentals: boolean;
  minOctave: number;
  maxOctave: number;
}