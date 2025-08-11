import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/24/solid";

const Timer = (props, ref) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const seconds = secondsElapsed % 60;
  const minutes = Math.floor(secondsElapsed / 60);
  const colorRef = useRef();

  useEffect(() => {
    if (secondsElapsed === 165) { // 2 minutes 45 seconds
      colorRef.current.classList.add("text-red-700");
    }
  }, [secondsElapsed]);

  const startTimer = () => {
    setTimerStarted(true);
    setTimerId(
      setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000)
    );
  };
  const resetTimer = () => {
    colorRef.current.classList.remove("text-red-700");
    setSecondsElapsed(0);
  }
  const stopTimer = () => {
    clearInterval(timerId);
    setTimerStarted(false);
    resetTimer();
  };

  // expose resetTimer() to parent without lifting the states up
  // better to have timer related logic to stay here as a separate file
  useImperativeHandle(ref, () => ({ resetTimer }), [])

  return (
    <div
      ref={colorRef}
      className="flex gap-2"
    >
      {timerStarted ? (
        <button onClick={stopTimer}>
          <StopIcon className="h-4 w-4" />
        </button>
      ) : (
        <button onClick={startTimer}>
          <PlayIcon className="h-4 w-4" />
        </button>
      )}
      <p className="font-bold text-base tracking-wider">
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </p>
    </div>
  );
};

export default forwardRef(Timer);