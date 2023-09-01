import React, { useEffect, useState, useRef } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/24/solid";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const colorRef = useRef();
  const startTimer = () => {
    setTimerStarted(true);
    setTimerId(
      setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timerId);
    colorRef.current.classList.remove("bg-red-400");
    setTimerStarted(false);
    setSeconds(0);
    setMinutes(0);
  };
  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
    }
    if (minutes === 2 && seconds === 45) {
      colorRef.current.classList.add("bg-red-400");
    }
  }, [seconds]);

  return (
    <div
      ref={colorRef}
      className="border-2 shadow-xl rounded-full w-40 font-bold"
    >
      <p className="font-extrabold text-2xl">
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </p>

      {timerStarted ? (
        <button onClick={stopTimer}>
          <StopIcon className="h-5 w-5" />
        </button>
      ) : (
        <button onClick={startTimer}>
          <PlayIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Timer;
