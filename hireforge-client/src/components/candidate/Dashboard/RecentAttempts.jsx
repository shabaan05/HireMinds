import { useNavigate } from "react-router-dom";
import AttemptItem from "./AttemptItem";

function RecentAttempts({ attempts = [], loading }) {
  const navigate = useNavigate();
  const recent = attempts.slice(0, 5);

  return (
    <div className="space-y-3 pb-8">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Recent Attempts
        </h2>
        {attempts.length > 5 && (
          <button
            type="button"
            onClick={() => navigate("/user/attempts")}
            className="text-xs text-blue-400 hover:text-blue-300 transition"
          >
            View all →
          </button>
        )}
      </div>

      {/* States */}
      {loading ? (
        <div className="bg-gray-900 border border-white/5 rounded-2xl p-8 text-center text-gray-600 text-sm">
          Loading attempts…
        </div>
      ) : recent.length === 0 ? (
        <div className="bg-gray-900 border border-white/5 rounded-2xl p-10 text-center space-y-4">
          <p className="text-2xl">🎯</p>
          <p className="text-sm text-gray-400 font-medium">No attempts yet</p>
          <p className="text-xs text-gray-600">Start your first interview to see your performance here.</p>
          <button
            type="button"
            onClick={() => navigate("/user/interviews")}
            className="px-5 py-2 text-sm font-semibold rounded-lg
                       bg-gradient-to-r from-blue-500 to-purple-600 text-white
                       hover:from-blue-400 hover:to-purple-500
                       transition-all shadow-lg shadow-blue-500/20"
          >
            Browse Interviews
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {recent.map((attempt) => (
            <AttemptItem key={attempt._id} attempt={attempt} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentAttempts;
