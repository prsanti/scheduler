import { React, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    // [FIRST, SECOND, THIRD]
    // replace = false --> [FIRST, SECOND, THIRD]
    // replace == true [FIRST, SECOND, THIRD] --> [FIRST, THIRD]
    // Remove SECOND, set mode to THIRD
    // slice?
    if (replace) {
      setHistory([...history.slice(0, history.length - 1), newMode]);
      setMode(newMode);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  };
  console.log("new history: :", history)

  function back() {
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
}