function RecentAttemptsTable({ attempts }) {

  return (
    <div>

      <h3>Recent Attempts</h3>

      <table border="1">

        <thead>
          <tr>
            <th>User</th>
            <th>Interview</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {attempts.slice(0, 5).map((a) => (
            <tr key={a._id}>
              <td>{a.userId?.name}</td>
              <td>{a.interviewId?.title}</td>
              <td>{a.score}</td>
              <td>{new Date(a.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentAttemptsTable;