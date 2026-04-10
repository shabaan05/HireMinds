import InterviewRow from "./InterviewRow";

function InterviewTable({ interviews = [] }) { // ✅ default empty array

  return (
    <table border="1">

      <thead>
        <tr>
          <th>Title</th>
          <th>Duration</th>
          <th>Experience</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {interviews.length === 0 ? (
          <tr>
            <td colSpan="4">No interviews found</td>
          </tr>
        ) : (
          interviews.map((interview) => (
            <InterviewRow key={interview._id} interview={interview} />
          ))
        )}

      </tbody>

    </table>
  );
}

export default InterviewTable;