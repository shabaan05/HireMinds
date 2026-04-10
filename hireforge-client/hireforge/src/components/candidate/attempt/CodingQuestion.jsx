import Editor from "@monaco-editor/react";
import { useAttempt } from "../../../context/AttemptContext";
const CodingQuestion = ({ question }) => {
  const { code, setCode, input, setInput, isSubmitted } = useAttempt();
  return (
    <div className="mb-4">
      {/* Question Title */}
      <h2 className="font-semibold text-lg mb-2">
        {question.questionText}
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

   
      <Editor
  height="400px"
  theme="vs-dark"
  language="javascript"
  value={code}
  onChange={(value) => setCode(value)}
  options={{
    readOnly: isSubmitted   
  }}
/>
<div className="mt-4">
  <h4 className="font-semibold mb-1">Input:</h4>

  <textarea
    value={input}
    onChange={(e) => setInput(e.target.value)}
      disabled={isSubmitted}   
    placeholder="Enter input (e.g. 2 3)"
    className="w-full border p-2 rounded bg-gray-50"
    rows={3}
  />
</div>
    </div>
  );
};

export default CodingQuestion;