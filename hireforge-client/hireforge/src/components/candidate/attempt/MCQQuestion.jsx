const MCQQuestion = ({ question, answer, onAnswerChange }) => {
  return (
    <div className="mb-4">
      <h2 className="font-semibold">{question.questionText}</h2>

      <div className="mt-2 space-y-2">
        {question.options.map((opt, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer"
>
            <input
              type="radio"
              name={`question-${question._id}`} // ✅ better grouping
                checked={answer?.selectedAnswer === opt} // ✅ FIXED

              onChange={() =>
                onAnswerChange(question._id, {
                  selectedAnswer: opt, // 🔥 FIXED
                })
              }
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MCQQuestion;