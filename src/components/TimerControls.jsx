const TimerControls = ({
  setRunning,
  isRunning,
  timeLeft,
  handleWorking,
  handleBreak,
  totalWorkSessions,
  nextState,
}) => {
  return (
    <div className="wrapper">
      <button
        onClick={() => setRunning((prev) => !prev)}
        disabled={timeLeft === 0}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={handleWorking}>Set 25-Min Work Session</button>
      <button onClick={handleBreak}>Set 5-Min Break Session</button>
      {nextState && totalWorkSessions > 0 && (
        <p>You have completed {totalWorkSessions} work sessions so far! 🎉 </p>
      )}
    </div>
  );
};
export default TimerControls;
