import { useEffect, useRef } from "react";

const ContinueSession = ({
  isWorking,
  setIsWorking,
  nextState,
  setNextState,
  setTimeLeft,
  setRunning,
  totalWorkSessions,
}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setNextState(false);
      }
    };
    if (nextState) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.addEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div>
      {nextState && (
        <div ref={modalRef}>
          <p>
            {isWorking
              ? totalWorkSessions % 4 === 0
                ? "You've completed 4 work sessions! Time for a 30-minute break!"
                : "Work session over! Congrats!"
              : "Break session over :/"}
          </p>

          <button
            onClick={() => {
              const breakDuration =
                isWorking && totalWorkSessions % 4 === 0 ? 30 * 60 : 5 * 60;
              setTimeLeft(isWorking ? breakDuration : 25 * 60);
              setRunning(true);
              setIsWorking((prev) => !prev);
              setNextState(false);
            }}
          >
            {isWorking ? "Start break session." : "Start work session."}
          </button>
          <button onClick={() => setNextState(false)}>No, dismiss</button>
        </div>
      )}
    </div>
  );
};

export default ContinueSession;
