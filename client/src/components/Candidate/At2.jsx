import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizTimer from './QuizTimer';

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
  const [answers, setAnswers] = useState({
    assessmentId: "1b11cc09-b6ea-4ca0-ab16-948966893fe1",
    submittedAt: null,
    answers: {}
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const saveAnswer = () => {
    if (currentQuestion) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        submittedAt: prevAnswers.submittedAt || new Date().toISOString(),
        answers: {
          ...prevAnswers.answers,
          [currentQuestion.id]: selectedOption,
        },
      }));
    }
  };

  const handleNext = () => {
    saveAnswer();

    if (isSectionActive) {
      if (currentQuestionIndex < questions[testIds[currentSectionIndex]].length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption("");
      } else {
        if (currentSectionIndex < testIds.length - 1) {
          setCurrentSectionIndex(currentSectionIndex + 1);
          setCurrentQuestionIndex(0);
          setSelectedOption("");
          setIsSectionActive(true);
        } else {
          setIsSubmitActive(false);
          alert("You have completed all the questions!");
        }
      }
    }
  };

  const handleTimeUp = () => {
    alert("Time is up! Moving to the next module.");
    handleNext();
  };

  const handleRestartModule = () => {
    if ((currentSectionIndex + 1) % 3 === 0) {
      setIsSubmitActive(false);
      return;
    }
    setCurrentSectionIndex(currentSectionIndex + 1);
    setIsSectionActive(true);
    setQuizDuration(60); // Reset the timer for the next module
    setCurrentQuestionIndex(0);
    setSelectedOption("");
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

  const handleSubmit = () => {
    // saveAnswer();
    const response = axios.get('http://127.0.0.1:8082/assessments/name/1');
    console.log("Final answers:", answers);
    // axios.post('your-submission-endpoint', answers)
    //   .then(response => {
    //     console.log('Submission successful:', response);
    //   })
    //   .catch(error => {
    //     console.error('Error submitting answers:', error);
    //   });
  };

  return (
    <div className="flex flex-col items-center p-8">
      {isSectionActive && (
        <QuizTimer duration={quizDuration} onTimeUp={handleTimeUp} />
      )}
      {currentQuestion ? (
        <div className="flex w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg">
          <div className="flex-1 pr-6">
            <h1 className="text-2xl font-bold mb-4">
              {currentQuestion.questionText}
            </h1>
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
                    disabled={!isSectionActive}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex mt-6 space-x-4">
        {isSectionActive ? (
          <button
            className={`px-6 py-2 text-white font-semibold rounded ${
              isSectionActive
                ? "bg-green-500 hover:bg-green-600"
                : "bg-green-300 cursor-not-allowed"
            }`}
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            onClick={handleRestartModule}
          >
            Next Section
          </button>
        )}
        {!isSubmitActive && (
          <button
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600"
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
