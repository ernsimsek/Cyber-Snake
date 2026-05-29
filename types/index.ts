export interface Position {
  x: number;
  y: number;
}

export interface SnakeSegment extends Position {
  id: number;
}

export interface Food {
  id: number;
  x: number;
  y: number;
  type: "normal" | "bonus" | "golden";
  value: number;
  pulsePhase: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type GameScreen = "boot" | "menu" | "playing" | "paused" | "gameover" | "settings" | "leaderboard";

export interface GameStats {
  score: number;
  highScore: number;
  level: number;
  combo: number;
  maxCombo: number;
  streak: number;
  foodEaten: number;
  timeAlive: number;
  multiplier: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  difficulty: "easy" | "normal" | "hard" | "insane";
  theme: "cyber" | "neon" | "matrix" | "void";
  particlesEnabled: boolean;
  glowEnabled: boolean;
  showMinimap: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  level: number;
  date: string;
}

export interface BootLog {
  id: number;
  text: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: number;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  grid: string;
  snakeHead: string;
  snakeBody: string;
  food: string;
  foodGlow: string;
  text: string;
  hud: string;
}
