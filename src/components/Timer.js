import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const totalSeconds = useRef(0)
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          totalSeconds.current.valueOf = totalSeconds.current.valueOf+prevSeconds;
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              } else {
                return prevMinutes + 1;
              }
            });
            return 0;
          } else {
            return prevSeconds + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  console.log(totalSeconds);

  return (
    <div>
      <h1>
        {hours} : {minutes} : {seconds}
      </h1>
      {isActive ? (
        <Button onClick={handleStop}>Stop</Button>
      ) : (
        <Button onClick={handleStart}>Start</Button>
      )}
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
}

export default Timer;
