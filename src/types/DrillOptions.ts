export type DrillProfile = {
  name: string
  id: string
  type: string
  drillOptions: NoteDrillOptions
}

export type NoteDrillOptions = {
  minOctave?: number;
  maxOctave?: number;
  timer?: number;
  allowAccidentals?: boolean;
  // Will prevent note names from appearing in drill
  excludedNoteNames?: string[]
  staffOptions: StaffOptions
}

export type StaffOptions = {
  clef?: string
}

export const defaultDrillOptions: NoteDrillOptions = {
  minOctave: 4,
  maxOctave: 5,
  timer: 60,
  allowAccidentals: false,
  staffOptions: {
    clef: "treble"
  },
};