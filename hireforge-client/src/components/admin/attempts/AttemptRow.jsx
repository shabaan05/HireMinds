import { useNavigate } from "react-router-dom";

function AttemptRow({ attempt }) {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{attempt.userId?.name}</td>
      <td>{attempt.interviewId?.title}</td>
      <td>{attempt.score}</td>
      <td>{attempt.accuracy}%</td>
      <td>{new Date(attempt.createdAt).toLocaleDateString()}</td>

      <td>
        <button
          onClick={() =>
            navigate(`/admin/attempts/${attempt._id}`,{
                              state: attempt, 

            })
          }
        >
          View
        </button>
      </td>
    </tr>
  );
}

export default AttemptRow;