import { useState } from "react";
import { deleteInterview } from "../../../services/interviewService";

import StatusToggle from "./StatusToggle";
import ConfirmModal from "./ConfirmModal";

function InterviewRow({ interview, refresh }) {

  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {

    await deleteInterview(interview._id);

    setShowModal(false);
    refresh();
  };

  return (
    <>
      <tr>

        <td>{interview.title}</td>

        <td>{interview.duration} min</td>

        <td>
          <StatusToggle
            interview={interview}
            refresh={refresh}
          />
        </td>

        <td>
          {new Date(interview.createdAt).toLocaleDateString()}
        </td>

        <td>
          <button>Edit</button>

          <button onClick={() => setShowModal(true)}>
            Delete
          </button>
        </td>

      </tr>

      {showModal && (
        <ConfirmModal
          message="Delete this interview?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default InterviewRow;