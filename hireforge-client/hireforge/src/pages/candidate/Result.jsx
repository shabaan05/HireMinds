import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  startInterview,
  saveAnswer,
  submitInterview,
  getResult,
  getUserAttempts
} from "../../services/attemptService"; 
const Result = () => {
  const { attemptId } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getAttemptById(attemptId);
        setResult(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  if (loading) return <div className="p-6">Loading result...</div>;
  if (!result) return <div className="p-6">Result not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      
      <h1 className="text-2xl font-bold mb-4">Interview Result</h1>

      <div className="bg-white shadow p-4 rounded mb-4">
        <p><strong>Score:</strong> {result.score || 0}</p>
        <p><strong>Status:</strong> {result.status}</p>
        <p><strong>Total Questions:</strong> {result.questions?.length}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded">
        <h2 className="font-semibold mb-2">Summary</h2>
        <p>Correct Answers: {result.correctCount || 0}</p>
        <p>Incorrect Answers: {result.incorrectCount || 0}</p>
      </div>

    </div>
  );
};

export default Result;