"use client";
import { useEffect, useRef, useCallback } from "react";

export function useSfx(volume = 0.35) {
  const ref = useRef<HTMLAudioElement | null>(null);

  // Create once after hydration
  useEffect(() => {
    ref.current = new Audio("/sounds/consume_pop.m4a");
    ref.current.volume = volume;
    // Touch the file early so Chrome doesn't block on first play
    ref.current.load();
  }, [volume]);

  // Return a stable callback you can call from anywhere
  return useCallback(() => {
    if (!ref.current) return;
    ref.current.currentTime = 0; // rewind for bursts
    ref.current.play().catch(() => {}); // user may have muted site
  }, []);
}
