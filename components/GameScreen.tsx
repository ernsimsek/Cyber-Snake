"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { useUIStore } from "@/store/uiStore";
import { useGameEngine } from "@/game/engine";
import { useKeyboardControls } from "@/hooks/useKeyboardControls";
import { useSwipeControls } from "@/hooks/useSwipeControls";
import { useSound } from "@/hooks/useSound";
import { GRID_WIDTH, GRID_HEIGHT } from "@/game/constants";
import HUD from "./HUD";
import MiniMap from "./MiniMap";
import PauseOverlay from "./PauseOverlay";
import GameOver from "./GameOver";

const GRID_ASPECT = GRID_WIDTH / GRID_HEIGHT;

export default function GameScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { screen, snake, food, stats, settings } = useGameStore();
  const { showSettings, showLeaderboard } = useUIStore();
  const sound = useSound();

  useGameEngine(canvasRef);
  useKeyboardControls();
  useSwipeControls(canvasRef);

  return (
    <div className="fixed inset-0 flex flex-col z-30">
      {/* HUD */}
      <HUD />

      {/* Game canvas — sized to fill viewport while keeping grid aspect ratio */}
      <div className="flex-1 flex items-center justify-center min-h-0 p-2 md:p-4">
        <motion.div
          className="relative w-full"
          style={{
            width: `min(96vw, 1100px, calc((100dvh - 10rem) * ${GRID_ASPECT}))`,
            aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}`,
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Canvas border glow */}
          <div
            className="absolute -inset-1 rounded-lg opacity-50"
            style={{
              background: `linear-gradient(135deg, ${settings.theme === "cyber" ? "rgba(0,240,255,0.3)" : settings.theme === "neon" ? "rgba(57,255,20,0.3)" : settings.theme === "matrix" ? "rgba(0,255,65,0.3)" : "rgba(255,107,53,0.3)"}, transparent)`,
              filter: "blur(8px)",
            }}
          />

          <canvas
            ref={canvasRef}
            className="relative block w-full h-full rounded-lg border border-white/10"
            style={{ imageRendering: "auto" }}
          />

          {/* Screen effects */}
          {stats.combo >= 5 && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              animate={{
                boxShadow: [
                  "inset 0 0 20px rgba(0, 240, 255, 0.1)",
                  "inset 0 0 40px rgba(0, 240, 255, 0.2)",
                  "inset 0 0 20px rgba(0, 240, 255, 0.1)",
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>

      <MiniMap />

      {/* Mobile controls hint */}
      <div className="md:hidden text-center pb-4">
        <p className="font-mono text-xs text-cyber-white/30">
          Swipe to change direction
        </p>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {screen === "paused" && <PauseOverlay />}
        {screen === "gameover" && <GameOver />}
      </AnimatePresence>
    </div>
  );
}
