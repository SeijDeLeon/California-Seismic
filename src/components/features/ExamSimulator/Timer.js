import React, { useState, useEffect} from 'react';

function Timer({secondsCount}) {
  const [seconds, setSeconds] = useState(9000);


  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
      secondsCount.current += 1;
      // console.log('secondsCount from timer: ', secondsCount.current)
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
      <span>{formatTime(minutes)} mins : {formatTime(remainingSeconds)} secs</span>
    </div>
  );
}

export default Timer;