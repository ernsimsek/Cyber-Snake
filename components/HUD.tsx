"use client";

import { motion } from "framer-motion";
import { Zap, Flame, TrendingUp, Clock, Crosshair } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { formatTime, formatNumber } from "@/lib/utils";

export default function HUD() {
  const { stats, screen, settings } = useGameStore();

  if (screen !== "playing" && screen !== "paused") return null;

  return (
    <motion.div
      className="px-4 py-3 md:px-8 md:py-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="glass-panel rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Score */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyber-cyan" />
            <div>
              <p className="font-mono text-xs text-cyber-white/40">SCORE</p>
              <motion.p
                className="font-mono text-xl text-cyber-cyan font-bold"
                key={stats.score}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {formatNumber(stats.score)}
              </motion.p>
            </div>
          </div>

          {/* Combo */}
          {stats.combo > 0 && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <div>
                <p className="font-mono text-xs text-cyber-white/40">COMBO</p>
                <p className="font-mono text-lg text-orange-400 font-bold">
                  x{stats.combo}
                </p>
              </div>
            </motion.div>
          )}

          {/* Multiplier */}
          {stats.multiplier > 1 && (
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyber-magenta" />
              <div>
                <p className="font-mono text-xs text-cyber-white/40">MULT</p>
                <p className="font-mono text-lg text-cyber-magenta font-bold">
                  {stats.multiplier.toFixed(1)}x
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right side stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-cyber-purple" />
            <div className="text-right">
              <p className="font-mono text-xs text-cyber-white/40">LEVEL</p>
              <p className="font-mono text-sm text-cyber-purple font-bold">
                {stats.level}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyber-white/40" />
            <div className="text-right">
              <p className="font-mono text-xs text-cyber-white/40">TIME</p>
              <p className="font-mono text-sm text-cyber-white/70">
                {formatTime(stats.timeAlive)}
              </p>
            </div>
          </div>

          {/* Energy bar */}
          <div className="hidden md:block w-24">
            <p className="font-mono text-xs text-cyber-white/40 mb-1">ENERGY</p>
            <div className="h-1.5 bg-cyber-gray rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${settings.theme === "cyber" ? "#00f0ff" : settings.theme === "neon" ? "#39ff14" : settings.theme === "matrix" ? "#00ff41" : "#ff6b35"}, ${settings.theme === "cyber" ? "#b829dd" : settings.theme === "neon" ? "#ff073a" : settings.theme === "matrix" ? "#008f11" : "#f7c59f"})`,
                }}
                animate={{
                  width: `${Math.min((stats.foodEaten % 5) / 5 * 100 + 10, 100)}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
