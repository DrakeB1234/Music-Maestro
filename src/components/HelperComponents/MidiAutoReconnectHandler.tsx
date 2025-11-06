import { useEffect } from "react";
import { useNoteInputStore } from "@/store/noteInputStore";
import { useAppPreferences } from "@/hooks/useAppPreferences";

export function MidiAutoReconnectHandler() {
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
  }, []);

  return null;
}
