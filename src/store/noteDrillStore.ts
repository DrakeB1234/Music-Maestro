import { create } from 'zustand';
import type { GenericNote } from '@/helpers/NoteHelpers';
import type { DrillOptions } from '@/types/DrillTypes';
import { PianoAudioPlayer } from '@/helpers/PianoAudioPlayer';

type PlayedNoteStatus = "correct" | "wrong" | null;

interface NoteDrillState {
  currentNote: GenericNote | null;
  setCurrentNote: (note: GenericNote) => void;

  playedNote: GenericNote | null;
  setPlayedNote: (note: GenericNote) => void;

  drillOptions: DrillOptions | null;
  setDrillOptions: (options: DrillOptions) => void;

  playedNoteStatus: PlayedNoteStatus;
  playedStatusNote: GenericNote | null;
  setPlayedNoteStatus: (status: PlayedNoteStatus, note: GenericNote) => void;

  isDrillStarted: boolean;
  setIsDrillStarted: (value: boolean) => void;

  drillTime: number;
  decrementDrillTime: () => void;
  setDrillTime: (time: number) => void;

  timeSinceLastCorrectNote: number;
  setTimeSinceLastCorrectNote: (time: number) => void;

  drillScore: number;
  setDrillScore: (score: number) => void;

  resetDrill: () => void;
  resetDrillOptions: () => void;

  handleAudioPlayerPrefsChange: (enabled: boolean, volume: number) => void;
}

export const useNoteDrillStore = create<NoteDrillState>((set, get) => ({
  currentNote: null,
  setCurrentNote: (note) => set({ currentNote: note }),

  playedNote: null,
  setPlayedNote: (note) => set({ playedNote: note }),

  drillOptions: null,
  setDrillOptions: (options) => {
    set((state) => ({
      drillOptions: { ...state.drillOptions, ...options }
    }));
  },

  playedNoteStatus: null,
  playedStatusNote: null,
  setPlayedNoteStatus: (status, note) =>
    set({
      playedNoteStatus: status,
      playedStatusNote: note
    }),

  isDrillStarted: false,
  setIsDrillStarted: (value) =>
    set({
      isDrillStarted: value
    }),

  drillTime: 0,
  decrementDrillTime: () => {
    if (get().drillTime < 1) {
      set({
        drillTime: 0
      });
    }
    else {
      set((state) => ({
        drillTime: Math.max(0, state.drillTime - 1)
      }));
    }
  },
  setDrillTime: (time) => {
    set({ drillTime: Math.max(0, time) });
  },

  timeSinceLastCorrectNote: 0,
  setTimeSinceLastCorrectNote: (time) => {
    set({ timeSinceLastCorrectNote: time });
  },

  drillScore: 0,
  setDrillScore: (score) =>
    set((state) => ({
      drillScore: state.drillScore + score
    })),

  resetDrill: () => {
    set({
      playedNote: null,
      playedNoteStatus: null,
      playedStatusNote: null,
      isDrillStarted: false,
      timeSinceLastCorrectNote: 0,
      drillTime: 0,
      drillScore: 0
    });
  },
  resetDrillOptions: () => {
    set({
      drillOptions: null
    });
  },

  handleAudioPlayerPrefsChange: (enabled, volume) => {
    PianoAudioPlayer.applyPreferences({
      playbackEnabled: enabled,
      volume: volume
    });
    PianoAudioPlayer.loadAllSamples();
  }
}));
