import type { GenericNote } from "@helpers/NoteHelpers"

export type DrillOptions = {
  name?: string
  minOctaveRange?: number
  maxOctaveRange?: number
  allowAccidentals?: boolean
  timer?: number
  // Filter Notes, default allows all notes
  noteFilter?: GenericNote[]
  staffOptions: StaffOptions
}

export type StaffOptions = {
  clef?: "treble" | "bass"
}