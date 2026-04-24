// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { useRef } from "react";
// import { getAttemptById } from "../../services/attemptService";
// import QuestionRenderer from "../../components/candidate/attempt/QuestionRenderer";
// import QuestionNavigator from "../../components/candidate/attempt/QuestionNavigator";
// import Timer from "../../components/candidate/attempt/Timer";
// import { getInterviewById } from "../../services/interviewService";
// import { saveAnswer } from "../../services/attemptService";
// import { useNavigate } from "react-router-dom";
// import { useAttempt } from "../../context/AttemptContext";
// import { submitAttempt } from "../../services/attemptService";
// import Editor from "@monaco-editor/react";
// import axios from "axios";


// const AttemptInterview = () => {
//   const {
//   currentIndex,
//   setCurrentIndex,
//   answers,
//   setAnswers,
//   isSubmitted,
//   setIsSubmitted,code,setCode,input,setInput
// } = useAttempt();
//   const debounceRef = useRef(null);
//   const {attemptId} = useParams();
//   const [questions, setQuestions] = useState([]);
// const [isSubmitting, setIsSubmitting] = useState(false);
// const [attempt, setAttempt] = useState(null);
// const [output, setOutput] = useState("");
// const [error, setError] = useState("");
// const [isRunning, setIsRunning] = useState(false);
// const [language, setLanguage] = useState("javascript");
// const navigate = useNavigate();
// const currentQuestion = questions[currentIndex];
// const questionId = currentQuestion?._id;


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const attemptData = await getAttemptById(attemptId);
//       setAttempt(attemptData);

//       // Restore answers properly
//       const restoredAnswers = {};
//       attemptData.answers.forEach((ans) => {
//         restoredAnswers[ans.questionId] = {
//           selectedAnswer: ans.selectedAnswer || "",
//           codeSubmitted: ans.codeSubmitted || "",
//           subjectiveAnswer: ans.subjectiveAnswer || "",
//         };
//       });

//       setAnswers(restoredAnswers);

//       //  Fetch interview
//       const interview = await getInterviewById(
//         attemptData.interviewId._id
//       );

//       setQuestions(interview.questions);

//       //  FIX: use AFTER initialization
//       const currentQ = interview.questions[0];
//       if (currentQ?.type === "coding") {

// const existing = restoredAnswers[currentQ?._id];
       
//         if (currentQ?.type === "coding") {
//   const existing = restoredAnswers[currentQ?._id];

//   if (existing?.codeSubmitted) {
//     setCode(existing.codeSubmitted);
//   } else {
//     //  SAFE DEFAULT (only when no saved code)
//     setCode(defaultCode);

//   }
// }
//       }

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchData();
// }, [attemptId]);
// //...............................................

// useEffect(() => {
//   return () => {
//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }
//   };
// }, []);
// //......................................tt

// const handleAnswerChange = (questionId, answer) => {
//   console.log("HANDLER CALLED", questionId, answer); // ✅ FIXED

//   const safeId =
//     typeof questionId === "object"
//       ? questionId._id
//       : String(questionId);

//   setAnswers((prev) => {
//     const updated = {
//       ...prev,
//       [safeId]: {
//         ...prev[safeId],
//         ...answer,
//       },
//     };

//     console.log("UPDATED ANSWERS:", updated); // ✅ FIXED
//     return updated;
//   });

//   // debounce save
//   if (debounceRef.current) {
//     clearTimeout(debounceRef.current);
//   }

//   debounceRef.current = setTimeout(() => {
//     if (!safeId) return;

//     saveAnswer(attemptId, {
//       questionId: safeId,
//       codeSubmitted: answer.codeSubmitted,
//     });
//   }, 800);
// };
// //handle next back..................................tt
// const handleNext = () => {
//   if (currentIndex < questions.length - 1) {
//     setCurrentIndex(currentIndex + 1);
//   }
// };

// const handlePrev = () => {
//   if (currentIndex > 0) {
//     setCurrentIndex(currentIndex - 1);
//   }
// };
// //.................................................................handlesubmit tt
// const handleSubmit = async () => {
//     console.log("SUBMIT CLICKED 🔥");
//   try {
//     if (isSubmitting) return;

//     setIsSubmitting(true);

//     // clear debounce
//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }



// await Promise.all(
//   Object.entries(answers).map(([questionId, answer]) => {
//     const safeId =
//       typeof questionId === "object"
//         ? questionId._id
//         : String(questionId);
//     return saveAnswer(attemptId, {
//       questionId: safeId,   
//       selectedAnswer: answer?.selectedAnswer || "",
// codeSubmitted:
//   typeof answer === "string"
//     ? answer
//     : answer?.codeSubmitted || "",
//       subjectiveAnswer: answer?.subjectiveAnswer || "",
//     });
//   })
// );
//  console.log("FINAL SEND:", questionId, typeof questionId);
// console.log("FINAL ANSWERS befor submit attempt :", answers);
//     //  Submit attempt (evaluation happens here)
//     await submitAttempt({
//       attemptId,
//     });

