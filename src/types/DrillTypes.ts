import type { GenericNote } from "@/helpers/NoteHelpers"


export type DrillKind = "custom" | "preset";
export type DrillClefTypes = "treble" | "bass";
export type DrillDifficultyTypes = "easy" | "medium" | "hard";
export type NOTE_NAME_TYPES = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type Accidental = "#" | "b" | "n";

export type OctaveRangeSet = {
  clef: DrillClefTypes,
  range: OctaveRange
}

export type OctaveRange = {
  minOctave: GenericNote;
  maxOctave: GenericNote;
}

export type DrillPreset = {
  name: string;
  id: string;
  description: string;
  difficulty: DrillDifficultyTypes;
  drillOptions: DrillOptions;
}

export type DrillCustomOptions = {
  drillOptions: DrillOptions
}

export type AllowedAccidentals = {
  naturals?: boolean;
  sharps?: boolean;
  flats?: boolean;
}

export type DrillOptions = {
  octaveRange?: OctaveRange;
  timer?: number;
  allowedAccidentals?: AllowedAccidentals,
  // Will prevent note names from appearing in drill
  excludedNoteNames?: string[]
  // Will ONLY include notes provided in arr
  inclusiveNotes?: GenericNote[]
  clef?: DrillClefTypes;
  // Used when a preset drill is ran, to store drill data into local storage
  drillId?: string;
}