// src/App.jsx
import React, { useState, useEffect } from "react";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerType, setTimerType] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      switchTimer();
    }
  }, [isRunning, timeLeft]);


  const switchTimer = () => {
    if (timerType === "Session") {
      setTimerType("Break");
      setTimeLeft(breakLength * 60);
    } else {
      setTimerType("Session");
      setTimeLeft(sessionLength * 60);
    }
  };


  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };


  const handleReset = () => {
    setIsRunning(false);
    setTimerType("Session");
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="pomodoro">
      <h1>Pomodoro Clock</h1>

      <div className="timer-settings">
        <div className="break">
          <h2>Break Length</h2>
          <button onClick={() => setBreakLength(breakLength > 1 ? breakLength - 1 : 1)}>-</button>
          <span>{breakLength}</span>
          <button onClick={() => setBreakLength(breakLength < 60 ? breakLength + 1 : 60)}>+</button>
        </div>

        <div className="session">
          <h2>Session Length</h2>
          <button onClick={() => setSessionLength(sessionLength > 1 ? sessionLength - 1 : 1)}>-</button>
          <span>{sessionLength}</span>
          <button onClick={() => setSessionLength(sessionLength < 60 ? sessionLength + 1 : 60)}>+</button>
        </div>
      </div>

      <div className="timer">
        <h2>{timerType}</h2>
        <span>{formatTime(timeLeft)}</span>
      </div>

      <div className="controls">
        <button onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
