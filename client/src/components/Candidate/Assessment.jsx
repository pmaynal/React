import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Assessment() {
    const [assessment_name,setAssessment_name] = useState("");
    const [testIds, setTestIds] = useState([]);
    const [questions, setQuestions] = useState({});

    useEffect(()=>{
      // debugger;
      // console.log(1);
        getAssessment();
    },[])

    // useEffect(()=>{
    //   debugger;
    //   console.log(2);
    //   getTests();
    // },[assessment_name])

  //   useEffect(() => {
  //     debugger;
  //     console.log(3);
  //     if (testIds.length > 0) {
  //         getQuestionsForTestIds(testIds);
  //     }
  // }, [testIds]);

  //   useEffect(() => {
  //     console.log(3);
  //     for (let index = 0; index < testIds.length; index++) {
  //       getQuestionsForTestIds(testIds);
  //           }
  // }, [testIds]);
  
//   useEffect(() => {
//     for (let index = 0; index < testIds.length; index++) {
//       getQuestions(testIds[index]);
//     }
// }, [testIds]);

    const getAssessment = () => {
        // debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.readyState === 4 && helper.status === 200) {
              var response = helper.responseText;
              setAssessment_name(response);
              getTests();
            }
          };
        helper.open("GET",`http://127.0.0.1:8082/assessments/name/1`);
        helper.send();
    }

    const getTests = () => {

      var helper = new XMLHttpRequest();
      helper.onreadystatechange = () => {
          if (helper.readyState === 4 && helper.status === 200) {
            var response = JSON.parse(helper.responseText);
            setTestIds(response);
            getQuestions(testIds);
          }
        };
      helper.open("GET",`http://127.0.0.1:8082/assessments/testIds/1`);
      helper.send();
    }
    
    const getQuestions = (tIds) => {
      if (tIds.length > 0) {
          tIds.forEach(testId => {
            // debugger
              var helper = new XMLHttpRequest();
              helper.onreadystatechange = () => {
                  if (helper.readyState === 4 && helper.status === 200) {
                      var response = JSON.parse(helper.responseText);
                      console.log(response);
                      
                      sessionStorage.setItem(testId, JSON.stringify(response));
                  }
              };
              helper.open("GET", `http://127.0.0.1:8090/sharktest/question/test/${testId}`);
              helper.send();
          });
      }
  }

//   const getQuestions = (tIds) => {
//     if(tIds.length > 0) {
//     let count = 0;
//     for (let index = 0; index < tIds.length; index++) {
      
//     var helper = new XMLHttpRequest();
//     helper.onreadystatechange = () => {
//         if (helper.readyState === 4 && helper.status === 200) {
//           // debugger;
//           var response = JSON.parse(helper.responseText);
//           console.log(response.toString());
//           // console.log(typeof response);
//           // const questionsData = {};
//           // questionsData[tIds[count]]=response
//           // setQuestions(response);
//           sessionStorage.setItem(`${testIds[count]}`, JSON.stringify(response));
//           count=count+1;
//         }
//       };
//     helper.open("GET",`http://127.0.0.1:8090/sharktest/question/test/${tIds[index]}`);
//     helper.send();   
//     }
//   }  
// }

// const getQuestionsForTestIds = (testIds) => {
//   debugger
//   Promise.all(testIds.map(testId => 
//       axios.get(`http://127.0.0.1:8090/sharktest/question/test/${testId}`)
//   )).then(responses => {
//       const questionsData = {};
//       responses.forEach((response, index) => {
//           questionsData[testIds[index]] = response.data.slice(0, 5); // Take the first 5 questions
//           console.log(questionsData[testIds[index]]); 
//       });
//       setQuestions(questionsData);
//   }).catch(error => {
//       console.error("Error fetching questions:", error);
//   });
// };

  return (
    <>
    <div>{assessment_name}</div>
    {testIds.map(testId => (
                <div key={testId}>
                    <h2>Test ID: {testId}</h2>
                    <ul>
                        {questions[testId] && questions[testId].map((question, index) => (
                            <li key={index}>
                                <strong>Question:</strong> {question.questionText}
                                <ul>
                                    {question.options.map((option, idx) => (
                                        <li key={idx}>{option}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
    </>
  )
}

export default Assessment