"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { useGameStore } from "@/store/gameStore";
import { playBootSound } from "@/lib/soundGenerator";

const BOOT_LOGS = [
  { text: "Initializing neural core...", delay: 200, type: "info" },
  { text: "Loading quantum protocols...", delay: 400, type: "info" },
  { text: "Establishing secure connection...", delay: 600, type: "success" },
  { text: "Downloading game assets...", delay: 800, type: "info" },
  { text: "Calibrating render engine...", delay: 1000, type: "info" },
  { text: "Optimizing particle systems...", delay: 1200, type: "success" },
  { text: "Synchronizing audio channels...", delay: 1400, type: "info" },
  { text: "Verifying integrity checksums...", delay: 1600, type: "success" },
  { text: "Mounting virtual filesystem...", delay: 1800, type: "info" },
  { text: "Activating holographic display...", delay: 2000, type: "success" },
  { text: "System ready.", delay: 2400, type: "success" },
];

export default function BootSequence() {
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [showLogo, setShowLogo] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const { setScreen, settings } = useGameStore();
  const { addBootLog, setBootComplete: setUIBootComplete } = useUIStore();

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    BOOT_LOGS.forEach((log, index) => {
      const timeout = setTimeout(() => {
        setVisibleLogs((prev) => prev + 1);
        addBootLog(log.text);
        if (settings.soundEnabled && index % 2 === 0) {
          playBootSound();
        }
      }, log.delay);
      timeouts.push(timeout);
    });

    const logoTimeout = setTimeout(() => setShowLogo(true), 2800);
    timeouts.push(logoTimeout);

    const completeTimeout = setTimeout(() => {
      setBootComplete(true);
      setUIBootComplete(true);
    }, 4000);
    timeouts.push(completeTimeout);

    const menuTimeout = setTimeout(() => {
      setScreen("menu");
    }, 5000);
    timeouts.push(menuTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [setScreen, addBootLog, setUIBootComplete, settings.soundEnabled]);

  return (
    <div className="fixed inset-0 bg-cyber-black flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated gradient orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-lg px-8">
        {/* Terminal logs */}
        <div className="mb-8 h-48 overflow-hidden">
          <AnimatePresence>
            {BOOT_LOGS.slice(0, visibleLogs).map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs mb-1 flex items-center gap-2"
              >
                <span className="text-cyber-cyan/50">
                  [{String(index + 1).padStart(2, "0")}]
                </span>
                <span
                  className={
                    log.type === "success"
                      ? "text-green-400"
                      : log.type === "error"
                      ? "text-red-400"
                      : "text-cyber-white/70"
                  }
                >
                  {log.text}
                </span>
                {log.type === "success" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-400"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {visibleLogs < BOOT_LOGS.length && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="font-mono text-xs text-cyber-cyan/50"
            >
              _
            </motion.div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-0.5 bg-cyber-gray rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta"
              initial={{ width: "0%" }}
              animate={{ width: `${(visibleLogs / BOOT_LOGS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2 font-mono text-xs text-cyber-white/40">
            <span>SYSTEM_INIT</span>
            <span>{Math.round((visibleLogs / BOOT_LOGS.length) * 100)}%</span>
          </div>
        </div>

        {/* Logo reveal */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-glow">
                <span className="text-cyber-cyan">CYBER</span>
                <span className="text-cyber-magenta">SNAKE</span>
              </h1>
              <p className="font-mono text-xs text-cyber-white/50 mt-2 tracking-widest">
                NEURAL ARCADE SYSTEM v2.0.77
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boot complete indicator */}
        <AnimatePresence>
          {bootComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6"
            >
              <span className="font-mono text-xs text-green-400 animate-pulse">
                PRESS ANY KEY TO CONTINUE...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
