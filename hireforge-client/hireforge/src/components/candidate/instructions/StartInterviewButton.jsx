const StartInterviewButton = ({ onStart, loading }) => {
    
  return (
    <button
      onClick={onStart}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
    >
      {loading ? "Starting..." : "Start Interview"}
    </button>
  );
};

export default StartInterviewButton;