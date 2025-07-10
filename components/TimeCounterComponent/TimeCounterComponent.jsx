"use client";

import { useEffect, useState } from "react";

function TimeCounterComponent({ startUnix, endUnix }) {
  const nowUnix = () => Math.floor(Date.now() / 1000);
  const [currentTime, setCurrentTime] = useState(nowUnix());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(nowUnix());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeLeft = () => {
    if (currentTime < startUnix) {
      return {
        label: "Starts In",
        seconds: startUnix - currentTime,
      };
    } else {
      return {
        label: "Ends In",
        seconds: Math.max(0, endUnix - currentTime),
      };
    }
  };

  const { label, seconds } = getTimeLeft();

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="h-32 border-4 border-zinc-800 flex flex-col items-center justify-center gap-y-1">
      <p className="font-semibold text-2xl">{label}</p>
      <p className="font-semibold text-2xl">{formatTime(seconds)}</p>
    </div>
  );
}

export default TimeCounterComponent;
