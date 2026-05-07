

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAttemptById } from "../../services/attemptService";

const Result = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);

        const res = await getAttemptById(attemptId);
        setResult(res);

      } catch (err) {
        console.error(err);
        setError("Failed to load result");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  if (loading) {
  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-400">
      Loading result...
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

if (!result) {
  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-400">
      Result not found
    </div>
  );
}

const totalQuestions = result.answers?.length || 0;

const correctAnswers =
  result.answers?.filter((ans) => ans.obtainedMarks > 0).length || 0;

const incorrectAnswers = totalQuestions - correctAnswers;

const percentage = totalQuestions
  ? ((correctAnswers / totalQuestions) * 100).toFixed(1)
  : 0;

return (
  <div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-100">

    {/* HEADER */}
    <div className="text-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Interview Result
      </h1>
      <p className="text-gray-400 text-sm mt-1">
        Here’s how you performed
      </p>
    </div>

    {/* MAIN RESULT CARD */}
    <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6 space-y-4 text-center">

      <p className="text-lg">
        Score:
        <span className="ml-2 text-blue-400 font-bold text-xl">
          {result.score} / {result.totalMarks}
        </span>
      </p>

      <p>
        Status:{" "}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            result.status === "evaluated"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
          }`}
        >
          {result.status}
        </span>
      </p>

      <p className="text-lg">
        Percentage:
        <span className="ml-2 text-purple-400 font-semibold">
          {percentage}%
        </span>
      </p>

    </div>

    {/* SUMMARY */}
    <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6 space-y-3">

      <h2 className="font-semibold text-gray-100 mb-2">
        Summary
      </h2>

      <p className="text-gray-300">
        Total Questions: {totalQuestions}
      </p>

      <p className="text-green-400">
        Correct: {correctAnswers}
      </p>

      <p className="text-red-400">
        Incorrect: {incorrectAnswers}
      </p>

    </div>

    {/* ACTION */}
    <div className="text-center">
      <button
        onClick={() => navigate("/candidate/history")}
        className="px-5 py-2 rounded-lg text-sm font-medium text-white
                   bg-gradient-to-r from-blue-500 to-purple-600
                   hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                   transition"
      >
        Go to History →
      </button>
    </div>

  </div>
);
};

export default Result;