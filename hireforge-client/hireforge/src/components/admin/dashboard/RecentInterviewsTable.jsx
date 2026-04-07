import { useNavigate } from "react-router-dom";

function RecentInterviewsTable({ interviews }) {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%" }}>

      <h3>Recent Interviews</h3>
<button onClick={() => navigate("/admin/interviews/create")}>
  + Create Interview
</button>

      <table border="1" width="100%" cellPadding="8">

        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Created Date</th>
          </tr>
        </thead>

        <tbody>

          {interviews && interviews.length > 0 ? (
            interviews.slice(0, 5).map((interview) => (
              <tr key={interview._id}>

                <td>{interview.title}</td>

                <td>{interview.duration} min</td>

                <td>
                  {interview.isActive ? "Active" : "Inactive"}
                </td>

                <td>
                  {new Date(interview.createdAt).toLocaleDateString()}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No interviews found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

export default RecentInterviewsTable;