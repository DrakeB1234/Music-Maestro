import type { GenericNote } from "@/helpers/NoteHelpers"

export type DrillPreset = {
  name: string
  id: string
  description: string
  drillOptions: DrillOptions
}

export type DrillCustomOptions = {
  drillOptions: DrillOptions
}

export type DrillKind = "custom" | "preset";

export type DrillClefTypes = "treble" | "bass";
export const clefOctaveLimits: Record<DrillClefTypes, { minOctave: number; maxOctave: number }> = {
  treble: { minOctave: 4, maxOctave: 7 },
  bass: { minOctave: 1, maxOctave: 5 },
};

export type DrillOptions = {
  minOctave?: number;
  maxOctave?: number;
  timer?: number;
  allowAccidentals?: boolean;
  // Will prevent note names from appearing in drill
  excludedNoteNames?: string[]
  // Will ONLY include notes provided in arr
  inclusiveNotes?: GenericNote[]
  staffOptions: StaffOptions
}

export type StaffOptions = {
  clef?: DrillClefTypes;
}

export const defaultDrillOptions: DrillOptions = {
  minOctave: 4,
  maxOctave: 5,
  timer: 60,
  allowAccidentals: false,
  staffOptions: {
    clef: "treble"
  }
};