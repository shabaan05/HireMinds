import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  startInterview,
  saveAnswer,
  submitInterview,
  getResult,
  getUserAttempts
} from "../../services/attemptService"; 
import QuestionRenderer from "../../components/candidate/attempt/QuestionRenderer";
import QuestionNavigator from "../../components/candidate/attempt/QuestionNavigator";
import Timer from "../../components/candidate/attempt/Timer";

const AttemptInterview = () => {
  const { interviewId } = useParams();
  const [searchParams] = useSearchParams();
  const attemptId = searchParams.get("attemptId");

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const res = await getAttemptById(attemptId);
        setQuestions(res.data.questions);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAttempt();
  }, [attemptId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    try {
      await submitAttempt({
        attemptId,
        answers,
      });
          navigate(`/candidate/result/${attemptId}`);

    } catch (err) {
      console.error(err);
    }
  };

  if (!questions.length) return <div>Loading...</div>;

  return (
    <div className="p-6">
<Timer
  startedAt={attempt.startedAt}
  duration={attempt.interview.duration}
/>
      <QuestionRenderer
        question={questions[currentIndex]}
        answer={answers[questions[currentIndex]._id]}
        onAnswerChange={handleAnswerChange}
      />

      <QuestionNavigator
        total={questions.length}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default AttemptInterview;