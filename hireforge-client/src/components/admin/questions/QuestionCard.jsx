import { deleteQuestion } from "../../../services/questionService";

function QuestionCard({ question, onRefresh }) {
  const handleDelete = async () => {
    await deleteQuestion(question._id);
    onRefresh();
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <p><strong>{question.questionText}</strong></p>
      <p>Type: {question.type}</p>
      <p>Difficulty: {question.difficulty}</p>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default QuestionCard;