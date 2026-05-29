"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass-panel rounded-xl overflow-hidden",
        glow && "neon-border",
        className
      )}
      whileHover={
        hover
          ? {
              scale: 1.02,
              boxShadow: "0 0 30px rgba(0, 240, 255, 0.2)",
            }
          : undefined
      }
      whileTap={hover ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      <div className="holographic-shine absolute inset-0 rounded-xl pointer-events-none opacity-30" />
      {children}
    </motion.div>
  );
}
