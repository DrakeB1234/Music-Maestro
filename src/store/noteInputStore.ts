import { ConvertMidiNoteToGenericNote, type GenericNote } from "@/helpers/NoteHelpers";
import { WebMidi } from "webmidi";
import { create } from "zustand";

let pendingNotes: GenericNote[] = [];
let chordTimer: any = null;
const CHORD_TIMEOUT_MS = 30;

interface NoteInputState {
  onButtonInput: (note: GenericNote) => void;
  setButtonInputListener: (callback: (note: GenericNote) => void) => void;
  triggerButtonInput: (note: GenericNote) => void;

  singleNoteMidiListeners: ((note: GenericNote) => void)[];
  addSingleNoteMidiListener: (callback: (note: GenericNote) => void) => void;
  removeSingleNoteMidiListener: (callback: (note: GenericNote) => void) => void;
  triggerMidiInput: (note: GenericNote) => void;

  chordMidiListeners: ((notes: GenericNote[]) => void)[];
  addChordMidiListener: (callback: (notes: GenericNote[]) => void) => void;
  removeChordMidiListener: (callback: (notes: GenericNote[]) => void) => void;
  triggerMidiChordInput: (notes: GenericNote[]) => void;

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

  singleNoteMidiListeners: [],
  addSingleNoteMidiListener: (callback) =>
    set((state) => ({ singleNoteMidiListeners: [...state.singleNoteMidiListeners, callback] })),
  removeSingleNoteMidiListener: (removeCallback) =>
    set((state) => ({
      singleNoteMidiListeners: state.singleNoteMidiListeners.filter((callback) => callback !== removeCallback),
    })),
  triggerMidiInput: (note) => {
    const listeners = get().singleNoteMidiListeners;
    for (const callback of listeners) callback(note);
  },

  chordMidiListeners: [],
  addChordMidiListener: (callback) =>
    set((state) => ({ chordMidiListeners: [...state.chordMidiListeners, callback] })),
  removeChordMidiListener: (removeCallback) =>
    set((state) => ({
      chordMidiListeners: state.chordMidiListeners.filter((callback) => callback !== removeCallback),
    })),
  triggerMidiChordInput: (note) => {
    const listeners = get().chordMidiListeners;
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
          const note = ConvertMidiNoteToGenericNote(event.note);
          pendingNotes.push(note);

          if (chordTimer) clearTimeout(chordTimer);
          chordTimer = setTimeout(() => {
            if (pendingNotes.length === 1) {
              get().triggerMidiInput(pendingNotes[0]);
            } else {
              get().triggerMidiChordInput(pendingNotes);
            }

            pendingNotes = [];
            chordTimer = null;
          }, CHORD_TIMEOUT_MS);
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
      if (WebMidi.inputs.length < 1) {
        get().setIsMidiDeviceConnected(false);
        get().setMidiDeviceErrorMessage("MIDI device disconnected");
      }
    }
  });
}