import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  startInterview,
  saveAnswer,
  submitInterview,
  getResult,
  getUserAttempts
} from "../../services/attemptService"; 
const History = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await attemptService.getUserAttempts();
        setAttempts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Attempts</h1>

      {attempts.length === 0 ? (
        <p>No attempts yet</p>
      ) : (
        <div className="space-y-4">
          {attempts.map((attempt) => (
            <div
              key={attempt._id}
              className="border p-4 rounded cursor-pointer hover:bg-gray-50"
              onClick={() =>
                navigate(`/candidate/attempt-details/${attempt._id}`)
              }
            >
              <h2 className="font-semibold">
                {attempt.interview?.title}
              </h2>

              <p>Status: {attempt.status}</p>
              <p>Score: {attempt.score || 0}</p>

              <p className="text-sm text-gray-500">
                {new Date(attempt.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;