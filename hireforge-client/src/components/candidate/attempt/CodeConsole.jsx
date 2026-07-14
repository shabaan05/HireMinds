const CodeConsole = ({
  currentQuestion,
  handleRunCode,
  isRunning,
  output,
  error,
  isSubmitted,
}) => {
  if (currentQuestion.type !== "coding") return null;

  return (
    <div className="mt-4 bg-black text-white rounded p-3 font-mono text-sm">

      <button
        onClick={handleRunCode}
        disabled={isRunning || isSubmitted}
      >
        {isRunning ? "Running..." : "Run Code"}
      </button>

      <div className="mb-2 text-gray-400">Console</div>

      {isRunning && <div className="text-yellow-400">Running...</div>}

      {!isRunning && output !== null && (
        <div className="text-green-400 whitespace-pre-wrap">
          {output || "(no output)"}
        </div>
      )}

      {!isRunning && error && (
        <div className="text-red-400 whitespace-pre-wrap">
          {error}
        </div>
      )}

      {!isRunning && !output && !error && (
        <div className="text-gray-500">
          No output yet. Click "Run Code"
        </div>
      )}
    </div>
  );
};

export default CodeConsole;