//     setIsSubmitted(true);

//     //  Navigate to result
//     navigate(`/candidate/result/${attemptId}`);

//   } catch (err) {
//     console.error("SUBMIT ERROR:", err);
//     setError(err.response?.data?.message || err.message);
//     alert("Failed to submit attempt. Please try again.");
//   } finally {
//     setIsSubmitting(false);
//   }
// };
// //................................
// const handleQuestionChange = (index) => {
//   const currentQ = questions[currentIndex];

//   console.log("SENDING:", questionId, typeof questionId);
//   if (currentQ && answers[currentQ._id]) {
//     saveAnswer({
//       attemptId,
//       questionId: String(questionId),
//         // questionId: typeof questionId === "object" ? questionId._id : questionId,
//       answer: answers[currentQ._id],
//     });
//   }

//   setCurrentIndex(index);
// };
// //handle run code........................................

// const handleRunCode = async () => {
//   try {
//     setIsRunning(true);
//     setOutput("");
//     setError("");

//     const res = await axios.post("http://localhost:8000/api/code/run", {
//       code: code,
//       language: "javascript",
//       input: input || "0 0", // you can later pass sample input
//     });
//     console.log("FULL RESPONSE:", res.data);
// const result = res.data;
// console.log("result",result);


// if (result.data.error) {
//   setError(result.data.error);
// } else {
//   setOutput(result.data.output ?? "");
// }
 
//   } catch (err) {
//     console.log(err);  // ADD THIS LINE

//   setError(
//     err.response?.data?.message || err.message)
//   } finally {
//     setIsRunning(false);
//   }
// }
// //...................................................
// if (!questions.length ) {
//   return <div>Loading...</div>;
// }

//   return (
//     <div className="p-6">
// <p>Question {currentIndex + 1} of {questions.length}</p>

// {attempt && (
//   <Timer
//     startedAt={attempt.startedAt}
//     duration={attempt?.interviewId?.duration}
//     onTimeUp={handleSubmit}
//   />
// )}
    
// {currentQuestion ? (
//   <QuestionRenderer
//     question={currentQuestion}
//     answer={answers[currentQuestion?._id]}
//     onAnswerChange={handleAnswerChange}
//   />
// ) : (
//   <div>Loading question...</div>
// )}
//    <QuestionNavigator
//   total={questions.length}
//   currentIndex={currentIndex}
//   setCurrentIndex={handleQuestionChange}
// />

//      <button
//        type="button"  // 🔥 ADD THIS
//   onClick={handleSubmit}
//   disabled={isSubmitting}
// >
//   {isSubmitting ? "Submitting..." : "Submit"}
// </button>




// <div className="flex justify-between mt-4">
//   <button 
//     onClick={handlePrev}
//     disabled={currentIndex === 0}
//     className="px-4 py-2 bg-gray-300 rounded"
//   >
//     Previous
//   </button>

//   <button 
//     onClick={handleNext}
//     disabled={currentIndex === questions.length - 1}
//     className="px-4 py-2 bg-blue-500 text-white rounded"
//   >
//     Next
//   </button>
// </div>
//  {/*  ADD OUTPUT CONSOLE HERE */} 
// <div className="mt-4 bg-black text-white rounded p-3 font-mono text-sm">

//   {currentQuestion.type === "coding" && (
//   <>
//     <button
//       onClick={handleRunCode}
//       disabled={isRunning || isSubmitted}
//     >
//       {isRunning ? "Running..." : "Run Code"}
//     </button>

//     <div className="mb-2 text-gray-400">Console</div>

//     {isRunning && (
//       <div className="text-yellow-400">Running...</div>
//     )}

//     {!isRunning && output !== null && (
//       <div className="text-green-400 whitespace-pre-wrap">
//         {output || "(no output)"}
//       </div>
//     )}

//     {!isRunning && error && (
//       <div className="text-red-400 whitespace-pre-wrap">
//         {error}
//       </div>
//     )}

//     {!isRunning && !output && !error && (
//       <div className="text-gray-500">
//         No output yet. Click "Run Code"
//       </div>
//     )}
//   </>
// )}
// </div>
// {/* questions .............*/}
// <div className="mt-4">
//   <h4>Questions</h4>

//   <div className="flex flex-wrap gap-2">
//   {questions.map((q, index) => {
// const ans = answers[q._id];
//   let statusClass = "bg-gray-200"; // default

//   if (index === currentIndex) {
//     statusClass = "bg-blue-500 text-white"; // current
//   } else if (
//     ans &&
//     (
//       ans.selectedAnswer ||
//       ans.codeSubmitted ||
//       ans.subjectiveAnswer
//     )
//   ) {
//     statusClass = "bg-green-500 text-white"; // attempted
//   }

//   return (
//     <button
//       key={index}
//       onClick={() => setCurrentIndex(index)}
//       className={`w-10 h-10 rounded ${statusClass}`}
//     >
//       {index + 1}
//     </button>
//   );
// })}
//   </div>
// </div>
//     </div>

    

//   );
// };

