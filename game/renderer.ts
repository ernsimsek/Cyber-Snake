"use client";

import { SnakeSegment, Food, Particle, ThemeColors } from "@/types";
import { ParticleSystem } from "@/lib/particleSystem";
import { THEMES, FOOD_COLORS, FOOD_GLOWS } from "./constants";

export class GameRenderer {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  cellSize: number;
  gridW: number;
  gridH: number;
  particleSystem: ParticleSystem;
  theme: ThemeColors;
  time: number = 0;
  screenShake: number = 0;

  constructor(
    canvas: HTMLCanvasElement,
    gridW: number,
    gridH: number,
    themeName: keyof typeof THEMES = "cyber"
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");
    this.ctx = ctx;
    this.gridW = gridW;
    this.gridH = gridH;
    this.particleSystem = new ParticleSystem();
    this.theme = THEMES[themeName];

    this.width = canvas.width;
    this.height = canvas.height;
    this.cellSize = this.width / gridW;
  }

  setTheme(themeName: keyof typeof THEMES) {
    this.theme = THEMES[themeName];
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cellSize = width / this.gridW;
  }

  update(dt: number) {
    this.time += dt;
    this.particleSystem.update(dt);
    if (this.screenShake > 0) {
      this.screenShake -= dt * 2;
      if (this.screenShake < 0) this.screenShake = 0;
    }
  }

  clear() {
    const { ctx, width, height, screenShake } = this;
    ctx.save();
    if (screenShake > 0) {
      const shakeX = (Math.random() - 0.5) * screenShake * 4;
      const shakeY = (Math.random() - 0.5) * screenShake * 4;
      ctx.translate(shakeX, shakeY);
    }
    ctx.fillStyle = this.theme.background;
    ctx.fillRect(-10, -10, width + 20, height + 20);
    ctx.restore();
  }

