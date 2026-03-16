import { useEffect, useState } from "react";
import { getInterviews } from "../../services/interviewService";
import InterviewTable from "../../components/admin/InterviewList/InterviewTable";

function InterviewList() {

  const [interviews, setInterviews] = useState([]);

  const fetchInterviews = async () => {
    const res = await getInterviews();
    setInterviews(res.data);
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <div>

      <h2>All Interviews</h2>

      <InterviewTable interviews={interviews} />

    </div>
  );
}

export default InterviewList;