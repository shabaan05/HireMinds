const CodeConsole = ({
  currentQuestion,
  handleRunCode,
  isRunning,
  output,
  error,
  isSubmitted,
}) => {
  console.log("CODE CONSOLE PROPS:", {
    handleRunCode,
    handleRunCodeType: typeof handleRunCode,
    isSubmitted,
    currentQuestion,
  });

  if (currentQuestion.type !== "coding") return null;

  return (
    <div className="mt-4 bg-black text-white rounded p-3 font-mono text-sm">

      <button
        type="button"
        onClick={() => {
          console.log("🔥🔥 CODE CONSOLE BUTTON CLICKED");
          handleRunCode();
        }}
        disabled={isRunning || isSubmitted}
        className="mb-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded font-semibold text-sm transition"
      >
        {isRunning ? "Running..." : "Run Code"}
      </button>

      <div className="mb-2 text-gray-400">Console</div>

      {isRunning && <div className="text-yellow-400">Running...</div>}

      {!isRunning && output && (
        <div className="text-green-400 whitespace-pre-wrap">{output}</div>
      )}

      {!isRunning && error && (
        <div className="text-red-400 whitespace-pre-wrap">{error}</div>
      )}

      {!isRunning && !output && !error && (
        <div className="text-gray-500">No output yet. Click "Run Code"</div>
      )}

    </div>
  );
};

export default CodeConsole;
