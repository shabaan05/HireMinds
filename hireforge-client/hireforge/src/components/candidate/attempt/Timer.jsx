import { useEffect, useState } from "react";

const Timer = ({ startedAt, duration, onTimeUp }) => {

  const calculateTimeLeft = () => {
    if (!startedAt || !duration) return 0;

    const endTime =
      new Date(startedAt).getTime() + duration * 60 * 1000;

    const now = Date.now();

    return Math.max(0, Math.floor((endTime - now) / 1000));
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);

      // 🔥 Auto submit when time ends
      if (time === 0 && onTimeUp) {
        onTimeUp();
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt, duration]); // ✅ important fix

  // ✅ Format time (MM:SS)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      ⏳ Time Left: <strong>{formatTime(timeLeft)}</strong>
    </div>
  );
};

export default Timer;