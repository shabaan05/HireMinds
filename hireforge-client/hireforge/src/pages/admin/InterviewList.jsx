import { useEffect, useState } from "react";
import { getInterviews } from "../../services/interviewService";
import InterviewTable from "../../components/admin/InterviewList/InterviewTable";

function InterviewList() {

  const [interviews, setInterviews] = useState([]);

  const fetchInterviews = async () => {
    const res = await getInterviews();
    setInterviews(res);
  };

  useEffect(() => {
    fetchInterviews();
  }, []);


return (
  <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

    {/* HEADER */}
    <div className="flex justify-between items-center">

      <div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          All Interviews
        </h2>
        <p className="text-gray-500 mt-1">
          Manage and view all created interviews
        </p>
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={() => navigate("/admin/interviews/create")}
        className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-90 transition"
      >
        + Create Interview
      </button>

    </div>

    {/* TABLE CARD */}
    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
      <InterviewTable interviews={interviews} />
    </div>

  </div>
);
}

export default InterviewList;