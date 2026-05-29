"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { Direction } from "@/types";

export function useSwipeControls(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const { setDirection, screen } = useGameStore();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (screen !== "playing") return;
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (screen !== "playing" || !touchStart.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      const minSwipe = 30;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipe) {
        setDirection(dx > 0 ? "RIGHT" : "LEFT");
      } else if (Math.abs(dy) > minSwipe) {
        setDirection(dy > 0 ? "DOWN" : "UP");
      }
      touchStart.current = null;
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [canvasRef, setDirection, screen]);
}
