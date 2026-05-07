import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInterviewById } from "../../services/interviewService";
import InterviewDetails from "../../components/admin/ManageInterviews/InterviewDetails";
import InterviewActions from "../../components/admin/ManageInterviews/InterviewActions";
import { useLocation } from "react-router-dom";

function ManageInterview() {
  const { id } = useParams();
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
  <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

    {/* HEADER */}
    <div>
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Manage Interview
      </h2>
      <p className="text-gray-500 mt-1">
        View details and manage interview settings
      </p>
    </div>

    {/* DETAILS CARD */}
    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
      <InterviewDetails
        interview={interview}
        onRefresh={fetchInterview}
      />
    </div>

    {/* ACTIONS CARD */}
    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
      <InterviewActions interviewId={id} />
    </div>

  </div>
);
}

export default ManageInterview;