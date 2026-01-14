import { useState, useEffect, useCallback } from "react";

const WORK_TIME = 25 * 60;

function App() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);

  const bunniesVisible = WORK_TIME - timeLeft;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = useCallback(() => {
    setTimeLeft(WORK_TIME);
    setIsRunning(false);
  }, []);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(24px,1fr))] gap-1 p-4 pb-32">
        {Array.from({ length: WORK_TIME }).map((_, i) => (
          <span
            key={i}
            className={`text-base text-center transition-all duration-200 ${
              i < bunniesVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            🐰
          </span>
        ))}
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white px-6 py-3 rounded-full shadow-lg">
        <div className="text-2xl font-bold tabular-nums text-bunny-navy min-w-20 text-center">
          {formatTime(timeLeft)}
        </div>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 text-sm font-medium rounded-full bg-bunny-coral text-white hover:bg-bunny-coral-dark transition-all"
            onClick={toggleTimer}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            className="px-4 py-2 text-sm font-medium rounded-full bg-slate-100 text-bunny-navy hover:bg-slate-200 transition-all"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
