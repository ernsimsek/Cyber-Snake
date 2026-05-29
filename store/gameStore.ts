"use client";

import { create } from "zustand";
import {
  GameScreen,
  GameStats,
  GameSettings,
  LeaderboardEntry,
  Position,
  Direction,
  Food,
  SnakeSegment,
} from "@/types";

interface GameState {
  screen: GameScreen;
  snake: SnakeSegment[];
  direction: Direction;
  nextDirection: Direction;
  food: Food[];
  stats: GameStats;
  settings: GameSettings;
  leaderboard: LeaderboardEntry[];
  gridSize: number;
  cellSize: number;
  isSlowMotion: boolean;
  screenShake: number;
  lastUpdate: number;
  gameSpeed: number;
  comboTimer: number;

  // Actions
  setScreen: (screen: GameScreen) => void;
  initGame: () => void;
  setDirection: (dir: Direction) => void;
  updateGame: (dt: number) => void;
  eatFood: (foodId: number) => void;
  gameOver: () => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  addLeaderboardEntry: (entry: Omit<LeaderboardEntry, "rank">) => void;
  setSlowMotion: (active: boolean) => void;
  setScreenShake: (amount: number) => void;
  resetComboTimer: () => void;
}

const defaultSettings: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  difficulty: "normal",
  theme: "cyber",
  particlesEnabled: true,
  glowEnabled: true,
  showMinimap: true,
};

const defaultStats: GameStats = {
  score: 0,
  highScore: 0,
  level: 1,
  combo: 0,
  maxCombo: 0,
  streak: 0,
  foodEaten: 0,
  timeAlive: 0,
  multiplier: 1,
};

const difficultySpeeds = {
  easy: 150,
  normal: 120,
  hard: 90,
  insane: 60,
};

const GRID_W = 30;
const GRID_H = 20;

