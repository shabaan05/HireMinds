function QuestionRow({ question, selected, onSelect }) {

return (
  <tr className="hover:bg-gray-50 transition">

    {/* CHECKBOX */}
    <td className="px-4 py-3">
      <input
        type="checkbox"
        checked={selected.includes(question._id)}
        onChange={() => onSelect(question._id)}
        className="w-4 h-4 accent-blue-600 cursor-pointer"
      />
    </td>

    {/* QUESTION TEXT */}
    <td className="px-4 py-3 font-medium text-gray-800">
      {question.questionText}
    </td>

    {/* TYPE */}
    <td className="px-4 py-3">
      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600 font-medium">
        {question.type}
      </span>
    </td>

    {/* DIFFICULTY */}
    <td className="px-4 py-3">
      <span
        className={`px-2 py-1 text-xs rounded font-medium ${
          question.difficulty === "easy"
            ? "bg-green-100 text-green-600"
            : question.difficulty === "medium"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {question.difficulty}
      </span>
    </td>

    {/* TOPIC */}
    <td className="px-4 py-3 text-gray-600">
      {question.topic}
    </td>

  </tr>
);
}
export default QuestionRow;