import React from "react";
import { useNavigate } from "react-router-dom";
function Instructions() {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/assessment");
  };
  return (
    <>
      <div>Instructions</div>
      
      <div className="p-8 font-sans">
        <h1 className="text-3xl font-bold mb-6">A Plus Assessment</h1>
        <p className="mb-4">
          Welcome to the A Plus Assessment. This assessment is divided into
          three sections:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>Aptitude:</strong> This section contains 5 questions
            designed to evaluate your problem-solving and analytical skills.
          </li>
          <li className="mb-2">
            <strong>Java:</strong> This section contains 5 questions to assess
            your knowledge and understanding of Java programming.
          </li>
          <li className="mb-2">
            <strong>Communication:</strong> This section contains 5 questions to
            evaluate your communication skills.
          </li>
        </ul>
        <p>
          Please ensure you have a stable internet connection before starting
          the assessment. You will need to complete all sections within the
          given time. Good luck!
        </p>
      </div>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleButton}>
        Start
        </button>
    </>
  );
}

export default Instructions;
