import { React, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode) {
    setMode(newMode);
    setHistory([...history, newMode]);
  };

  // [FIRST, SECOND, THIRD]
  // slice [FIRST, SECOND, THIRD]   --> [FIRST, SECOND]
  // setMode [FIRST, SECOND, THIRD] --> [SECOND]
  function back() {
    setHistory(history.slice(0, history.length - 1));
    setMode(history[history.length - 2]);
  };

  return { mode, transition, back };
}