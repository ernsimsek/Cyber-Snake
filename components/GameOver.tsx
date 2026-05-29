"use client";

import { motion } from "framer-motion";
import { RotateCcw, Home, Trophy, Skull } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { useUIStore } from "@/store/uiStore";
import { useSound } from "@/hooks/useSound";
import { formatTime, formatNumber } from "@/lib/utils";
import NeonButton from "./NeonButton";
import GlassCard from "./GlassCard";

export default function GameOver() {
  const { setScreen, initGame, stats } = useGameStore();
  const { setShowLeaderboard } = useUIStore();
  const sound = useSound();

  const isHighScore = stats.score >= stats.highScore && stats.score > 0;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-lg mx-4"
        initial={{ scale: 0.8, y: 50, filter: "blur(10px)" }}
        animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ scale: 0.8, y: 50, filter: "blur(10px)" }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {/* Game over header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <Skull className="w-16 h-16 text-cyber-magenta mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-cyber-magenta text-glow-purple">SYSTEM</span>
            <span className="text-cyber-white/80"> FAILURE</span>
          </h2>
          <p className="font-mono text-xs text-cyber-white/40 mt-2 tracking-widest">
            NEURAL LINK TERMINATED
          </p>
        </div>

        {/* Stats */}
        <GlassCard className="p-6 mb-6" glow>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="font-mono text-xs text-cyber-white/40 mb-1">FINAL SCORE</p>
              <motion.p
                className="font-mono text-2xl text-cyber-cyan font-bold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {formatNumber(stats.score)}
              </motion.p>
            </div>
            <div className="text-center">
              <p className="font-mono text-xs text-cyber-white/40 mb-1">HIGH SCORE</p>
              <p className="font-mono text-xl text-cyber-purple font-bold">
                {formatNumber(stats.highScore)}
              </p>
            </div>
            <div className="text-center">
              <p className="font-mono text-xs text-cyber-white/40 mb-1">MAX COMBO</p>
              <p className="font-mono text-xl text-orange-400 font-bold">
                x{stats.maxCombo}
              </p>
            </div>
            <div className="text-center">
              <p className="font-mono text-xs text-cyber-white/40 mb-1">TIME</p>
              <p className="font-mono text-xl text-cyber-white/70 font-bold">
                {formatTime(stats.timeAlive)}
              </p>
            </div>
          </div>

          {isHighScore && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full">
                <Trophy className="w-4 h-4 text-cyber-cyan" />
                <span className="font-mono text-sm text-cyber-cyan font-bold">
                  NEW HIGH SCORE!
                </span>
              </span>
            </motion.div>
          )}
        </GlassCard>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <NeonButton
            variant="primary"
            size="lg"
            onClick={() => {
              sound.start();
              initGame();
            }}
            icon={<RotateCcw className="w-5 h-5" />}
          >
            Reboot System
          </NeonButton>
          <NeonButton
            variant="ghost"
            size="lg"
            onClick={() => {
              sound.click();
              setScreen("menu");
            }}
            icon={<Home className="w-5 h-5" />}
          >
            Main Menu
          </NeonButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
