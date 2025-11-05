export interface AppPreferences {
  inputType: "buttons" | "piano" | null;
  midiPlaybackEnabled: boolean;
  midiPlaybackVolume: number;
}