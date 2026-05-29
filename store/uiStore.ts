"use client";

import { create } from "zustand";

interface UIState {
  bootComplete: boolean;
  bootProgress: number;
  bootLogs: string[];
  showSettings: boolean;
  showLeaderboard: boolean;
  hoveredElement: string | null;
  cursorPosition: { x: number; y: number };

  setBootComplete: (complete: boolean) => void;
  setBootProgress: (progress: number) => void;
  addBootLog: (log: string) => void;
  setShowSettings: (show: boolean) => void;
  setShowLeaderboard: (show: boolean) => void;
  setHoveredElement: (id: string | null) => void;
  setCursorPosition: (pos: { x: number; y: number }) => void;
}

export const useUIStore = create<UIState>((set) => ({
  bootComplete: false,
  bootProgress: 0,
  bootLogs: [],
  showSettings: false,
  showLeaderboard: false,
  hoveredElement: null,
  cursorPosition: { x: 0, y: 0 },

  setBootComplete: (complete) => set({ bootComplete: complete }),
  setBootProgress: (progress) => set({ bootProgress: progress }),
  addBootLog: (log) => set((state) => ({ bootLogs: [...state.bootLogs, log] })),
  setShowSettings: (show) => set({ showSettings: show }),
  setShowLeaderboard: (show) => set({ showLeaderboard: show }),
  setHoveredElement: (id) => set({ hoveredElement: id }),
  setCursorPosition: (pos) => set({ cursorPosition: pos }),
}));
