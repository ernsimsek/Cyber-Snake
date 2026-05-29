"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSound } from "@/hooks/useSound";

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function NeonButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled,
  icon,
}: NeonButtonProps) {
  const sound = useSound();

  const variants = {
    primary: "bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 hover:border-cyber-cyan/50",
    secondary: "bg-cyber-purple/10 border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/20 hover:border-cyber-purple/50",
    danger: "bg-cyber-magenta/10 border-cyber-magenta/30 text-cyber-magenta hover:bg-cyber-magenta/20 hover:border-cyber-magenta/50",
    ghost: "bg-transparent border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <motion.button
      className={cn(
        "relative font-mono font-medium tracking-wider uppercase border rounded-lg transition-colors overflow-hidden",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      onClick={() => {
        if (!disabled) {
          sound.click();
          onClick?.();
        }
      }}
      onMouseEnter={() => !disabled && sound.hover()}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon}
        {children}
      </span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}
