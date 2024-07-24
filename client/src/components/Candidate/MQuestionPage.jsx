import React, { useState, useEffect } from 'react';
import QuizTimer from './QuizTimer';
 
const questions = [
  {
    question: 'Who is standing next to Ken?',
    options: ['Paul', 'Ian', 'Liam', 'Hal'],
    correct: 'Paul',
  },
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correct: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correct: 'Mars',
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correct: 'Pacific',
  },
  {
    question: 'What is the smallest prime number?',
    options: ['0', '1', '2', '3'],
    correct: '2',
  },
  {
    question: 'What is the speed of light?',
    options: ['299,792 km/s', '150,000 km/s', '1,080,000 km/s', '300,000 km/s'],
    correct: '299,792 km/s',
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
    correct: 'Harper Lee',
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Au', 'Ag', 'Pb', 'Fe'],
    correct: 'Au',
  },
  {
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correct: '7',
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correct: 'Jupiter',
  }
];
 
const QuestionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [quizDuration, setQuizDuration] = useState(60); // Set the duration for each module in seconds
  const [isModuleActive, setIsModuleActive] = useState(true);
 
  const currentQuestion = questions[currentQuestionIndex];
 
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
 
  const handleNext = () => {
    if (isModuleActive) {
      if (currentQuestionIndex < questions.length - 1) {
        if ((currentQuestionIndex + 1) % 5 === 0) {
          setIsModuleActive(false);
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption('');
        }
      } else {
        alert('You have completed all the questions!');
      }
    }
  };
 
  const handleTimeUp = () => {
    alert('Time is up! Moving to the next module.');
    if ((currentQuestionIndex + 1) % 5 === 0) {
      setIsModuleActive(false);
    } else {
      handleNext();
    }
  };
 
  const handleRestartModule = () => {
    setIsModuleActive(true);
    setQuizDuration(60); // Reset the timer for the next module
    if ((currentQuestionIndex + 1) % 5 === 0) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    }
  };
 
  useEffect(() => {
    if (isModuleActive) {
      setQuizDuration(60);
    }
  }, [isModuleActive]);
 
  return (
    <div className="flex flex-col items-center p-8">
      {isModuleActive && <QuizTimer duration={quizDuration} onTimeUp={handleTimeUp} />}
      <div className="flex w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg">
        <div className="flex-1 pr-6">
          <h1 className="text-2xl font-bold mb-4">{currentQuestion.question}</h1>
        </div>
        <div className="flex-1 pl-6 border-l border-gray-200">
          <div className="flex flex-col space-y-2">
            {currentQuestion.options.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  className="mr-2"
                  disabled={!isModuleActive}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex mt-6 space-x-4">
        <button
          className={`px-6 py-2 text-white font-semibold rounded ${isModuleActive ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gray-300 cursor-not-allowed'}`}
          onClick={handleNext}
          disabled={!isModuleActive}
        >
          Next
        </button>
        {!isModuleActive && (
          <button
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            onClick={handleRestartModule}
          >
            Next Module
          </button>
        )}
      </div>
    </div>
  );
};
 
export default QuestionPage;