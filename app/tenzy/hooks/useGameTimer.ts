import { useState, useEffect, useCallback } from "react";

interface TimerOptions {
  duration: number; // initial time in seconds
  onExpire?: () => void; // callback when timer reaches zero
  autoStart?: boolean; // start immediately on mount?
}

export function useGameTimer({
  duration,
  onExpire,
  autoStart = true,
}: TimerOptions) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [running, setRunning] = useState(autoStart);

  // Tick every second when running
  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      onExpire?.();
      return;
    }
    const id = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running, timeLeft, onExpire]);

  const start = useCallback(() => {
    setTimeLeft(duration);
    setRunning(true);
  }, [duration]);

  const stop = useCallback(() => {
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(duration);
  }, [duration]);

  return { timeLeft, running, start, stop, reset };
}
