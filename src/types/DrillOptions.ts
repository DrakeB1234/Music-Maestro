export type DrillProfile = {
  kind: DrillKind;
  name: string
  id: string
  type: string
  drillOptions: DrillOptions
}

export type DrillCustomOptions = {
  kind: DrillKind;
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
  staffOptions: StaffOptions
}

export type StaffOptions = {
  clef?: string
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