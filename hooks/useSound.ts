"use client";

import { useCallback } from "react";
import {
  playEatSound,
  playGameOverSound,
  playHoverSound,
  playClickSound,
  playStartSound,
  playComboSound,
  playBonusSound,
  playPauseSound,
  playBootSound,
  playErrorSound,
  playLevelUpSound,
} from "@/lib/soundGenerator";
import { useGameStore } from "@/store/gameStore";

export function useSound() {
  const { settings } = useGameStore();
  const enabled = settings.soundEnabled;

  return {
    eat: useCallback((combo: number) => enabled && playEatSound(combo), [enabled]),
    gameOver: useCallback(() => enabled && playGameOverSound(), [enabled]),
    hover: useCallback(() => enabled && playHoverSound(), [enabled]),
    click: useCallback(() => enabled && playClickSound(), [enabled]),
    start: useCallback(() => enabled && playStartSound(), [enabled]),
    combo: useCallback((combo: number) => enabled && playComboSound(combo), [enabled]),
    bonus: useCallback(() => enabled && playBonusSound(), [enabled]),
    pause: useCallback(() => enabled && playPauseSound(), [enabled]),
    boot: useCallback(() => enabled && playBootSound(), [enabled]),
    error: useCallback(() => enabled && playErrorSound(), [enabled]),
    levelUp: useCallback(() => enabled && playLevelUpSound(), [enabled]),
  };
}
