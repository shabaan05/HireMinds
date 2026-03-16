import InterviewRow from "./InterviewRow";

function InterviewTable({ interviews, refresh }) {

  return (
    <table border="1">

      <thead>
        <tr>
          <th>Title</th>
          <th>Duration</th>
          <th>Status</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {interviews.map((interview) => (
          <InterviewRow
            key={interview._id}
            interview={interview}
            refresh={refresh}
          />
        ))}
      </tbody>

    </table>
  );

}

export default InterviewTable;