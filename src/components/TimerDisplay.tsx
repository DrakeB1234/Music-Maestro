import { useEffect, useState } from "react";

export default function TimerDisplay(
  duration: number,
  onTimeout?: () => void
) {
  const [timer, setTimer] = useState<number>(duration | 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timer <= 0 && onTimeout) {
    onTimeout();
  }

  return <p>{formatSeconds(timer)}</p>;
}

function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}