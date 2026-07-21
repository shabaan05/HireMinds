import { useNavigate } from "react-router-dom";

function InterviewCard({ interview }) {

  const navigate = useNavigate();

  return (
  <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-5 overflow-hidden 
                  hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition">

    {/* GLOW BACKGROUND */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl opacity-40"></div>

    {/* CONTENT */}
    <div className="relative z-10 space-y-3">

      {/* TITLE */}
      <h4 className="text-lg font-semibold text-gray-100">
        {interview.title}
      </h4>

      {/* DURATION */}
      <p className="text-sm text-gray-400">
        Duration: {interview.duration} minutes
      </p>

      {/* BUTTON */}
      <button
          onClick={() => {
    if (!interview?._id) return;

const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/user/interviews/instructions/${interview._id}`);
  }}
  className="mt-2 px-4 py-2 text-sm font-medium rounded-lg 
             bg-gradient-to-r from-blue-500 to-purple-600 text-white 
             hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] 
             transition"
      >
        Start Interview 🚀
      </button>

    </div>

  </div>
);
}

export default InterviewCard;