"use client";

import { motion } from "framer-motion";
import { Play, Trophy, Settings, HelpCircle, Zap } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { useUIStore } from "@/store/uiStore";
import { useSound } from "@/hooks/useSound";
import NeonButton from "./NeonButton";
import GlassCard from "./GlassCard";

export default function MainMenu() {
  const { setScreen, initGame, stats, settings } = useGameStore();
  const { setShowSettings, setShowLeaderboard } = useUIStore();
  const sound = useSound();

  const handlePlay = () => {
    sound.start();
    initGame();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-40 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
          <span className="text-cyber-cyan text-glow">CYBER</span>
          <span className="text-cyber-magenta text-glow-purple">SNAKE</span>
        </h1>
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyber-cyan/50" />
          <p className="font-mono text-xs text-cyber-white/50 tracking-[0.3em]">
            NEURAL ARCADE SYSTEM
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyber-magenta/50" />
        </div>
      </motion.div>

      {/* Menu buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <NeonButton
          variant="primary"
          size="lg"
          onClick={handlePlay}
          icon={<Zap className="w-5 h-5" />}
          className="w-full"
        >
          Initialize Game
        </NeonButton>

        <div className="grid grid-cols-2 gap-3">
          <NeonButton
            variant="secondary"
            size="md"
            onClick={() => {
              sound.click();
              setShowLeaderboard(true);
            }}
            icon={<Trophy className="w-4 h-4" />}
          >
            Leaderboard
          </NeonButton>
          <NeonButton
            variant="ghost"
            size="md"
            onClick={() => {
              sound.click();
              setShowSettings(true);
            }}
            icon={<Settings className="w-4 h-4" />}
          >
            Settings
          </NeonButton>
        </div>
      </motion.div>

      {/* Stats card */}
      <motion.div variants={itemVariants} className="mt-8 w-full max-w-sm">
        <GlassCard className="p-4" glow={false}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-mono text-xs text-cyber-white/40 mb-1">HIGH SCORE</p>
              <p className="font-mono text-lg text-cyber-cyan font-bold">
                {stats.highScore.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-cyber-white/40 mb-1">GAMES</p>
              <p className="font-mono text-lg text-cyber-purple font-bold">
                {stats.foodEaten > 0 ? "ACTIVE" : "0"}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-cyber-white/40 mb-1">LEVEL</p>
              <p className="font-mono text-lg text-cyber-magenta font-bold">
                {stats.level}
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Controls hint */}
      <motion.div
        variants={itemVariants}
        className="mt-8 text-center"
      >
        <p className="font-mono text-xs text-cyber-white/30">
          ARROWS / WASD to move • SPACE to pause
        </p>
      </motion.div>
    </motion.div>
  );
}
