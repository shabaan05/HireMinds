
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttemptById } from "../../services/attemptService";

const AttemptDetails = () => {
  const { attemptId } = useParams();

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        setLoading(true);

        const res = await getAttemptById(attemptId);
        setAttempt(res);
console.log(res)
      } catch (err) {
        console.error(err);
        setError("Failed to load attempt");
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [attemptId]);

  // ⏳ Loading
  if (loading) return <div className="p-6">Loading...</div>;

  // ❌ Error
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  // ❌ No data
  if (!attempt) return <div className="p-6">No data found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold">Attempt Details</h1>

      {/* Summary */}
      <div className="bg-white shadow p-4 rounded">
        <p><strong>Score:</strong> {attempt.score}</p>
        <p><strong>Status:</strong> {attempt.status}</p>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {attempt.answers?.length === 0 ? (
          <p>No answers found</p>
        ) : (
          attempt.answers?.map((ans, index) => {
            const q = ans.questionId;

            return (
              <div key={q._id} className="border p-4 rounded">

                <h2 className="font-semibold mb-2">
                  Q{index + 1}. {q.questionText}
                </h2>

                {/* User Answer */}
                <p>
                  <strong>Your Answer:</strong>{" "}
                  <span className={ans.isCorrect ? "text-green-600" : "text-red-600"}>
                    {ans.selectedAnswer || "Not Answered"}
                  </span>
                </p>

                {/* Correct Answer */}
                <p>
                  <strong>Correct Answer:</strong> {q.correctAnswer}
                </p>

                {/* Explanation */}
                {q.explanation && (
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default AttemptDetails;