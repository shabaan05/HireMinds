const SubjectiveQuestion = ({ question, answer, onAnswerChange }) => {
  return (
    <div>
      <h2 className="font-semibold">{question.questionText}</h2>

      <textarea
        className="w-full border mt-2 p-2"
        rows={5}
        value={answer || ""}
        onChange={(e) =>
          onAnswerChange(question._id, e.target.value)
        }
      />
    </div>
  );
};

export default SubjectiveQuestion;