import QuestionCard from "./QuestionCard";

function QuestionList({ questions, onRefresh }) {
  if (questions.length === 0) {
    return <p>No questions created yet</p>;
  }

  return (
    <div>
      {questions.map((q) => (
        <QuestionCard key={q._id} question={q} onRefresh={onRefresh} />
      ))}
    </div>
  );
}

export default QuestionList;