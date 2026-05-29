"use client";

import { useGameStore } from "@/store/gameStore";
import { GRID_WIDTH, GRID_HEIGHT, THEMES, FOOD_COLORS } from "@/game/constants";

const MAP_SIZE = 88;

export default function MiniMap() {
  const { snake, food, settings, screen } = useGameStore();

  if (!settings.showMinimap || screen !== "playing") return null;

  const theme = THEMES[settings.theme];

  return (
    <div
      className="fixed top-[5.5rem] right-3 md:top-24 md:right-6 z-20 pointer-events-none"
      aria-hidden
    >
      <div
        className="rounded-md border p-0.5"
        style={{
          width: MAP_SIZE + 6,
          height: MAP_SIZE + 6,
          background: `${theme.background}cc`,
          borderColor: `${theme.primary}44`,
        }}
      >
        <svg
          width={MAP_SIZE}
          height={MAP_SIZE}
          className="block rounded-sm"
          viewBox={`0 0 ${GRID_WIDTH} ${GRID_HEIGHT}`}
        >
          {food.map((f) => (
            <rect
              key={f.id}
              x={f.x}
              y={f.y}
              width={1}
              height={1}
              fill={FOOD_COLORS[f.type]}
            />
          ))}
          {snake.map((s, i) => (
            <rect
              key={s.id}
              x={s.x}
              y={s.y}
              width={1}
              height={1}
              fill={i === 0 ? theme.snakeHead : theme.snakeBody}
            />
          ))}
        </svg>
      </div>
      <p className="font-mono text-[10px] text-cyber-white/30 text-right mt-1">
        MAP
      </p>
    </div>
  );
}
