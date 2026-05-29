"use client";

import { motion } from "framer-motion";
import { Play, RotateCcw, Settings, Home } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { useUIStore } from "@/store/uiStore";
import { useSound } from "@/hooks/useSound";
import NeonButton from "./NeonButton";

export default function PauseOverlay() {
  const { setScreen, initGame, stats } = useGameStore();
  const { setShowSettings } = useUIStore();
  const sound = useSound();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-panel rounded-2xl p-8 w-full max-w-md mx-4"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <h2 className="text-3xl font-black text-center text-glow mb-2">
          <span className="text-cyber-cyan">PAUSED</span>
        </h2>
        <p className="text-center font-mono text-xs text-cyber-white/40 mb-8 tracking-widest">
          SYSTEM SUSPENDED
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <NeonButton
            variant="primary"
            size="md"
            onClick={() => {
              sound.click();
              setScreen("playing");
            }}
            icon={<Play className="w-4 h-4" />}
          >
            Resume
          </NeonButton>
          <NeonButton
            variant="secondary"
            size="md"
            onClick={() => {
              sound.click();
              initGame();
            }}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Restart
          </NeonButton>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NeonButton
            variant="ghost"
            size="sm"
            onClick={() => {
              sound.click();
              setShowSettings(true);
            }}
            icon={<Settings className="w-4 h-4" />}
          >
            Settings
          </NeonButton>
          <NeonButton
            variant="ghost"
            size="sm"
            onClick={() => {
              sound.click();
              setScreen("menu");
            }}
            icon={<Home className="w-4 h-4" />}
          >
            Menu
          </NeonButton>
        </div>

        {/* Current stats */}
        <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-mono text-xs text-cyber-white/40">SCORE</p>
            <p className="font-mono text-lg text-cyber-cyan font-bold">{stats.score}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-cyber-white/40">LEVEL</p>
            <p className="font-mono text-lg text-cyber-purple font-bold">{stats.level}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-cyber-white/40">FOOD</p>
            <p className="font-mono text-lg text-cyber-magenta font-bold">{stats.foodEaten}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
