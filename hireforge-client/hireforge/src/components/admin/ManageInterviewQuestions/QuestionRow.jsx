function QuestionRow({ question, selected, onSelect }) {

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selected.includes(question._id)}
          onChange={() => onSelect(question._id)} // ✅ FIX
        />
      </td>

      <td>{question.questionText}</td>
      <td>{question.type}</td>
      <td>{question.difficulty}</td>
      <td>{question.topic}</td>
    </tr>
  );
}
export default QuestionRow;