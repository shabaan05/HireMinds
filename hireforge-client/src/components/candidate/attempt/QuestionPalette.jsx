const QuestionPalette = ({ questions, currentIndex, answers, onQuestionChange }) => {
  return (
    <div className="mt-4">
      <h4>Questions</h4>

      <div className="flex flex-wrap gap-2">
        {questions.map((q, index) => {
          const ans = answers[q._id];
          let statusClass = "bg-gray-200";

          if (index === currentIndex) {
            statusClass = "bg-blue-500 text-white";
          } else if (
            ans &&
            (ans.selectedAnswer ||
              ans.codeSubmitted ||
              ans.subjectiveAnswer)
          ) {
            statusClass = "bg-green-500 text-white";
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => onQuestionChange(index)}
              className={`w-10 h-10 rounded ${statusClass}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPalette;