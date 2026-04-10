import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { getAttemptById } from "../../services/attemptService";
import QuestionRenderer from "../../components/candidate/attempt/QuestionRenderer";
import QuestionNavigator from "../../components/candidate/attempt/QuestionNavigator";
import Timer from "../../components/candidate/attempt/Timer";
import { getInterviewById } from "../../services/interviewService";
import { saveAnswer } from "../../services/attemptService";
import { useNavigate } from "react-router-dom";
import { useAttempt } from "../../context/AttemptContext";
import { submitAttempt } from "../../services/attemptService";
import Editor from "@monaco-editor/react";
import axios from "axios";
const AttemptInterview = () => {
  const { interviewId } = useParams();
  const {
  currentIndex,
  setCurrentIndex,
  answers,
  setAnswers,
  isSubmitted,
  setIsSubmitted
} = useAttempt();
  const debounceRef = useRef(null);
  const [searchParams] = useSearchParams();
  const attemptId = searchParams.get("attemptId");
  const [questions, setQuestions] = useState([]);
const [isSubmitting, setIsSubmitting] = useState(false);
const [attempt, setAttempt] = useState(null);
const [output, setOutput] = useState("");
const [error, setError] = useState("");
const [isRunning, setIsRunning] = useState(false);
const [code, setCode] = useState("");//..
const [input, setInput] = useState(""); 
const navigate = useNavigate();
const currentQuestion = questions[currentIndex];
 useEffect(() => {
  const fetchData = async () => {
    try {
      const attemptData = await getAttemptById(attemptId);
      console.log("attempt", attemptData);

      setAttempt(attemptData);
//  Restore saved answers
const restoredAnswers = {};
attemptData.answers.forEach((ans) => {
  if (ans.selectedAnswer) {
    restoredAnswers[ans.questionId] = ans.selectedAnswer;
  }
});
setAnswers(restoredAnswers);
      const interview = await getInterviewById(attemptData.interviewId._id);
      console.log("interview", interview);

      setQuestions(interview.questions);

    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, [attemptId]);
//..
useEffect(() => {
  return () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };
}, []);
 const handleAnswerChange = (questionId, answer) => {
  //  Update UI immediately
  setAnswers((prev) => ({
    ...prev,
    [questionId]: answer,
  }));

  //  Clear previous timer
  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }

  // Set new debounce timer
  debounceRef.current = setTimeout(() => {
    saveAnswer({
      attemptId,
      questionId,
      answer,
    });
  }, 800); 
};
//handle next back
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
//.................................................................handlesubmit
const handleSubmit = async () => {

  try {
    // Prevent double click
    if (isSubmitting) return;

    setIsSubmitting(true);

    //  Clear pending debounce and save immediately
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    await Promise.all(
      Object.entries(answers).map(([questionId, answer]) =>
        saveAnswer({ attemptId, questionId, answer })
      )
    );
//.......

// Submit attempt
    await submitAttempt({
      attemptId,
      answers,
    });
setIsSubmitted(true);
    navigate(`/candidate/result/${attemptId}`);

  } catch (err) {
    console.error(err);
    console.log(err); 
  setError(err.response?.data?.message || err.message);
    alert("Failed to submit attempt. Please try again."); 
  } finally {
    setIsSubmitting(false);
  }
};
const handleQuestionChange = (index) => {
  const currentQ = questions[currentIndex];

  if (currentQ && answers[currentQ._id]) {
    saveAnswer({
      attemptId,
      questionId: currentQ._id,
      answer: answers[currentQ._id],
    });
  }

  setCurrentIndex(index);
};
//handle run code

const handleRunCode = async () => {
  try {
    setIsRunning(true);
    setOutput("");
    setError("");

    const res = await axios.post("http://localhost:5000/api/code/run", {
      code: code,
      language: "javascript",
      input: input, // you can later pass sample input
    });

    if (res.data.data.error) {
      setError(res.data.data.error);
    } else {
      setOutput(res.data.data.output);
    }
  } catch (err) {
    console.log(err);  // 👈 ADD THIS LINE

  setError(
    err.response?.data?.message || err.message)
  } finally {
    setIsRunning(false);
  }
};
//......
if (!questions.length || !attempt || !questions[currentIndex]) {
  return <div>Loading...</div>;
}

  return (
    <div className="p-6">
<p>Question {currentIndex + 1} of {questions.length}</p>

<Timer
  startedAt={attempt.startedAt}
duration={attempt?.interviewId?.duration}
  onTimeUp={handleSubmit}
/>
      <QuestionRenderer
        // question={questions[currentIndex]}
  question={currentQuestion}
        answer={answers[questions[currentIndex]?._id]}
        onAnswerChange={handleAnswerChange}
        code={code}
  setCode={setCode}
      />

   <QuestionNavigator
  total={questions.length}
  currentIndex={currentIndex}
  setCurrentIndex={handleQuestionChange}
/>

     <button
  onClick={handleSubmit}
  disabled={isSubmitting}
>
  {isSubmitting ? "Submitting..." : "Submit"}
</button>


<button
  onClick={handleRunCode}
  disabled={isRunning || isSubmitted}
>
  {isRunning ? "Running..." : "Run Code"}
</button>
<div className="flex justify-between mt-4">
  <button 
    onClick={handlePrev}
    disabled={currentIndex === 0}
    className="px-4 py-2 bg-gray-300 rounded"
  >
    Previous
  </button>

  <button 
    onClick={handleNext}
    disabled={currentIndex === questions.length - 1}
    className="px-4 py-2 bg-blue-500 text-white rounded"
  >
    Next
  </button>
</div>
 {/*  ADD OUTPUT CONSOLE HERE */} 
<div className="mt-4 bg-black text-white rounded p-3 font-mono text-sm">
  <div className="mb-2 text-gray-400">Console</div>

  {isRunning && (
    <div className="text-yellow-400">Running...</div>
  )}

  {!isRunning && output && (
    <div className="text-green-400 whitespace-pre-wrap">
      {output}
    </div>
  )}

  {!isRunning && error && (
    <div className="text-red-400 whitespace-pre-wrap">
      {error}
    </div>
  )}

  {!isRunning && !output && !error && (
    <div className="text-gray-500">
      No output yet. Click "Run Code"
    </div>
  )}
</div>
{/* questions .............*/}
<div className="mt-4">
  <h4>Questions</h4>

  <div className="flex flex-wrap gap-2">
  {questions.map((q, index) => {
const ans = answers[q._id];
  let statusClass = "bg-gray-200"; // default

  if (index === currentIndex) {
    statusClass = "bg-blue-500 text-white"; // current
  } else if (
    ans &&
    (
      ans.selectedAnswer ||
      ans.codeSubmitted ||
      ans.subjectiveAnswer
    )
  ) {
    statusClass = "bg-green-500 text-white"; // attempted
  }

  return (
    <button
      key={index}
      onClick={() => setCurrentIndex(index)}
      className={`w-10 h-10 rounded ${statusClass}`}
    >
      {index + 1}
    </button>
  );
})}
  </div>
</div>
    </div>

    
  );
};

export default AttemptInterview;