"use client";

import { Particle, Position } from "@/types";

export class ParticleSystem {
  particles: Particle[] = [];
  private nextId = 0;

  spawnExplosion(
    x: number,
    y: number,
    count: number,
    color: string,
    speed: number = 3,
    size: number = 3
  ) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const velocity = speed * (0.5 + Math.random() * 0.5);
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        maxLife: 0.5 + Math.random() * 0.5,
        color,
        size: size * (0.5 + Math.random() * 0.5),
      });
    }
  }

  spawnTrail(x: number, y: number, color: string) {
    this.particles.push({
      x: x + (Math.random() - 0.5) * 4,
      y: y + (Math.random() - 0.5) * 4,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: 1,
      maxLife: 0.3 + Math.random() * 0.2,
      color,
      size: 2 + Math.random() * 2,
    });
  }

  spawnGlow(x: number, y: number, color: string, count: number = 5) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 15;
      this.particles.push({
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        vx: Math.cos(angle) * 0.3,
        vy: Math.sin(angle) * 0.3,
        life: 1,
        maxLife: 0.8 + Math.random() * 0.4,
        color,
        size: 1 + Math.random() * 2,
      });
    }
  }

  update(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= dt / p.maxLife;
      p.vx *= 0.98;
      p.vy *= 0.98;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const p of this.particles) {
      const alpha = p.life;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  clear() {
    this.particles = [];
  }

  get count() {
    return this.particles.length;
  }
}
