import { create } from 'zustand';
import type { GenericNote } from '@/helpers/NoteHelpers';
import type { DrillOptions } from '@/types/DrillTypes';
import { defaultDrillOptions } from '@/helpers/DrillHelpers';

type PlayedNoteStatus = "correct" | "wrong" | null;

interface NoteDrillState {
  currentNote: GenericNote | null;
  setCurrentNote: (note: GenericNote) => void;

  playedNote: GenericNote | null;
  setPlayedNote: (note: GenericNote) => void;

  drillOptions: DrillOptions;
  setDrillOptions: (options: Partial<DrillOptions>) => void;

  totalNotesPlayed: number;
  incrementTotalNotesPlayed: () => void;
  correctNotesPlayed: number;
  incrementCorrectNotesPlayed: () => void;

  playedNoteStatus: PlayedNoteStatus;
  setPlayedNoteStatus: (status: PlayedNoteStatus) => void;

  isDrillTimerRunning: boolean;
  drillTime: number;
  decrementDrillTime: () => void;
  setDrillTime: (time: number) => void;

  reset: () => void;
}

export const useNoteDrillStore = create<NoteDrillState>((set, get) => ({
  currentNote: null,
  setCurrentNote: (note) => set({ currentNote: note }),

  playedNote: null,
  setPlayedNote: (note) => set({ playedNote: note }),

  drillOptions: defaultDrillOptions,
  setDrillOptions: (options) => {
    set((state) => ({
      drillOptions: { ...state.drillOptions, ...options }
    }));
  },

  totalNotesPlayed: 0,
  incrementTotalNotesPlayed: () => {
    set((state) => ({
      totalNotesPlayed: state.totalNotesPlayed + 1
    }));
  },
  correctNotesPlayed: 0,
  incrementCorrectNotesPlayed: () => {
    set((state) => ({
      correctNotesPlayed: state.correctNotesPlayed + 1
    }));
  },

  playedNoteStatus: null,
  setPlayedNoteStatus: (status) => {
    set({ playedNoteStatus: status });
  },

  isDrillTimerRunning: true,
  drillTime: 0,
  decrementDrillTime: () => {
    if (get().drillTime < 1) {
      set({ isDrillTimerRunning: false })
    }
    else {
      set((state) => ({
        drillTime: Math.max(0, state.drillTime - 1)
      }));
    }
  },
  setDrillTime: (time: number) => {
    set({ drillTime: Math.max(0, time) });
  },

  reset: () => {
    set({
      playedNote: null,
      totalNotesPlayed: 0,
      correctNotesPlayed: 0,
      isDrillTimerRunning: true
    });
    get().setDrillTime(0);
  }
}));
