import QuestionRow from "./QuestionRow";

function QuestionTable({ questions, selected, onSelect }) {

  return (
    <table border="1">

      <thead>
        <tr>
          <th>Select</th>
          <th>Question</th>
          <th>Type</th>
          <th>Difficulty</th>
          <th>Topic</th>
        </tr>
      </thead>

      <tbody>
        {questions.map(q => (
         <QuestionRow
  key={q._id}
  question={q}
  selected={selected}
  onSelect={onSelect} 
/>
        ))}
      </tbody>

    </table>
  );
}

export default QuestionTable;