// export default AttemptInterview













//...........................
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAttempt } from "../../context/AttemptContext";
import { getAttemptById, saveAnswer, submitAttempt } from "../../services/attemptService";
import { getInterviewById } from "../../services/interviewService";

import QuestionRenderer from "../../components/candidate/attempt/QuestionRenderer";
import QuestionNavigator from "../../components/candidate/attempt/QuestionNavigator";

import AttemptHeader from "../../components/candidate/attempt/AttemptHeader";
import NavigationButtons from "../../components/candidate/attempt/NavigationButtons";
import CodeConsole from "../../components/candidate/attempt/CodeConsole";
import QuestionPalette from "../../components/candidate/attempt/QuestionPalette";

const AttemptInterview = () => {
  const {
    currentIndex,
    setCurrentIndex,
    answers,
    setAnswers,
    isSubmitted,
    setIsSubmitted,
    code,
    setCode,
    input,
    setInput,
  } = useAttempt();

  const { attemptId } = useParams();
  const navigate = useNavigate();

  const debounceRef = useRef(null);

  const [questions, setQuestions] = useState([]);
  const [attempt, setAttempt] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const currentQuestion = questions[currentIndex];

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const attemptData = await getAttemptById(attemptId);
        setAttempt(attemptData);

        const restoredAnswers = {};
        attemptData.answers.forEach((ans) => {
          restoredAnswers[ans.questionId._id] = {
            selectedAnswer: ans.selectedAnswer || "",
            codeSubmitted: ans.codeSubmitted || "",
            subjectiveAnswer: ans.subjectiveAnswer || "",
          };
        });

        setAnswers(restoredAnswers);

        const interview = await getInterviewById(
          attemptData.interviewId._id
        );

        setQuestions(interview.questions);

        // Initialize code editor safely
        const firstQ = interview.questions[0];
        if (firstQ?.type === "coding") {
          const existing = restoredAnswers[firstQ._id];
          setCode(existing?.codeSubmitted || "// Start coding...");
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [attemptId]);

  // ================= CLEANUP =================
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // ================= ANSWER CHANGE =================
  const handleAnswerChange = (questionId, answer) => {
    const safeId = String(questionId);

    setAnswers((prev) => ({
      ...prev,
      [safeId]: {
        ...prev[safeId],
        ...answer,
      },
    }));

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      saveAnswer(attemptId, {
        questionId: safeId,
        ...answer,
      });
    }, 800);
  };

  // ================= NAVIGATION =================
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleQuestionChange = (index) => {
    const currentQ = questions[currentIndex];

    if (currentQ && answers[currentQ._id]) {
      saveAnswer(attemptId, {
        questionId: currentQ._id,
        ...answers[currentQ._id],
      });
    }

    setCurrentIndex(index);
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      if (isSubmitting) return;

      setIsSubmitting(true);
      clearTimeout(debounceRef.current);

      await Promise.all(
        Object.entries(answers).map(([questionId, answer]) =>
          saveAnswer(attemptId, {
            questionId,
            selectedAnswer: answer?.selectedAnswer || "",
            codeSubmitted: answer?.codeSubmitted || "",
            subjectiveAnswer: answer?.subjectiveAnswer || "",
          })
        )
      );

      await submitAttempt({ attemptId });

      setIsSubmitted(true);
      navigate(`/candidate/result/${attemptId}`);

    } catch (err) {
      console.error(err);
      alert("Submit failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= RUN CODE =================
  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      setOutput("");
      setError("");

      const res = await axios.post("/api/code/run", {
        code,
        language: "javascript",
        input: input || "",
      });

      const result = res.data;

      if (result.data?.error) {
        setError(result.data.error);
      } else {
        setOutput(result.data?.output || "");
      }

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsRunning(false);
    }
  };

  // ================= LOADING =================
  if (!questions.length) {
    return <div className="p-6">Loading interview...</div>;
  }

  // ================= UI =================
  return (
    <div className="p-6">

      <AttemptHeader
        currentIndex={currentIndex}
        total={questions.length}
        attempt={attempt}
        handleSubmit={handleSubmit}
      />

      {currentQuestion ? (
        <QuestionRenderer
          question={currentQuestion}
          answer={answers[currentQuestion._id]}
          onAnswerChange={handleAnswerChange}
        />
      ) : (
        <div>Loading question...</div>
      )}

      <QuestionNavigator
        total={questions.length}
        currentIndex={currentIndex}
        setCurrentIndex={handleQuestionChange}
      />

      <NavigationButtons
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
        currentIndex={currentIndex}
        total={questions.length}
        isSubmitting={isSubmitting}
      />

      <CodeConsole
        currentQuestion={currentQuestion}
        handleRunCode={handleRunCode}
        isRunning={isRunning}
        output={output}
        error={error}
        isSubmitted={isSubmitted}
      />

      <QuestionPalette
        questions={questions}
        currentIndex={currentIndex}
        answers={answers}
        setCurrentIndex={setCurrentIndex}
      />

    </div>
  );
};

export default AttemptInterview;