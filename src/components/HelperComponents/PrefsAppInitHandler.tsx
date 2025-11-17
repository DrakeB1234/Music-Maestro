import { useEffect } from "react";
import { useNoteInputStore } from "@/store/noteInputStore";
import { useAppPreferences } from "@/hooks/useAppPreferences";
import { PianoAudioPlayer } from "@/helpers/PianoAudioPlayer";

export function PrefsAppInitHandler() {
  const { prefs } = useAppPreferences();
  const enableMidiAutoReconnect = useNoteInputStore(state => state.enableMidiAutoReconnect);
  const disableMidiAutoReconnect = useNoteInputStore(state => state.disableMidiAutoReconnect);

  useEffect(() => {
    if (prefs.midiDeviceAutoConnect) {
      enableMidiAutoReconnect();
    }
    else if (!prefs.midiDeviceAutoConnect) {
      disableMidiAutoReconnect();
    }

    if (prefs.midiPlaybackEnabled && prefs.midiPlaybackVolume) {
      PianoAudioPlayer.applyPreferences({
        playbackEnabled: prefs.midiPlaybackEnabled,
        volume: prefs.midiPlaybackVolume
      });
      PianoAudioPlayer.loadAllSamples();
    }
  }, []);

  return null;
}
