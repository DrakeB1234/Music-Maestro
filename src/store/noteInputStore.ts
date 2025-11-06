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

  enableMidiAutoReconnect: () => void;
  disableMidiAutoReconnect: () => void;
  connectMidiDevice: () => void;
  disconnectMidiDevice: () => void;
  forceMidiInput: (note: GenericNote | null) => void;
  isMidiDeviceConnected: boolean;
  setIsMidiDeviceConnected: (value: boolean) => void;
  midiDeviceErrorMessage: string | null;
  setMidiDeviceErrorMessage: (value: string | null) => void;
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

  disableMidiAutoReconnect: () => disableMidiAutoReconnect(),
  enableMidiAutoReconnect: () => enableMidiAutoReconnect(get),
  connectMidiDevice: () => connectMidiDevice(get),
  disconnectMidiDevice: () => disconnectMidiDevice(),
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

function connectMidiDevice(get: () => NoteInputState) {
  const setMidiDeviceErrorMessage = get().setMidiDeviceErrorMessage;
  const setIsMidiDeviceConnected = get().setIsMidiDeviceConnected;

  WebMidi.enable()
    .then(() => {
      if (WebMidi.inputs.length < 1) {
        setMidiDeviceErrorMessage("No Devices found");
        setIsMidiDeviceConnected(false);
        return;
      }

      get().disconnectMidiDevice();

      WebMidi.inputs.forEach((input) => {
        input.addListener("noteon", (event) => {
          get().triggerMidiInput(ConvertMidiNoteToGenericNote(event.note));
        });
      });

      enableMidiAutoDisconnect(get);

      setMidiDeviceErrorMessage(null);
      setIsMidiDeviceConnected(true);
    })
    .catch((err) => {
      setMidiDeviceErrorMessage(err);
      setIsMidiDeviceConnected(false);
    });
};

function disconnectMidiDevice() {
  WebMidi.inputs.forEach((input) => {
    input.removeListener();
  });
}

function enableMidiAutoReconnect(get: () => NoteInputState) {
  WebMidi.removeListener("connected");
  WebMidi.addListener("connected", (event) => {
    if (event.port.type === "input") {
      console.log(`MIDI device connected: ${event.port.name}`);
      connectMidiDevice(get);
    }
  });

  enableMidiAutoDisconnect(get);
}

function disableMidiAutoReconnect() {
  WebMidi.removeListener("connected");
}

function enableMidiAutoDisconnect(get: () => NoteInputState) {
  WebMidi.removeListener("disconnected");

  WebMidi.addListener("disconnected", (event) => {
    if (event.port.type === "input") {
      console.log(`MIDI device disconnected: ${event.port.name}`);
      if (WebMidi.inputs.length < 1) {
        get().setIsMidiDeviceConnected(false);
        get().setMidiDeviceErrorMessage("MIDI device disconnected");
      }
    }
  });
}