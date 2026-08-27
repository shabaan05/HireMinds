import { useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useAttempt } from "../../../context/AttemptContext";

const CodingQuestion = ({
  question,
  input,
  setInput,
  isSubmitted,
  onAnswerChange,
}) => {
  // Use context code so handleRunCode in AttemptInterview reads the correct value
  const { code, setCode, answers } = useAttempt();
  const currentAnswer = answers[question._id] || {};
useEffect(() => {
  if (!question) return;

  const defaultCode = `// Write your logic here

function solve() {
  const a = Number(inputFn());
  const b = Number(inputFn());

  console.log(a * b);
}

solve();`;

  if (currentAnswer?.codeSubmitted) {
    if (currentAnswer.codeSubmitted.includes("fs.readFileSync")) {
      setCode(defaultCode);
    } else {
      setCode(currentAnswer.codeSubmitted);
    }
  } else {
    setCode(defaultCode);
  }
}, [question]); //  ONLY question
  if (!question) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="mb-4">
      {/* Question Title */}
      <h2 className="font-semibold text-lg mb-2">
        {question.questionText || "Coding Question"}
      </h2>

      {/* Description */}
      {question.description && (
        <p className="text-gray-600 mb-3">
          {question.description}
        </p>
      )}

      {/* Constraints */}
      {question.constraints && (
        <div className="bg-gray-50 p-3 rounded mb-3 text-sm">
          <strong>Constraints:</strong>
          <ul className="list-disc pl-5 mt-1">
            {question.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 💻 Monaco Editor */}
     <Editor
  height="400px"
  theme="vs-dark"
  language="javascript"
  value={code}
  onChange={(value) => {
    console.log("CODING CHANGE TRIGGERED"); // 👈 NOW WILL PRINT

    const updatedCode = value || "";

    setCode(updatedCode);

    onAnswerChange(question._id, {
      codeSubmitted: updatedCode,
    });
  }}
/>

      {/* 🧾 Input Box */}
      <div className="mt-5">
  <h4 className="text-sm font-semibold text-gray-300 mb-2">
    Input
  </h4>

  <textarea
    value={input}
    onChange={(e) => setInput(e.target.value)}
    disabled={isSubmitted}
    placeholder="Enter input (e.g. 2 3)"
    rows={3}
    className="
      w-full
      bg-gray-950
      border border-gray-700
      rounded-xl
      px-4 py-3
      text-gray-100
      placeholder-gray-500
      font-mono text-sm
      outline-none
      resize-y
      transition
      focus:border-blue-500
      focus:ring-1
      focus:ring-blue-500
      disabled:opacity-60
      disabled:cursor-not-allowed
    "
  />
</div>
    </div>
  );
};

export default CodingQuestion;