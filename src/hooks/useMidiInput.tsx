import { useCallback, useState } from "react";
import { WebMidi, Input, type NoteMessageEvent } from "webmidi";

export function useMidiInput(onNote: (note: string) => void) {

  const [isEnabled, setIsEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    try {
      setError(null);
      await WebMidi.enable();

      if (WebMidi.inputs.length === 0) {
        setError("No MIDI devices found.");
        setIsConnected(false);
        return;
      }

      const input: Input = WebMidi.inputs[0];
      console.log("Connected to:", input.name);
      setIsEnabled(true);
      setIsConnected(true);

      input.addListener("noteon", (e: NoteMessageEvent) => {
        const note = `${e.note.name}${e.note.octave}`; // e.g., "C4"
        onNote?.(note);
      });
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("The request is not allowed by the user agent")) {
          setError("Device could not be connected due to browser permission being denied.")
        }
        else {
          setError("Failed to connect to MIDI device.");
        }
      }
      console.error("Failed to enable WebMidi:", err);
      setIsConnected(false);
    }
  }, [onNote]);

  const disconnect = useCallback(() => {
    if (WebMidi.enabled) {
      WebMidi.inputs.forEach(input => input.removeListener());
      WebMidi.disable();
      setIsEnabled(false);
      setIsConnected(false);
      console.log("MIDI disconnected");
    }
  }, []);

  return { connect, disconnect, isEnabled, isConnected, error };
}
