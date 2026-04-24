// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// import { getAttemptById } from "../../services/attemptService";
// const Result = () => {
//   const { attemptId } = useParams();
// const navigate = useNavigate();
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchResult = async () => {
//       try {
//         const res = await getAttemptById(attemptId);
        
//         setResult(res);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResult();
//   }, [attemptId]);

//   if (loading) return <div className="p-6">Loading result...</div>;
//   if (!result) return <div className="p-6">Result not found</div>;
// const totalQuestions = result?.answers?.length || 0;

// const correctAnswers =
//   result?.answers?.filter((ans) => ans.obtainedMarks > 0).length || 0;

// const incorrectAnswers = totalQuestions - correctAnswers;
//   return (
//     <div className="max-w-3xl mx-auto p-6">
      
//       <h1 className="text-2xl font-bold mb-4">Interview Result</h1>

//       <div className="bg-white shadow p-4 rounded mb-4">
//         <p><strong>Score:</strong> {result.score || 0}</p>
//         <p><strong>Status:</strong> {result.status}</p>
//         <p><strong>Total Questions:</strong> {result.questions?.length}</p>
//       </div>

//       <div className="bg-gray-50 p-4 rounded">
//         <h2 className="font-semibold mb-2">Summary</h2>
        
// <p><strong>Total Questions:</strong> {totalQuestions}</p>
// <p>Correct Answers: {correctAnswers}</p>
// <p>Incorrect Answers: {incorrectAnswers}</p>
//       </div>
// <div className="mt-6 text-center">
//   <button
//     onClick={() => navigate("/candidate/history")}
//     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//   >
//     Go to History
//   </button>
// </div>
//     </div>
//   );
// };

// export default Result;

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

  if (loading) return <div className="p-6">Loading result...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!result) return <div className="p-6">Result not found</div>;

  const totalQuestions = result.answers?.length || 0;

  const correctAnswers =
    result.answers?.filter((ans) => ans.obtainedMarks > 0).length || 0;

  const incorrectAnswers = totalQuestions - correctAnswers;

  const percentage = totalQuestions
    ? ((correctAnswers / totalQuestions) * 100).toFixed(1)
    : 0;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold">Interview Result</h1>

      <div className="bg-white shadow p-4 rounded space-y-2">
        <p>
          <strong>Score:</strong>{" "}
          {result.score} / {result.totalMarks}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-sm ${
              result.status === "evaluated"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {result.status}
          </span>
        </p>

        <p><strong>Percentage:</strong> {percentage}%</p>
      </div>

      {/* SUMMARY */}
      <div className="bg-gray-50 p-4 rounded space-y-1">
        <h2 className="font-semibold mb-2">Summary</h2>

        <p>Total Questions: {totalQuestions}</p>
        <p className="text-green-600">Correct: {correctAnswers}</p>
        <p className="text-red-600">Incorrect: {incorrectAnswers}</p>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/candidate/history")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to History
        </button>
      </div>

    </div>
  );
};

export default Result;