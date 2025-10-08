import { useCallback, useState } from "react";
import { WebMidi, Input, type NoteMessageEvent, Note } from "webmidi";
import { ConvertMidiNoteToGenericNote, GenericNote } from "@helpers/NoteHelpers";

// 
// Use the listener WebMidi.addListener("connected") to check for any connection events/disconnection events,
// Implement hook / method for connecting to this event
// 

export function useMidiInput() {

  const [isEnabled, setIsEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullError, setFullError] = useState<any>(null);
  const [lastNotePlayed, setLastNotePlayed] = useState<GenericNote | null>(null);

  const connect = useCallback(async () => {
    try {
      setError(null);

      if (!WebMidi.supported) {
        setError("Web MIDI API is not supported in this browser.");
        setIsConnected(false);
        return;
      }

      await WebMidi.enable({ sysex: true });
      if (WebMidi.inputs.length === 0) {
        setError("No MIDI devices found.");
        setIsConnected(false);
        return;
      }

      const input: Input = WebMidi.inputs[0];
      setIsEnabled(true);
      setIsConnected(true);

      input.removeListener();
      input.addListener("noteon", (e: NoteMessageEvent) => {
        HandleNotePlayed(e.note);
      });

    } catch (err: any) {
      let message = "Failed to connect to MIDI device.";
      if (err?.message?.includes("Platform dependent init failed")) message = "MIDI not supported on this device or platform.";
      if (err?.message?.includes("The request is not allowed by the user agent")) message = "Device could not be connected due to browser permission being denied.";

      setError(message);
      setFullError(err);
      setIsConnected(false);
      setIsEnabled(false);
      console.error("WebMidi error:", err);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (WebMidi.enabled) {
      WebMidi.inputs.forEach(input => input.removeListener());
      WebMidi.disable();
      setIsEnabled(false);
      setIsConnected(false);
      console.log("MIDI disconnected");
    }
  }, []);

  function HandleNotePlayed(note: Note) {
    const newNote = ConvertMidiNoteToGenericNote(note);
    setLastNotePlayed(newNote);
  }

  function ClearInput() {
    setLastNotePlayed(null);
  }

  return { ConnectDevice: connect, DisconnectDevice: disconnect, ClearInput, isEnabled, isConnected, error, lastNotePlayed, fullError };
}
