import type { GenericNote } from "@/helpers/NoteHelpers"

export type DrillProfile = {
  name: string
  id: string
  drillOptions: DrillOptions
}

export type DrillCustomOptions = {
  drillOptions: DrillOptions
}

export type DrillKind = "custom" | "profile"

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
  clef?: "treble" | "bass"
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