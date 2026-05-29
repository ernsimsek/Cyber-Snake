"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Music, Palette, Gauge, Eye } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { useUIStore } from "@/store/uiStore";
import { useSound } from "@/hooks/useSound";
import { GameSettings } from "@/types";
import NeonButton from "./NeonButton";
import GlassCard from "./GlassCard";

const DIFFICULTIES: { value: GameSettings["difficulty"]; label: string; color: string }[] = [
  { value: "easy", label: "EASY", color: "text-green-400" },
  { value: "normal", label: "NORMAL", color: "text-cyber-cyan" },
  { value: "hard", label: "HARD", color: "text-orange-400" },
  { value: "insane", label: "INSANE", color: "text-cyber-magenta" },
];

const THEMES: { value: GameSettings["theme"]; label: string; gradient: string }[] = [
  { value: "cyber", label: "CYBER", gradient: "from-cyber-cyan to-cyber-purple" },
  { value: "neon", label: "NEON", gradient: "from-green-400 to-red-500" },
  { value: "matrix", label: "MATRIX", gradient: "from-green-500 to-green-900" },
  { value: "void", label: "VOID", gradient: "from-orange-400 to-yellow-200" },
];

export default function SettingsModal() {
  const { settings, updateSettings } = useGameStore();
  const { showSettings, setShowSettings } = useUIStore();
  const sound = useSound();

  return (
    <AnimatePresence>
      {showSettings && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSettings(false)}
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
              <h2 className="text-2xl font-black text-cyber-cyan text-glow">
                SETTINGS
              </h2>
              <button
                onClick={() => {
                  sound.click();
                  setShowSettings(false);
                }}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-cyber-white/50" />
              </button>
            </div>

            {/* Audio */}
            <div className="mb-6">
              <h3 className="font-mono text-xs text-cyber-white/40 mb-3 tracking-widest flex items-center gap-2">
                <Volume2 className="w-3 h-3" />
                AUDIO
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyber-white/70">Sound Effects</span>
                  <button
                    onClick={() => {
                      sound.click();
                      updateSettings({ soundEnabled: !settings.soundEnabled });
                    }}
                    className={`p-2 rounded-lg border transition-colors ${
                      settings.soundEnabled
                        ? "border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan"
                        : "border-white/10 text-cyber-white/30"
                    }`}
                  >
                    {settings.soundEnabled ? (
                      <Volume2 className="w-4 h-4" />
                    ) : (
                      <VolumeX className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyber-white/70">Music</span>
                  <button
                    onClick={() => {
                      sound.click();
                      updateSettings({ musicEnabled: !settings.musicEnabled });
                    }}
                    className={`p-2 rounded-lg border transition-colors ${
                      settings.musicEnabled
                        ? "border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan"
                        : "border-white/10 text-cyber-white/30"
                    }`}
                  >
                    <Music className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Difficulty */}
            <div className="mb-6">
              <h3 className="font-mono text-xs text-cyber-white/40 mb-3 tracking-widest flex items-center gap-2">
                <Gauge className="w-3 h-3" />
                DIFFICULTY
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {DIFFICULTIES.map((diff) => (
                  <button
                    key={diff.value}
                    onClick={() => {
                      sound.click();
                      updateSettings({ difficulty: diff.value });
                    }}
                    className={`py-2 px-1 rounded-lg border font-mono text-xs transition-all ${
                      settings.difficulty === diff.value
                        ? `border-cyber-cyan/50 bg-cyber-cyan/10 ${diff.color}`
                        : "border-white/10 text-cyber-white/30 hover:border-white/20"
                    }`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="mb-6">
              <h3 className="font-mono text-xs text-cyber-white/40 mb-3 tracking-widest flex items-center gap-2">
                <Palette className="w-3 h-3" />
                THEME
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => {
                      sound.click();
                      updateSettings({ theme: theme.value });
                    }}
                    className={`py-3 px-1 rounded-lg border font-mono text-xs transition-all ${
                      settings.theme === theme.value
                        ? "border-white/30 bg-white/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`w-full h-2 rounded-full bg-gradient-to-r ${theme.gradient} mb-2`}
                    />
                    <span
                      className={
                        settings.theme === theme.value
                          ? "text-cyber-white"
                          : "text-cyber-white/40"
                      }
                    >
                      {theme.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="mb-6">
              <h3 className="font-mono text-xs text-cyber-white/40 mb-3 tracking-widest flex items-center gap-2">
                <Eye className="w-3 h-3" />
                VISUAL
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyber-white/70">Particles</span>
                  <button
                    onClick={() => {
                      sound.click();
                      updateSettings({ particlesEnabled: !settings.particlesEnabled });
                    }}
                    className={`px-3 py-1 rounded-lg border font-mono text-xs transition-all ${
                      settings.particlesEnabled
                        ? "border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan"
                        : "border-white/10 text-cyber-white/30"
                    }`}
                  >
                    {settings.particlesEnabled ? "ON" : "OFF"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyber-white/70">Glow Effects</span>
                  <button
                    onClick={() => {
                      sound.click();
                      updateSettings({ glowEnabled: !settings.glowEnabled });
                    }}
                    className={`px-3 py-1 rounded-lg border font-mono text-xs transition-all ${
                      settings.glowEnabled
                        ? "border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan"
                        : "border-white/10 text-cyber-white/30"
                    }`}
                  >
                    {settings.glowEnabled ? "ON" : "OFF"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyber-white/70">Minimap</span>
                  <button
                    onClick={() => {
                      sound.click();
                      updateSettings({ showMinimap: !settings.showMinimap });
                    }}
                    className={`px-3 py-1 rounded-lg border font-mono text-xs transition-all ${
                      settings.showMinimap
                        ? "border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan"
                        : "border-white/10 text-cyber-white/30"
                    }`}
                  >
                    {settings.showMinimap ? "ON" : "OFF"}
                  </button>
                </div>
              </div>
            </div>

            <NeonButton
              variant="primary"
              size="md"
              onClick={() => setShowSettings(false)}
              className="w-full"
            >
              Apply Changes
            </NeonButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
