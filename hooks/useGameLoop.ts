"use client";

import { useEffect, useRef, useCallback } from "react";

export function useGameLoop(callback: (dt: number) => void, running: boolean) {
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const dt = time - previousTimeRef.current;
      callbackRef.current(dt);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (running) {
      previousTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [running, animate]);
}
