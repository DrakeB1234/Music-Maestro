import { create } from 'zustand';
import type { GenericNote } from '@/helpers/NoteHelpers';
import type { DrillOptions } from '@/types/DrillTypes';

type PlayedNoteStatus = "correct" | "wrong" | null;

interface NoteDrillState {
  currentNote: GenericNote | null;
  setCurrentNote: (note: GenericNote) => void;

  playedNote: GenericNote | null;
  setPlayedNote: (note: GenericNote) => void;

  drillOptions: DrillOptions | null;
  setDrillOptions: (options: DrillOptions) => void;

  totalNotesPlayed: number;
  incrementTotalNotesPlayed: () => void;
  correctNotesPlayed: number;
  incrementCorrectNotesPlayed: () => void;

  playedNoteStatus: PlayedNoteStatus;
  playedStatusNote: GenericNote | null;
  setPlayedNoteStatus: (status: PlayedNoteStatus, note: GenericNote) => void;

  isDrillTimerRunning: boolean;
  drillTime: number;
  decrementDrillTime: () => void;
  setDrillTime: (time: number) => void;

  resetDrill: () => void;
  resetDrillOptions: () => void;
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
  playedStatusNote: null,
  setPlayedNoteStatus: (status, note) =>
    set({
      playedNoteStatus: status,
      playedStatusNote: note
    }),

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

  resetDrill: () => {
    set({
      playedNote: null,
      totalNotesPlayed: 0,
      correctNotesPlayed: 0,
      isDrillTimerRunning: true
    });
  },
  resetDrillOptions: () => {
    set({
      drillOptions: null
    });
  }
}));