function createFood(snake: SnakeSegment[], existingFood: Food[], id: number): Food {
  let x: number, y: number;
  let attempts = 0;
  do {
    x = Math.floor(Math.random() * GRID_W);
    y = Math.floor(Math.random() * GRID_H);
    attempts++;
  } while (
    attempts < 100 &&
    (snake.some((s) => s.x === x && s.y === y) ||
      existingFood.some((f) => f.x === x && f.y === y))
  );

  const rand = Math.random();
  let type: Food["type"] = "normal";
  let value = 10;
  if (rand > 0.95) {
    type = "golden";
    value = 50;
  } else if (rand > 0.85) {
    type = "bonus";
    value = 25;
  }

  return {
    id,
    x,
    y,
    type,
    value,
    pulsePhase: Math.random() * Math.PI * 2,
  };
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: "boot",
  snake: [],
  direction: "RIGHT",
  nextDirection: "RIGHT",
  food: [],
  stats: { ...defaultStats },
  settings: { ...defaultSettings },
  leaderboard: [
    { rank: 1, name: "NEON", score: 5000, level: 8, date: "2025-01-15" },
    { rank: 2, name: "CYBER", score: 3500, level: 6, date: "2025-01-14" },
    { rank: 3, name: "VOID", score: 2800, level: 5, date: "2025-01-13" },
    { rank: 4, name: "FLUX", score: 2100, level: 4, date: "2025-01-12" },
    { rank: 5, name: "XENO", score: 1500, level: 3, date: "2025-01-11" },
  ],
  gridSize: GRID_W,
  cellSize: 20,
  isSlowMotion: false,
  screenShake: 0,
  lastUpdate: 0,
  gameSpeed: difficultySpeeds.normal,
  comboTimer: 0,

  setScreen: (screen) => set({ screen }),

  initGame: () => {
    const settings = get().settings;
    const speed = difficultySpeeds[settings.difficulty];
    const startX = Math.floor(GRID_W / 2);
    const startY = Math.floor(GRID_H / 2);

    const snake: SnakeSegment[] = [
      { x: startX, y: startY, id: 0 },
      { x: startX - 1, y: startY, id: 1 },
      { x: startX - 2, y: startY, id: 2 },
    ];

    const food: Food[] = [createFood(snake, [], 1)];

    set({
      screen: "playing",
      snake,
      direction: "RIGHT",
      nextDirection: "RIGHT",
      food,
      stats: { ...defaultStats, highScore: get().stats.highScore },
      isSlowMotion: false,
      screenShake: 0,
      lastUpdate: 0,
      gameSpeed: speed,
      comboTimer: 0,
    });
  },

  setDirection: (dir) => {
    const current = get().direction;
    const opposites: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };
    if (opposites[current] !== dir) {
      set({ nextDirection: dir });
    }
  },

  updateGame: (dt) => {
    const state = get();
    if (state.screen !== "playing") return;

    const newLastUpdate = state.lastUpdate + dt;
    const currentSpeed = state.isSlowMotion
      ? state.gameSpeed * 2
      : state.gameSpeed;

    if (newLastUpdate < currentSpeed) {
      set({ lastUpdate: newLastUpdate });
      return;
    }

    const moveInterval = newLastUpdate - currentSpeed;
    set({ lastUpdate: moveInterval });

    const direction = state.nextDirection;
    const head = state.snake[0];
    let newHead: SnakeSegment;

    switch (direction) {
      case "UP":
        newHead = { x: head.x, y: head.y - 1, id: Date.now() };
        break;
      case "DOWN":
        newHead = { x: head.x, y: head.y + 1, id: Date.now() };
        break;
      case "LEFT":
        newHead = { x: head.x - 1, y: head.y, id: Date.now() };
        break;
      case "RIGHT":
        newHead = { x: head.x + 1, y: head.y, id: Date.now() };
        break;
    }

    // Wall collision check
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_W ||
      newHead.y < 0 ||
      newHead.y >= GRID_H
    ) {
      get().gameOver();
      return;
    }

    // Self collision
    if (state.snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
      get().gameOver();
      return;
    }

    const newSnake = [newHead, ...state.snake];
    let newFood = [...state.food];
    let newStats = { ...state.stats };
    let newComboTimer = state.comboTimer - dt;
    let newSpeed = state.gameSpeed;

    // Check food collision
    const eatenFoodIndex = newFood.findIndex(
      (f) => f.x === newHead.x && f.y === newHead.y
    );

    if (eatenFoodIndex >= 0) {
      const eatenFood = newFood[eatenFoodIndex];
      newFood.splice(eatenFoodIndex, 1);

      // Combo system
      if (newComboTimer > 0) {
        newStats.combo = Math.min(newStats.combo + 1, 10);
      } else {
        newStats.combo = 1;
      }
      newComboTimer = 3000;
      newStats.maxCombo = Math.max(newStats.maxCombo, newStats.combo);

      // Multiplier
      newStats.multiplier = 1 + Math.floor(newStats.combo / 3) * 0.5;

      // Score
      const points = Math.floor(eatenFood.value * newStats.multiplier);
      newStats.score += points;
      newStats.foodEaten += 1;
      newStats.streak += 1;

      // Level up every 5 food
      const newLevel = Math.floor(newStats.foodEaten / 5) + 1;
      if (newLevel > newStats.level) {
        newStats.level = newLevel;
        newSpeed = Math.max(
          40,
          difficultySpeeds[state.settings.difficulty] - (newLevel - 1) * 8
        );
      }

      // Spawn new food
      const maxId = Math.max(...newFood.map((f) => f.id), 0);
      newFood.push(createFood(newSnake, newFood, maxId + 1));

      // Bonus food chance
      if (Math.random() > 0.7) {
        newFood.push(createFood(newSnake, newFood, maxId + 2));
      }
    } else {
      newSnake.pop();
      newStats.streak = 0;
      if (newComboTimer <= 0) {
        newStats.combo = 0;
        newStats.multiplier = 1;
      }
    }

    newStats.timeAlive += dt;

    set({
      snake: newSnake,
      direction,
      food: newFood,
      stats: newStats,
      gameSpeed: newSpeed,
      comboTimer: newComboTimer,
    });
  },

  eatFood: (foodId) => {
    // Handled in updateGame
  },

  gameOver: () => {
    const state = get();
    const newHighScore = Math.max(state.stats.score, state.stats.highScore);
    const newStats = { ...state.stats, highScore: newHighScore };

    set({
      screen: "gameover",
      stats: newStats,
      isSlowMotion: false,
      screenShake: 0,
    });

    // Add to leaderboard if score is high enough
    if (state.stats.score > 0) {
      const entry: Omit<LeaderboardEntry, "rank"> = {
        name: "PLAYER",
        score: state.stats.score,
        level: state.stats.level,
        date: new Date().toISOString().split("T")[0],
      };
      get().addLeaderboardEntry(entry);
    }
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    }));
  },

  addLeaderboardEntry: (entry) => {
    set((state) => {
      const newEntries = [...state.leaderboard, { ...entry, rank: 0 }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map((e, i) => ({ ...e, rank: i + 1 }));
      return { leaderboard: newEntries };
    });
  },

  setSlowMotion: (active) => set({ isSlowMotion: active }),
  setScreenShake: (amount) => set({ screenShake: amount }),
  resetComboTimer: () => set({ comboTimer: 3000 }),
}));
