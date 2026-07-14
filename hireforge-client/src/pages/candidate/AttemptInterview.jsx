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

      
const interviewId =
  typeof attemptData.interviewId === "object"
    ? attemptData.interviewId._id
    : attemptData.interviewId;

const interview = await getInterviewById(interviewId);
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
      navigate(`/user/result/${attemptId}`);

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
  <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-6">

    <div className="max-w-7xl mx-auto space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-5">
        <AttemptHeader
          currentIndex={currentIndex}
          total={questions.length}
          attempt={attempt}
          handleSubmit={handleSubmit}
        />
      </div>

      {/* ================= QUESTION ================= */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-6">

        {currentQuestion ? (
          <QuestionRenderer
            question={currentQuestion}
            answer={answers[currentQuestion._id]}
            onAnswerChange={handleAnswerChange}
          />
        ) : (
          <div className="text-center py-20 text-gray-400">
            Loading question...
          </div>
        )}

      </div>

      {/* ================= CODE OUTPUT ================= */}
      {currentQuestion?.type === "coding" && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-6">
          <CodeConsole
            currentQuestion={currentQuestion}
            handleRunCode={handleRunCode}
            isRunning={isRunning}
            output={output}
            error={error}
            isSubmitted={isSubmitted}
          />
        </div>
      )}

      {/* ================= NAVIGATION ================= */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-5">
        <NavigationButtons
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
          currentIndex={currentIndex}
          total={questions.length}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* ================= QUESTION PALETTE ================= */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-5">

        <h3 className="text-lg font-semibold text-blue-400 mb-4">
          Question Palette
        </h3>

        <QuestionPalette
          questions={questions}
          currentIndex={currentIndex}
          answers={answers}
          setCurrentIndex={setCurrentIndex}
        />

      </div>

    </div>

  </div>
);
};

export default AttemptInterview;