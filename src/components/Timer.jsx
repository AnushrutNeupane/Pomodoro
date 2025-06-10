const Timer = ({ timeLeft, handleIncreaseTime, handleDecreaseTime }) => {
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className="timer-container">
      <button onClick={handleDecreaseTime}>-5 min</button>
      <h2>{formatTime()}</h2>
      <button onClick={handleIncreaseTime}>+5 min</button>
    </div>
  );
};

export default Timer;
