export const GRID_WIDTH = 30;
export const GRID_HEIGHT = 20;
export const BASE_CELL_SIZE = 24;

export const THEMES = {
  cyber: {
    primary: "#00f0ff",
    secondary: "#b829dd",
    accent: "#ff00aa",
    background: "#050508",
    grid: "rgba(0, 240, 255, 0.08)",
    snakeHead: "#00f0ff",
    snakeBody: "#0066ff",
    food: "#ff00aa",
    foodGlow: "rgba(255, 0, 170, 0.6)",
    text: "#e8e8ff",
    hud: "rgba(0, 240, 255, 0.15)",
  },
  neon: {
    primary: "#39ff14",
    secondary: "#ff073a",
    accent: "#ffea00",
    background: "#0a0a0a",
    grid: "rgba(57, 255, 20, 0.08)",
    snakeHead: "#39ff14",
    snakeBody: "#00ff88",
    food: "#ff073a",
    foodGlow: "rgba(255, 7, 58, 0.6)",
    text: "#f0f0f0",
    hud: "rgba(57, 255, 20, 0.15)",
  },
  matrix: {
    primary: "#00ff41",
    secondary: "#008f11",
    accent: "#003b00",
    background: "#000000",
    grid: "rgba(0, 255, 65, 0.06)",
    snakeHead: "#00ff41",
    snakeBody: "#008f11",
    food: "#ffffff",
    foodGlow: "rgba(255, 255, 255, 0.5)",
    text: "#00ff41",
    hud: "rgba(0, 255, 65, 0.15)",
  },
  void: {
    primary: "#ff6b35",
    secondary: "#f7c59f",
    accent: "#efefd0",
    background: "#0d0d0d",
    grid: "rgba(255, 107, 53, 0.08)",
    snakeHead: "#ff6b35",
    snakeBody: "#d4734e",
    food: "#f7c59f",
    foodGlow: "rgba(247, 197, 159, 0.6)",
    text: "#efefd0",
    hud: "rgba(255, 107, 53, 0.15)",
  },
};

export const FOOD_COLORS = {
  normal: "#ff00aa",
  bonus: "#00f0ff",
  golden: "#ffd700",
};

export const FOOD_GLOWS = {
  normal: "rgba(255, 0, 170, 0.6)",
  bonus: "rgba(0, 240, 255, 0.6)",
  golden: "rgba(255, 215, 0, 0.8)",
};
