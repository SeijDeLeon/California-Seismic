import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  let timerId;
  const startTimer = () => {
    timerId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };
  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
    }
  }, [seconds]);

  return (
    <div className="border-2 shadow-xl rounded-full w-40">
      <p>
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </p>
      <button onClick={startTimer}>start timer</button>
    </div>
  );
};

export default Timer;
