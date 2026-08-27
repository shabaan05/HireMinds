import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAttempt } from "../../context/AttemptContext";
import { getAttemptById, saveAnswer, submitAttempt, runCode } from "../../services/attemptService";
import { getInterviewById } from "../../services/interviewService";
import QuestionRenderer from "../../components/candidate/attempt/QuestionRenderer";
import AttemptHeader from "../../components/candidate/attempt/AttemptHeader";
import NavigationButtons from "../../components/candidate/attempt/NavigationButtons";
import CodeConsole from "../../components/candidate/attempt/CodeConsole";
import QuestionPalette from "../../components/candidate/attempt/QuestionPalette";

const DEFAULT_CODE = `// Write your logic here

function solve() {
  const a = Number(inputFn());
  const b = Number(inputFn());

  console.log(a * b);
}

solve();`;

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

  console.log("🔥 ACTUAL ATTEMPT INTERVIEW LOADED");

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
          // handle both populated object and plain ID string
          const qId =
            ans.questionId?._id
              ? ans.questionId._id
              : String(ans.questionId);
          restoredAnswers[qId] = {
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

        // Initialize code for first question
        const firstQ = interview.questions[0];
        if (firstQ?.type === "coding") {
          const existing = restoredAnswers[firstQ._id];
          setCode(existing?.codeSubmitted || DEFAULT_CODE);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [attemptId]);

  // ================= RESET CONSOLE + RESTORE CODE ON QUESTION CHANGE =================
  useEffect(() => {
    if (!currentQuestion) return;

    console.log("NEW CURRENT QUESTION", currentQuestion._id);
    console.log("NEW QUESTION SAVED ANSWER", answers[currentQuestion._id]);

    // Always clear console output when moving to a new question
    setOutput("");
    setError("");
    setIsRunning(false);

    if (currentQuestion.type === "coding") {
      const saved = answers[currentQuestion._id];
      const restoredCode = saved?.codeSubmitted || DEFAULT_CODE;
      setCode(restoredCode);
      console.log("RESTORED CODE FOR QUESTION", currentQuestion._id, restoredCode.slice(0, 60));
    }
  }, [currentQuestion?._id]); // keyed on the question ID, not the object reference

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

  // ================= SAVE CURRENT ANSWER IMMEDIATELY =================
  // Flushes the latest code/answer for the current question to the backend
  // and updates the answers map — used before any navigation.
  const flushCurrentAnswer = async () => {
    if (!currentQuestion) return;

    clearTimeout(debounceRef.current);

    const latestAnswer =
      currentQuestion.type === "coding"
        ? {
            ...(answers[currentQuestion._id] || {}),
            codeSubmitted: code, // always use context code — latest Monaco value
          }
        : answers[currentQuestion._id] || {};

    console.log("CURRENT QUESTION BEFORE NAVIGATION", currentQuestion._id);
    console.log("CURRENT CODE BEFORE NAVIGATION", code);
    console.log("CURRENT ANSWER BEFORE NAVIGATION", latestAnswer);

    // Sync into answers map so the restore on the next question sees fresh data
    setAnswers((prev) => ({
      ...prev,
      [String(currentQuestion._id)]: latestAnswer,
    }));

    await saveAnswer(attemptId, {
      questionId: String(currentQuestion._id),
      selectedAnswer: latestAnswer.selectedAnswer || "",
      codeSubmitted: latestAnswer.codeSubmitted || "",
      subjectiveAnswer: latestAnswer.subjectiveAnswer || "",
    });

    console.log("SAVED ANSWER", { questionId: currentQuestion._id, ...latestAnswer });
  };

  // ================= NAVIGATION =================
  const handleNext = async () => {
    await flushCurrentAnswer();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = async () => {
    await flushCurrentAnswer();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Used by QuestionPalette
  const handleQuestionChange = async (index) => {
    if (index === currentIndex) return;
    await flushCurrentAnswer();
    setCurrentIndex(index);
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      if (isSubmitting) return;

      setIsSubmitting(true);
      clearTimeout(debounceRef.current);

      // Build final answers map — merge latest code for current coding question
      const finalAnswers = { ...answers };
      if (currentQuestion?.type === "coding") {
        finalAnswers[String(currentQuestion._id)] = {
          ...(finalAnswers[String(currentQuestion._id)] || {}),
          codeSubmitted: code,
        };
      }

      console.log("FINAL ANSWERS BEFORE SUBMIT", finalAnswers);

      // Save every question to backend before submitting
      await Promise.all(
        Object.entries(finalAnswers).map(([questionId, answer]) =>
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
    console.log("🔥🔥 RUN BUTTON HANDLER CALLED");
    console.log("🔥 code value:", code);

    try {
      setIsRunning(true);
      setOutput("");
      setError("");

      console.log("🔥 BEFORE runCode");

      const result = await runCode({
        code,
        language: "javascript",
        input: input || "",
      });

      console.log("🔥 RUN CODE RESULT:", result);

      // runCode returns res.data → { success, data: { output, error } }
      if (result?.data?.error) {
        setError(result.data.error);
      } else {
        setOutput(result?.data?.output || "");
      }
    } catch (err) {
      console.error("🔥 RUN CODE ERROR:", err);
      setError(err.response?.data?.message || err.message || "Failed to execute code");
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

        {/* HEADER */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-5">
          <AttemptHeader
            currentIndex={currentIndex}
            total={questions.length}
            attempt={attempt}
            handleSubmit={handleSubmit}
          />
        </div>

        {/* QUESTION */}
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

        {/* CODE CONSOLE — only for coding questions */}
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

        {/* NAVIGATION */}
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

        {/* QUESTION PALETTE */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-5">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">
            Question Palette
          </h3>
          <QuestionPalette
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            onQuestionChange={handleQuestionChange}
          />
        </div>

      </div>
    </div>
  );
};

export default AttemptInterview;
