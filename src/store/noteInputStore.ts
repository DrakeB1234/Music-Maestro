import { ConvertMidiNoteToGenericNote, type GenericNote } from "@/helpers/NoteHelpers";
import { WebMidi } from "webmidi";
import { create } from "zustand";

interface NoteInputState {
  onButtonInput: (note: GenericNote) => void;
  setButtonInputListener: (callback: (note: GenericNote) => void) => void;
  triggerButtonInput: (note: GenericNote) => void;

  midiListeners: ((note: GenericNote) => void)[];
  addMidiListener: (callback: (note: GenericNote) => void) => void;
  removeMidiListener: (callback: (note: GenericNote) => void) => void;
  triggerMidiInput: (note: GenericNote) => void;

  connectMidiDevice: () => void;
  removeMidiDevice: () => void;
  forceMidiInput: (note: GenericNote | null) => void;
  isMidiDeviceConnected: boolean;
  setIsMidiDeviceConnected: (value: boolean) => void;
  midiDeviceErrorMessage: string | null;
  setMidiDeviceErrorMessage: (value: string) => void;
}

export const useNoteInputStore = create<NoteInputState>((set, get) => ({
  onButtonInput: () => { },
  setButtonInputListener: (callback) => set({ onButtonInput: callback }),
  triggerButtonInput: (note) => {
    const callback = get().onButtonInput;
    if (callback) callback(note);
  },

  midiListeners: [],
  addMidiListener: (callback) =>
    set((state) => ({ midiListeners: [...state.midiListeners, callback] })),
  removeMidiListener: (removeCallback) =>
    set((state) => ({
      midiListeners: state.midiListeners.filter((callback) => callback !== removeCallback),
    })),
  triggerMidiInput: (note) => {
    const listeners = get().midiListeners;
    for (const callback of listeners) callback(note);
  },

  connectMidiDevice: () => {
    const setMidiDeviceErrorMessage = get().setMidiDeviceErrorMessage;
    const setIsMidiDeviceConnected = get().setIsMidiDeviceConnected;

    WebMidi.enable()
      .then(() => {
        if (WebMidi.inputs.length < 1) {
          setMidiDeviceErrorMessage("No Devices found");
          setIsMidiDeviceConnected(false);
          return;
        }

        get().removeMidiDevice();

        WebMidi.inputs.forEach((input) => {
          console.log(`MIDI connected: ${input.name}`);
          input.addListener("noteon", (event) => {
            get().triggerMidiInput(ConvertMidiNoteToGenericNote(event.note));
          });
        });

        setIsMidiDeviceConnected(true);
      })
      .catch((err) => {
        setMidiDeviceErrorMessage(err);
        setIsMidiDeviceConnected(false);
      });
  },
  removeMidiDevice: () => {
    WebMidi.inputs.forEach((input) => {
      console.log(`MIDI listener removed: ${input.name}`);
      input.removeListener();
    });
  },
  forceMidiInput: (note) => {

    get().triggerMidiInput(note !== null ? note : {
      name: "C",
      accidental: null,
      octave: 4
    });
  },
  isMidiDeviceConnected: false,
  setIsMidiDeviceConnected: (value) => {
    set({ isMidiDeviceConnected: value });
  },
  midiDeviceErrorMessage: null,
  setMidiDeviceErrorMessage: (message) => {
    set({ midiDeviceErrorMessage: message });
  },
}));