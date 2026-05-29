"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { useUIStore } from "@/store/uiStore";
import BackgroundGrid from "@/components/BackgroundGrid";
import BootSequence from "@/components/BootSequence";
import MainMenu from "@/components/MainMenu";
import GameScreen from "@/components/GameScreen";
import SettingsModal from "@/components/SettingsModal";
import Leaderboard from "@/components/Leaderboard";

export default function Home() {
  const { screen } = useGameStore();
  const { showSettings, showLeaderboard } = useUIStore();

  return (
    <main className="relative min-h-screen bg-cyber-black overflow-hidden">
      <BackgroundGrid />

      <AnimatePresence mode="wait">
        {screen === "boot" && (
          <motion.div
            key="boot"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
          >
            <BootSequence />
          </motion.div>
        )}

        {screen === "menu" && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <MainMenu />
          </motion.div>
        )}

        {(screen === "playing" || screen === "paused" || screen === "gameover") && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GameScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <SettingsModal />
      <Leaderboard />
    </main>
  );
}
