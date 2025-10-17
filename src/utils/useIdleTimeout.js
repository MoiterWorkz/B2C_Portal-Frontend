import { useEffect, useRef } from "react";

export default function useIdleTimeout(onTimeout, timeout = 20000, onWarning) {
  const timerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const warningTime = timeout / 2; // show warning halfway

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    clearTimeout(warningTimerRef.current);

    warningTimerRef.current = setTimeout(() => {
      if (onWarning) onWarning();
    }, warningTime);

    timerRef.current = setTimeout(() => {
      onTimeout();
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // start on mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timerRef.current);
      clearTimeout(warningTimerRef.current);
    };
  }, [onTimeout, timeout, onWarning]);
}
