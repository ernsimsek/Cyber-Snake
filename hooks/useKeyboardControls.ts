"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { Direction, GameScreen } from "@/types";
import { playPauseSound, playClickSound } from "@/lib/soundGenerator";

export function useKeyboardControls() {
  const { setDirection, screen, setScreen, initGame, settings } = useGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen === "playing") {
        switch (e.key) {
          case "ArrowUp":
          case "w":
          case "W":
            e.preventDefault();
            setDirection("UP");
            break;
          case "ArrowDown":
          case "s":
          case "S":
            e.preventDefault();
            setDirection("DOWN");
            break;
          case "ArrowLeft":
          case "a":
          case "A":
            e.preventDefault();
            setDirection("LEFT");
            break;
          case "ArrowRight":
          case "d":
          case "D":
            e.preventDefault();
            setDirection("RIGHT");
            break;
          case " ":
          case "Escape":
            e.preventDefault();
            if (settings.soundEnabled) playPauseSound();
            setScreen("paused");
            break;
        }
      } else if (screen === "paused") {
        if (e.key === " " || e.key === "Escape") {
          e.preventDefault();
          if (settings.soundEnabled) playClickSound();
          setScreen("playing");
        }
      } else if (screen === "gameover") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          if (settings.soundEnabled) playClickSound();
          initGame();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screen, setDirection, setScreen, initGame, settings.soundEnabled]);
}
