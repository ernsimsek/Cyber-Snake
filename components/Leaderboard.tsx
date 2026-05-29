"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Medal, Crown } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { useUIStore } from "@/store/uiStore";
import { useSound } from "@/hooks/useSound";
import { formatNumber } from "@/lib/utils";
import GlassCard from "./GlassCard";

export default function Leaderboard() {
  const { leaderboard } = useGameStore();
  const { showLeaderboard, setShowLeaderboard } = useUIStore();
  const sound = useSound();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="font-mono text-sm text-cyber-white/40 w-5 text-center">{rank}</span>;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-cyber-white/60";
  };

  return (
    <AnimatePresence>
      {showLeaderboard && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowLeaderboard(false)}
        >
          <motion.div
            className="glass-panel rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-cyber-cyan" />
                <h2 className="text-2xl font-black text-cyber-cyan text-glow">
                  LEADERBOARD
                </h2>
              </div>
              <button
                onClick={() => {
                  sound.click();
                  setShowLeaderboard(false);
                }}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-cyber-white/50" />
              </button>
            </div>

            {/* Entries */}
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={`${entry.name}-${entry.score}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlassCard
                    className="p-3"
                    hover={false}
                    glow={entry.rank <= 3}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 flex justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div className="flex-1">
                        <p className={`font-mono text-sm font-bold ${getRankColor(entry.rank)}`}>
                          {entry.name}
                        </p>
                        <p className="font-mono text-xs text-cyber-white/40">
                          Level {entry.level} • {entry.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-lg text-cyber-cyan font-bold">
                          {formatNumber(entry.score)}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {leaderboard.length === 0 && (
              <div className="text-center py-8">
                <p className="font-mono text-sm text-cyber-white/40">
                  No entries yet. Be the first!
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
