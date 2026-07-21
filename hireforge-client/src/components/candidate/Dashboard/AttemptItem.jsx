import { useNavigate } from "react-router-dom";

function AttemptItem({ attempt }) {

  const navigate = useNavigate();

  return (
  <div
    className="flex items-center justify-between bg-gray-950 border border-gray-800 
               rounded-xl p-4 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] 
               transition"
  >

    {/* LEFT CONTENT */}
    <div className="space-y-1">

      {/* TITLE */}
      <p className="text-gray-100 font-medium">
        {attempt.interviewId?.title || "Untitled Interview"}
      </p>

      {/* SCORE */}
      <p className="text-sm text-gray-400">
        Score:{" "}
        <span className="text-blue-400 font-semibold">
          {attempt.score}
        </span>
      </p>

    </div>

    {/* ACTION BUTTON */}
    <button
      onClick={() =>
        navigate(`/user/attempts/${attempt._id}`)
      }
      className="px-3 py-1.5 text-sm rounded-lg 
                 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                 hover:shadow-[0_0_12px_rgba(139,92,246,0.6)] 
                 transition"
    >
      View →
    </button>

  </div>
);
}

export default AttemptItem;