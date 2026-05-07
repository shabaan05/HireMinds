import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAttempts } from "../../services/attemptService";

const History = () => {
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

if (loading) {
  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-400">
      Loading attempts...
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

return (
  <div className="max-w-5xl mx-auto p-6 space-y-6 text-gray-100">

    {/* HEADER */}
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Your Attempts
      </h1>
      <p className="text-gray-400 text-sm mt-1">
        Review your past interview performance
      </p>
    </div>

    {/* EMPTY */}
    {attempts.length === 0 ? (
      <p className="text-gray-400">No attempts yet</p>
    ) : (
      <div className="space-y-4">

        {attempts.map((attempt) => (
          <div
            key={attempt._id}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-5 
                       flex flex-col sm:flex-row sm:items-center sm:justify-between 
                       gap-4 hover:border-blue-500 transition"
          >

            {/* LEFT */}
            <div className="space-y-1">
              <h2 className="font-semibold text-gray-100">
                {attempt.interviewId?.title || "Untitled"}
              </h2>

              <p className="text-sm text-gray-400">
                {new Date(attempt.createdAt).toLocaleString()}
              </p>
            </div>

            {/* CENTER */}
            <div className="space-y-1">
              <p className="text-sm">
                Score:{" "}
                <span className="font-semibold text-blue-400">
                  {attempt.score} / {attempt.totalMarks}
                </span>
              </p>

              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  attempt.status === "evaluated"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                }`}
              >
                {attempt.status}
              </span>
            </div>

            {/* ACTION */}
            <button
              onClick={() =>
                navigate(`/candidate/attempts/${attempt._id}`)
              }
              className="px-4 py-2 text-sm rounded-lg 
                         bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                         hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] 
                         transition"
            >
              View →
            </button>

          </div>
        ))}

      </div>
    )}

  </div>
);
};

export default History;