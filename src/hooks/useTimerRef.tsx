import { useEffect, useRef, useState } from "react";

/**
 * A timer that uses refs so that the parent component
 * does NOT re-render every second.
 *
 * @param active Whether the timer should be running
 * @param startTime The starting time in seconds
 * @param onTimeout Optional callback when timer ends
 * @returns The current time left (for display only)
 */
export default function useTimerRef(
  active: boolean,
  startTime: number,
  onTimeout?: () => void
) {
  const timeLeftRef = useRef(startTime);
  const [displayTime, setDisplayTime] = useState(startTime);

  useEffect(() => {
    if (!active) return;

    timeLeftRef.current = startTime; // reset when restarted
    setDisplayTime(startTime);

    const interval = setInterval(() => {
      if (timeLeftRef.current <= 0) {
        clearInterval(interval);
        onTimeout?.();
        return;
      }

      timeLeftRef.current -= 1;

      // Only update display (and cause re-render) once per second
      setDisplayTime(timeLeftRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, [active, startTime]);

  return displayTime;
}
