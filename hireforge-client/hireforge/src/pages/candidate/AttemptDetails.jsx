import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  startInterview,
  saveAnswer,
  submitInterview,
  getResult,
  getUserAttempts
} from "../../services/attemptService"; 
const AttemptDetails = () => {
  const { attemptId } = useParams();

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const res = await attemptService.getAttemptById(attemptId);
        setAttempt(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [attemptId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!attempt) return <div className="p-6">No data found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      <h1 className="text-2xl font-bold mb-4">Attempt Details</h1>

      {/* Summary */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <p><strong>Score:</strong> {attempt.score}</p>
        <p><strong>Status:</strong> {attempt.status}</p>
      </div>

      {/* Questions Review */}
      <div className="space-y-6">
        {attempt.questions.map((q, index) => {
          const userAnswer = attempt.answers?.[q._id];
          const correctAnswer = q.correctAnswer;

          const isCorrect = userAnswer === correctAnswer;

          return (
            <div key={q._id} className="border p-4 rounded">
              
              <h2 className="font-semibold mb-2">
                Q{index + 1}. {q.questionText}
              </h2>

              {/* User Answer */}
              <p>
                <strong>Your Answer:</strong>{" "}
                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                  {userAnswer || "Not Answered"}
                </span>
              </p>

              {/* Correct Answer */}
              <p>
                <strong>Correct Answer:</strong> {correctAnswer}
              </p>

              {/* Optional Explanation */}
              {q.explanation && (
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default AttemptDetails;