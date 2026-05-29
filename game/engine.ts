"use client";

import { useRef, useCallback, useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { useGameLoop } from "@/hooks/useGameLoop";
import { GameRenderer } from "./renderer";
import { useSound } from "@/hooks/useSound";
import { GRID_WIDTH, GRID_HEIGHT } from "./constants";

export function useGameEngine(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const rendererRef = useRef<GameRenderer | null>(null);
  const prevFoodCount = useRef(0);
  const sound = useSound();

  const {
    snake,
    direction,
    food,
    stats,
    screen,
    settings,
    updateGame,
    gameOver,
    screenShake,
    isSlowMotion,
  } = useGameStore();

  // Initialize renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const renderer = new GameRenderer(
      canvas,
      GRID_WIDTH,
      GRID_HEIGHT,
      settings.theme
    );
    renderer.resize(canvas.width, canvas.height);
    rendererRef.current = renderer;

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * dpr;
      canvas.height = newRect.height * dpr;
      renderer.resize(canvas.width, canvas.height);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [canvasRef, settings.theme]);

  // Update theme when changed
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setTheme(settings.theme);
    }
  }, [settings.theme]);

  // Detect food eaten for effects
  useEffect(() => {
    if (food.length < prevFoodCount.current && screen === "playing") {
      // Food was eaten - effects handled in game loop via particle spawn
    }
    prevFoodCount.current = food.length;
  }, [food.length, screen]);

  const gameLoop = useCallback(
    (dt: number) => {
      const renderer = rendererRef.current;
      if (!renderer) return;

      // Update game logic
      if (screen === "playing") {
        updateGame(dt);
      }

      // Update renderer
      renderer.update(dt);
      renderer.screenShake = screenShake;

      // Render
      renderer.clear();
      renderer.drawGrid();
      renderer.drawFood(food);
      renderer.drawSnake(snake, direction);
      renderer.drawParticles();
    },
    [
      snake,
      direction,
      food,
      screen,
      screenShake,
      updateGame,
    ]
  );

  useGameLoop(gameLoop, screen === "playing" || screen === "paused");

  return { rendererRef };
}
