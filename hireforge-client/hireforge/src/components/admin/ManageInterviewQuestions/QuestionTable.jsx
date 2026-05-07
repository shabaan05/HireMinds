import QuestionRow from "./QuestionRow";

function QuestionTable({ questions, selected, onSelect }) {

  return (
  <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

    <table className="w-full text-sm">

      {/* HEAD */}
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-4 py-3 text-left">Select</th>
          <th className="px-4 py-3 text-left">Question</th>
          <th className="px-4 py-3 text-left">Type</th>
          <th className="px-4 py-3 text-left">Difficulty</th>
          <th className="px-4 py-3 text-left">Topic</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody className="divide-y">

        {questions.length === 0 ? (
          <tr>
            <td
              colSpan="5"
              className="text-center py-6 text-gray-400"
            >
              No questions found
            </td>
          </tr>
        ) : (
          questions.map((q) => (
            <QuestionRow
              key={q._id}
              question={q}
              selected={selected}
              onSelect={onSelect}
            />
          ))
        )}

      </tbody>

    </table>

  </div>
);
}

export default QuestionTable;