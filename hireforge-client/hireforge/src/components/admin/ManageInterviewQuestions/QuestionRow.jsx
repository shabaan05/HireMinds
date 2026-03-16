function QuestionRow({ question, selected, setSelected }) {

  const handleSelect = () => {

    if (selected.includes(question._id)) {
      setSelected(selected.filter(id => id !== question._id));
    } else {
      setSelected([...selected, question._id]);
    }

  };

  return (
    <tr>

      <td>
        <input
          type="checkbox"
          checked={selected.includes(question._id)}
          onChange={handleSelect}
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