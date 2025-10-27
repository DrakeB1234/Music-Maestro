import { create } from 'zustand';
import type { GenericNote } from '@/helpers/NoteHelpers';
import type { DrillOptions } from '@/types/DrillTypes';
import { defaultDrillOptions } from '@/helpers/DrillHelpers';

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
  }
}));
