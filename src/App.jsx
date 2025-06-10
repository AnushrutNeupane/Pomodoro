import { useState, useEffect } from "react";
import Timer from "./components/timer";
import ContinueSession from "./components/ContinueSession";
import TimerControls from "./components/timercontrols";
import TodoList from "./components/TodoList";

const App = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalWorkSessions, setTotalWorkSessions] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [nextState, setNextState] = useState(false);
  const [isWorking, setIsWorking] = useState(true);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timeLeft === 0 && isRunning) {
      if (isWorking) setTotalWorkSessions((prev) => prev + 1);
      setNextState(true);
      setRunning(false);
    }
  }, [isRunning, timeLeft]);

  const handleWorking = () => {
    setIsWorking(true);
    setTimeLeft(25 * 60);
    console.log(totalWorkSessions);
  };

  const handleBreak = () => {
    const breakDuration = totalWorkSessions % 4 === 0 ? 30 * 60 : 5 * 60;
    setIsWorking(false);
    setTimeLeft(breakDuration);
  };

  const handleDecreaseTime = () => {
    setTimeLeft((timeLeft) => Math.max(timeLeft - 300, 0));
  };

  const handleIncreaseTime = () => {
    setTimeLeft((timeLeft) => Math.max(timeLeft + 300, 0));
  };

  return (
    <div className="wrapper">
      <h1>Pomodoro Timer</h1>
      <p>Set a time and click start!</p>
      {totalWorkSessions > 0 && (
        <p>You have completed {totalWorkSessions} work sessions!</p>
      )}
      <Timer
        timeLeft={timeLeft}
        handleDecreaseTime={handleDecreaseTime}
        handleIncreaseTime={handleIncreaseTime}
      />
      <TimerControls
        setRunning={setRunning}
        isRunning={isRunning}
        timeLeft={timeLeft}
        handleBreak={handleBreak}
        handleWorking={handleWorking}
        nextState={nextState}
        totalWorkSessions={totalWorkSessions}
      />
      <ContinueSession
        isWorking={isWorking}
        setIsWorking={setIsWorking}
        nextState={nextState}
        setNextState={setNextState}
        setTimeLeft={setTimeLeft}
        setRunning={setRunning}
        totalWorkSessions={totalWorkSessions}
      />
      <TodoList />
      <div className="footer">
        <a
          href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
          target="_blank"
        >
          What is pomodoro?
        </a>
      </div>
    </div>
  );
};

export default App;
