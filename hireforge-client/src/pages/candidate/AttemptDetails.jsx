


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
      } catch (err) {
        console.error(err);
        setError("Failed to load attempt");
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [attemptId]);

  //  Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-400">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-400">
        {error}
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-400">
        No data found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-100">

      <h1 className="text-2xl font-bold">
        Attempt Details
      </h1>

      {/* SUMMARY */}
      <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-5 space-y-2 text-center">

        <p className="text-lg text-gray-300">
          <span className="text-gray-400">Score:</span>{" "}
          <span className="text-blue-400 font-semibold">
            {attempt.score}
          </span>
        </p>

        <p className="text-gray-300">
          <span className="text-gray-400">Status:</span>{" "}
          <span
            className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
              attempt.status === "evaluated"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
            }`}
          >
            {attempt.status}
          </span>
        </p>

      </div>

      {/* QUESTIONS */}
      <div className="space-y-4">

        {attempt.answers?.length === 0 ? (
          <p className="text-gray-400">No answers found</p>
        ) : (
          attempt.answers.map((ans, index) => {
            const q = ans.questionId;

            return (
              <div
                key={q._id}
                className={`bg-gray-900/70 backdrop-blur border rounded-2xl p-5 space-y-3 ${
                  ans.isCorrect
                    ? "border-green-500/20"
                    : "border-red-500/20"
                }`}
              >

                {/* QUESTION */}
                <h2 className="font-semibold text-gray-100">
                  Q{index + 1}. {q.questionText}
                </h2>

                {/* USER ANSWER */}
                <p className="text-sm">
                  <span className="text-gray-400">Your Answer:</span>{" "}
                  <span
                    className={`font-medium ${
                      ans.isCorrect
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {ans.selectedAnswer || "Not Answered"}
                  </span>
                </p>

                <p className="text-sm">
                  <span className="text-gray-400">Correct Answer:</span>{" "}
                  <span className="text-blue-400 font-medium">
                    {q.correctAnswer}
                  </span>
                </p>

                {q.explanation && (
                  <p className="text-sm text-gray-400 border-t border-gray-800 pt-2">
                    <span className="text-gray-300 font-medium">
                      Explanation:
                    </span>{" "}
                    {q.explanation}
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