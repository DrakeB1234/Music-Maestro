import type { GenericNote } from "@helpers/NoteHelpers"

export type DrillOptions = {
  name?: string
  minOctaveRange?: number
  maxOctaveRange?: number
  allowAccidentals?: boolean
  // Force certain notes / octave / accidentals
  overrideAllowedNotes?: GenericNote[]
  staffOptions: StaffOptions
}

export type StaffOptions = {
  clef?: "treble" | "bass"
}