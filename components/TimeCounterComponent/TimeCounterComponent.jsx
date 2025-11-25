"use client";

import { useEffect, useState, useCallback } from "react";
import { FaClock } from "react-icons/fa";
import { formatCountdownTime } from "@/utils/dateFormatter";

/**
 * Time Counter Component - Countdown timer for contests
 *
 * @param {Object} props - Component props
 * @param {number} props.startUnix - Contest start time (Unix timestamp)
 * @param {number} props.endUnix - Contest end time (Unix timestamp)
 * @returns {JSX.Element} Countdown timer display
 *
 * @example
 * <TimeCounterComponent startUnix={1609459200} endUnix={1609545600} />
 */
function TimeCounterComponent({ startUnix, endUnix }) {
  const nowUnix = useCallback(() => Math.floor(Date.now() / 1000), []);
  const [currentTime, setCurrentTime] = useState(nowUnix());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(nowUnix());
    }, 1000);

    return () => clearInterval(interval);
  }, [nowUnix]);

  const getTimeLeft = useCallback(() => {
    if (currentTime < startUnix) {
      return {
        label: "Starts In",
        seconds: startUnix - currentTime,
        color: "text-blue-400",
      };
    } else if (currentTime < endUnix) {
      return {
        label: "Ends In",
        seconds: Math.max(0, endUnix - currentTime),
        color: "text-green-400",
      };
    } else {
      return {
        label: "Ended",
        seconds: 0,
        color: "text-red-400",
      };
    }
  }, [currentTime, startUnix, endUnix]);

  const { label, seconds, color } = getTimeLeft();

  return (
    <div
      className="h-32 border-4 border-zinc-800 flex flex-col items-center justify-center gap-y-1"
      role="timer"
      aria-label={`Contest ${label.toLowerCase()}: ${formatCountdownTime(
        seconds
      )}`}
    >
      <p className={`font-semibold text-2xl ${color}`}>{label}</p>
      <p className="font-mono text-2xl font-bold">
        {formatCountdownTime(seconds)}
      </p>
    </div>
  );
}

/**
 * Compact Timer Component - Inline countdown timer for problem pages
 *
 * @param {Object} props - Component props
 * @param {string} props.startTime - Contest start time (ISO string)
 * @param {number} props.durationSeconds - Contest duration in seconds
 * @returns {JSX.Element} Compact countdown timer display
 *
 * @example
 * <CompactTimer startTime="2025-11-25T05:00:00Z" durationSeconds={7200} />
 */
export function CompactTimer({ startTime, durationSeconds }) {
  const [timeInfo, setTimeInfo] = useState({
    label: "",
    seconds: 0,
    color: "",
  });

  const updateTimer = useCallback(() => {
    const now = Math.floor(Date.now() / 1000);
    const start = new Date(startTime).getTime() / 1000;
    const end = start + durationSeconds;

    if (now < start) {
      setTimeInfo({
        label: "Starts in",
        seconds: start - now,
        color: "text-blue-400",
      });
    } else if (now < end) {
      setTimeInfo({
        label: "Ends in",
        seconds: Math.max(0, end - now),
        color: "text-green-400",
      });
    } else {
      setTimeInfo({
        label: "Contest Ended",
        seconds: 0,
        color: "text-red-400",
      });
    }
  }, [startTime, durationSeconds]);

  useEffect(() => {
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [updateTimer]);

  return (
    <div className="bg-zinc-800/50 border-b border-zinc-700 px-4 py-2.5">
      <div className="flex items-center justify-center gap-3">
        <FaClock className={`${timeInfo.color} text-lg`} />
        <span className={`font-semibold ${timeInfo.color}`}>
          {timeInfo.label}
        </span>
        {timeInfo.seconds > 0 && (
          <>
            <span className="text-zinc-500">|</span>
            <span className="font-mono text-lg font-bold text-white">
              {formatCountdownTime(timeInfo.seconds)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default TimeCounterComponent;