  drawGrid() {
    const { ctx, width, height, cellSize, theme } = this;
    ctx.strokeStyle = theme.grid;
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= this.gridW; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cellSize, 0);
      ctx.lineTo(x * cellSize, height);
      ctx.stroke();
    }

    for (let y = 0; y <= this.gridH; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellSize);
      ctx.lineTo(width, y * cellSize);
      ctx.stroke();
    }
  }

  drawSnake(snake: SnakeSegment[], direction: string) {
    const { ctx, cellSize, theme, time } = this;

    snake.forEach((segment, index) => {
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      const isHead = index === 0;
      const progress = index / Math.max(snake.length - 1, 1);

      // Glow effect
      if (isHead) {
        const glowSize = cellSize * 2.5;
        const gradient = ctx.createRadialGradient(
          x + cellSize / 2,
          y + cellSize / 2,
          0,
          x + cellSize / 2,
          y + cellSize / 2,
          glowSize
        );
        gradient.addColorStop(0, `${theme.snakeHead}44`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(
          x + cellSize / 2 - glowSize,
          y + cellSize / 2 - glowSize,
          glowSize * 2,
          glowSize * 2
        );
      }

      // Body segment
      const padding = isHead ? 1 : 2;
      const segSize = cellSize - padding * 2;

      // Interpolate color from head to tail
      const r1 = parseInt(theme.snakeHead.slice(1, 3), 16);
      const g1 = parseInt(theme.snakeHead.slice(3, 5), 16);
      const b1 = parseInt(theme.snakeHead.slice(5, 7), 16);
      const r2 = parseInt(theme.snakeBody.slice(1, 3), 16);
      const g2 = parseInt(theme.snakeBody.slice(3, 5), 16);
      const b2 = parseInt(theme.snakeBody.slice(5, 7), 16);

      const r = Math.round(r1 + (r2 - r1) * progress);
      const g = Math.round(g1 + (g2 - g1) * progress);
      const b = Math.round(b1 + (b2 - b1) * progress);
      const color = `rgb(${r}, ${g}, ${b})`;

      // Main body
      ctx.fillStyle = color;
      const cornerRadius = isHead ? 6 : 4;
      this.roundRect(x + padding, y + padding, segSize, segSize, cornerRadius);
      ctx.fill();

      // Inner glow for head
      if (isHead) {
        ctx.fillStyle = `${theme.snakeHead}88`;
        this.roundRect(
          x + padding + 3,
          y + padding + 3,
          segSize - 6,
          segSize - 6,
          4
        );
        ctx.fill();

        // Eyes
        ctx.fillStyle = "#ffffff";
        const eyeSize = 3;
        const eyeOffset = 5;
        let eye1x = x + cellSize / 2;
        let eye1y = y + eyeOffset;
        let eye2x = x + cellSize / 2;
        let eye2y = y + cellSize - eyeOffset - eyeSize;

        if (direction === "LEFT") {
          eye1x = x + eyeOffset;
          eye1y = y + cellSize / 2 - eyeOffset;
          eye2x = x + eyeOffset;
          eye2y = y + cellSize / 2 + eyeOffset - eyeSize;
        } else if (direction === "RIGHT") {
          eye1x = x + cellSize - eyeOffset - eyeSize;
          eye1y = y + cellSize / 2 - eyeOffset;
          eye2x = x + cellSize - eyeOffset - eyeSize;
          eye2y = y + cellSize / 2 + eyeOffset - eyeSize;
        } else if (direction === "UP") {
          eye1x = x + cellSize / 2 - eyeOffset - eyeSize;
          eye1y = y + eyeOffset;
          eye2x = x + cellSize / 2 + eyeOffset;
          eye2y = y + eyeOffset;
        } else if (direction === "DOWN") {
          eye1x = x + cellSize / 2 - eyeOffset - eyeSize;
          eye1y = y + cellSize - eyeOffset - eyeSize;
          eye2x = x + cellSize / 2 + eyeOffset;
          eye2y = y + cellSize - eyeOffset - eyeSize;
        }

        ctx.beginPath();
        ctx.arc(eye1x + eyeSize / 2, eye1y + eyeSize / 2, eyeSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eye2x + eyeSize / 2, eye2y + eyeSize / 2, eyeSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Trail particles
      if (index < 3 && Math.random() > 0.7) {
        this.particleSystem.spawnTrail(
          x + cellSize / 2,
          y + cellSize / 2,
          color
        );
      }
    });
  }

  drawFood(food: Food[]) {
    const { ctx, cellSize, time } = this;

    food.forEach((f) => {
      const x = f.x * cellSize;
      const y = f.y * cellSize;
      const centerX = x + cellSize / 2;
      const centerY = y + cellSize / 2;

      const pulse = Math.sin(time * 0.003 + f.pulsePhase) * 0.3 + 0.7;
      const color = FOOD_COLORS[f.type];
      const glow = FOOD_GLOWS[f.type];

      // Outer glow
      const glowSize = cellSize * (1.5 + pulse * 0.5);
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        glowSize
      );
      gradient.addColorStop(0, glow);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Main orb
      const orbSize = (cellSize / 3) * pulse;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbSize, 0, Math.PI * 2);
      ctx.fill();

      // Inner bright core
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(centerX - 1, centerY - 1, orbSize * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Rotating ring for bonus/golden
      if (f.type !== "normal") {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.6;
        const ringRadius = cellSize * 0.6;
        ctx.beginPath();
        ctx.arc(
          centerX,
          centerY,
          ringRadius,
          time * 0.002 + f.pulsePhase,
          time * 0.002 + f.pulsePhase + Math.PI * 1.5
        );
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
  }

  drawParticles() {
    this.particleSystem.draw(this.ctx);
  }

  drawComboEffect(combo: number, x: number, y: number) {
    if (combo > 1) {
      const { ctx } = this;
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`x${combo}`, x, y);
    }
  }

  spawnEatParticles(x: number, y: number, type: Food["type"]) {
    const color = FOOD_COLORS[type];
    const count = type === "golden" ? 20 : type === "bonus" ? 12 : 8;
    const speed = type === "golden" ? 5 : 3;
    this.particleSystem.spawnExplosion(
      x * this.cellSize + this.cellSize / 2,
      y * this.cellSize + this.cellSize / 2,
      count,
      color,
      speed
    );
  }

  spawnDeathParticles(snake: SnakeSegment[]) {
    snake.forEach((s) => {
      this.particleSystem.spawnExplosion(
        s.x * this.cellSize + this.cellSize / 2,
        s.y * this.cellSize + this.cellSize / 2,
        5,
        this.theme.snakeHead,
        4
      );
    });
  }

  private roundRect(
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}
