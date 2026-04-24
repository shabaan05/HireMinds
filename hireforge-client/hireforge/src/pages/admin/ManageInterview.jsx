import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInterviewById } from "../../services/interviewService";
import InterviewDetails from "../../components/admin/ManageInterviews/InterviewDetails";
import InterviewActions from "../../components/admin/ManageInterviews/InterviewActions";
import { useLocation } from "react-router-dom";
function ManageInterview() {
  const { id } = useParams();
  // const [interview, setInterview] = useState(null);


const location = useLocation();
const [interview, setInterview] = useState(location.state || null);
  const fetchInterview = async () => {
    const data = await getInterviewById(id);
    setInterview(data);
  };

  useEffect(() => {
    fetchInterview();
  }, [id]);

  if (!interview) return <p>Loading...</p>;

  return (
    <div>
      <h2>Manage Interview</h2>

      <InterviewDetails interview={interview} onRefresh={fetchInterview} />

      <InterviewActions interviewId={id} />
    </div>
  );
}

export default ManageInterview;