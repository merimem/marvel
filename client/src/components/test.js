import React, { useState, useEffect, useRef } from "react";
import "./style.scss";

export default function App() {
  const [count, setCount] = useState(0);
  const isFirstRender = useRef(true);
  const mutationRef = useRef(count);
  const handleClick = () => {
    console.log("Count before update", count);
    setCount(count + 1);
  };
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      console.log("Count after update", count);
    }
  }, [count]);

  // Updating mutation ref
  useEffect(() => {
    mutationRef.current = count;
  }, [count]);

  useEffect(() => {
    // Assuming this is some listener which cannot be created on every re-render
    // Possibly a socket connection or a listner on video
    const timer = setInterval(() => {
      console.log("Actual state", count);
      console.log("mutationRef state", mutationRef.current);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  console.log("Count in render", count);
  return (
    <div className="container">
      <h1>Hello Functional Component!</h1>
      <p>Press button to see the magic :)</p>
      <button onClick={handleClick}>Increment</button>
      {!!count && (
        <div className="message">You pressed button {count} times</div>
      )}
    </div>
  );
}
