import "./styles.css";

import React, { useState, useEffect, useMemo } from "react";

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Track mouse position
    const handleMove = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  // Use memoization to store position array
  const memoizedPositionArray = useMemo(() => {
    const positionArray = [];
    window.addEventListener("mousemove", event => {
      positionArray.push({ x: event.clientX, y: event.clientY });
    });
    return positionArray;
  }, []);

  // Render
  return (
    <div>
      <h1>Mouse Position</h1>
      <p>
        x: {position.x}, y: {position.y}
      </p>
      <p>
        Position Array: {JSON.stringify(memoizedPositionArray)}
      </p>
    </div>
  );
};

export default App;
