import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAttempts } from "../../services/attemptService";

function MyAttempts() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        setLoading(true);

        const res = await getUserAttempts(); 
        setAttempts(res);

      } catch (err) {
        console.error(err);
        setError("Failed to load attempts");
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold">My Attempts</h1>

      {attempts.length === 0 ? (
        <p>No attempts found</p>
      ) : (
        <div className="space-y-3">
          {attempts.map((attempt) => (
            <div
              key={attempt._id}
              className="flex justify-between items-center bg-white shadow p-4 rounded"
            >

              {/* Interview Title */}
              <div>
                <p className="font-semibold">
                  {attempt.interviewId?.title || "Untitled"}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(attempt.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Score */}
              <div>
                <p className="font-medium">
                  Score: {attempt.score} / {attempt.totalMarks}
                </p>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    attempt.status === "evaluated"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {attempt.status}
                </span>
              </div>

              {/* View Button */}
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() =>
                  navigate(`/candidate/attempts/${attempt._id}`)
                }
              >
                View
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default MyAttempts;