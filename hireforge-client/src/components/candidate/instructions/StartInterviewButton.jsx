const StartInterviewButton = ({ onStart, loading }) => {

  return (
  <button
    onClick={onStart}
    disabled={loading}
    className="px-6 py-2 rounded-lg text-sm font-medium text-white
               bg-gradient-to-r from-blue-500 to-purple-600
               hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
               hover:scale-[1.02]
               active:scale-[0.98]
               transition-all duration-200
               disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? "Starting..." : "Start Interview 🚀"}
  </button>
);
};

export default StartInterviewButton;