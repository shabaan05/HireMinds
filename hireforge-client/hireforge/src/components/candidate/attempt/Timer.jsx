import { useEffect, useState } from "react";

const Timer = ({ startedAt, duration }) => {
  const calculateTimeLeft = () => {
    const endTime =
      new Date(startedAt).getTime() + duration * 60 * 1000;

    const now = Date.now();

    return Math.max(0, Math.floor((endTime - now) / 1000));
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Time Left: {timeLeft}s</div>;
};

export default Timer;