import React from "react";

const QuestionDisplay = ({
  question,
  index,
  answers,
  handleAnswerChange,
}) => {
  if (!question) return null;

  return (
    <div className="bg-white shadow p-4 rounded">

      <h2 className="font-semibold mb-3">
        Q{index + 1}. {question.questionText}
      </h2>

      {/* MCQ */}
      {question.type === "mcq" && (
        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <label key={i} className="block">
              <input
                type="radio"
                name={question._id}
                value={opt}
                checked={answers[question._id]?.selectedAnswer === opt}
                onChange={() =>
                  handleAnswerChange(question._id, {
                    selectedAnswer: opt,
                  })
                }
              />
              <span className="ml-2">{opt}</span>
            </label>
          ))}
        </div>
      )}

    </div>
  );
};

export default QuestionDisplay;