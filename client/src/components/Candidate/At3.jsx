import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizTimer from './QuizTimer';
import './QuestionPage.css';

const QuestionPage = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizDuration, setQuizDuration] = useState(60); // Set the duration for each module in seconds
  const [isSectionActive, setIsSectionActive] = useState(true);
  const [isSubmitActive, setIsSubmitActive] = useState(true);
  const [assessmentName, setAssessmentName] = useState("");
  const [testIds, setTestIds] = useState([]);
  const [questions, setQuestions] = useState({});
  const [answersArray, setAnswersArray] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timerKey, setTimerKey] = useState(Date.now()); // Key to force re-mounting of QuizTimer component

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response1 = await axios.get('http://127.0.0.1:8082/assessments/name/1');
      setAssessmentName(response1.data);

      const response2 = await axios.get('http://127.0.0.1:8082/assessments/testIds/1');
      if (response2.data && Array.isArray(response2.data) && response2.data.length > 0) {
        setTestIds(response2.data);
        await getQuestions(response2.data);
      } else {
        setError("No test IDs found");
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const getQuestions = async (tIds) => {
    try {
      const questionsData = {};
      for (const testId of tIds) {
        const response = await axios.get(`http://127.0.0.1:8090/sharktest/question/test/${testId}`);
        questionsData[testId] = response.data.map((question) => ({
          id: question.id,
          questionTypeId: question.questionTypeId,
          options: question.options,
          questionText: question.questionText,
          correctAnswer: question.correctAnswer,
          testId: testId,
          createdAt: question.createdAt,
          updatedAt: question.updatedAt,
        }));
      }
      setQuestions(questionsData);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching questions");
      setIsLoading(false);
    }
  };

  const currentQuestion = questions[testIds[currentSectionIndex]]
    ? questions[testIds[currentSectionIndex]][currentQuestionIndex]
    : null;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const saveCurrentAnswers = () => {
    setAnswersArray((prevAnswersArray) => [
      ...prevAnswersArray,
      {
        testId: testIds[currentSectionIndex],
        candidates_id: "c2a72e8b-4f3a-44b9-9376-9c3cdebb6789",
        assessment_id: "1",
        answers: currentAnswers,
      },
    ]);
    setCurrentAnswers({});
  };

  const saveAnswer = () => {
    if (currentQuestion) {
      setCurrentAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion.id]: selectedOption,
      }));
    }
  };

  const handleNext = () => {
    saveAnswer();

    if (isSectionActive) {
      if (currentQuestionIndex < questions[testIds[currentSectionIndex]].length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption("");
      } else {
        saveCurrentAnswers();
        if (currentSectionIndex < testIds.length - 1) {
          setCurrentSectionIndex(currentSectionIndex + 1);
          setCurrentQuestionIndex(0);
          setSelectedOption("");
          setIsSectionActive(true);
          setTimerKey(Date.now()); // Force re-mount QuizTimer component for new module
        } else {
          setIsSubmitActive(false);
          // Provide feedback that all questions/modules are completed
        }
      }
    }
  };

  const handleTimeUp = () => {
    handleNext();
  };

  const handleRestartModule = () => {
    setCurrentSectionIndex(currentSectionIndex + 1);
    setIsSectionActive(true);
    setQuizDuration(60); // Reset the timer for the next module
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setTimerKey(Date.now()); // Force re-mount QuizTimer component for restarted module
  };

  useEffect(() => {
    if (isSectionActive) {
      setQuizDuration(60);
    }
  }, [isSectionActive]);

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleSubmit = async () => {
    saveCurrentAnswers();
    console.log("Final answers array:", answersArray);
    
    const apiEndpoint = 'http://127.0.0.1:8092/submissions';
  
    for (const answerObject of answersArray) {
      try {
        const response = await axios.post(apiEndpoint, answerObject);
        console.log('Submission successful:', response);
      } catch (error) {
        console.error('Error submitting answers:', error);
      }
    }
  };

  return (
    <div className="quiz-container">
      {currentQuestion && (
        <QuizTimer key={timerKey} duration={quizDuration} onTimeUp={handleTimeUp} className="timer" />
      )}
      {currentQuestion ? (
        <div className="content-container">
          <div className="question-text">
            {currentQuestion.questionText}
          </div>
          <div className="answer-container">
            {currentQuestion.options.map((option) => (
              <label key={option} className={`answer-option ${selectedOption === option ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  className="radio-button"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="button-container">
        <button
          className={`next-button ${!isSectionActive ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!isSectionActive}
        >
          Next
        </button>
        {!isSectionActive && (
          <button
            className="next-section-button"
            onClick={handleRestartModule}
          >
            Next Section
          </button>
        )}
        {!isSubmitActive && (
          <button
            className="submit-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
