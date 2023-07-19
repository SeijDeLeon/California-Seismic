import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div>
      <span>{formatTime(minutes)}:{formatTime(remainingSeconds)}</span>
    </div>
  );
}

export default Timer;