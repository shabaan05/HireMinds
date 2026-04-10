import AttemptRow from "./AttemptRow";

function AttemptTable({ attempts = [] }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>User</th>
          <th>Interview</th>
          <th>Score</th>
          <th>Accuracy</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {attempts.length === 0 ? (
          <tr>
            <td colSpan="6">No attempts found</td>
          </tr>
        ) : (
          attempts.map((a) => (
            <AttemptRow key={a._id} attempt={a} />
          ))
        )}
      </tbody>
    </table>
  );
}

export default AttemptTable;