import InterviewRow from "./InterviewRow";

function InterviewTable({ interviews }) {

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

        {interviews.map((interview) => (
          <InterviewRow key={interview._id} interview={interview} />
        ))}

      </tbody>

    </table>
  );
}

export default InterviewTable;