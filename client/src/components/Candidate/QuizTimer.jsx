import React, { useState, useEffect } from 'react';
 
const QuizTimer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
 
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
 
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
 
    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);
 
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);
 
  const timerStyles = {
    fontSize: '1.2em',   // Adjust the font size as desired
    fontWeight: 'bold',  // Make the font bold
    color: '#808080',    // Set the font color to gray
    marginBottom: '10px' // Add some bottom margin for spacing
  };
 
  return (
    <div style={timerStyles}>
      Time left: {timeLeft}s
    </div>
  );
};
 
export default QuizTimer;