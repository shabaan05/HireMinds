const CodingQuestion = ({ question, answer, onAnswerChange }) => {
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

      {/* Code Editor */}
      <textarea
        className="w-full h-64 border rounded p-3 font-mono text-sm"
        placeholder="Write your code here..."
        value={answer || ""}
        onChange={(e) =>
          onAnswerChange(question._id, e.target.value)
        }
      />
    </div>
  );
};

export default CodingQuestion;