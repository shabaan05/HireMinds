const MCQQuestion = ({ question, answer, onAnswerChange }) => {
  return (
    <div className="mb-4">
      <h2 className="font-semibold">{question.questionText}</h2>

      <div className="mt-2 space-y-2">
        {question.options.map((opt, index) => (
          <label key={index} className="block">
            <input
              type="radio"
              name={question._id}
              checked={answer === opt}
              onChange={() => onAnswerChange(question._id, opt)}
            />
            <span className="ml-2">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MCQQuestion;