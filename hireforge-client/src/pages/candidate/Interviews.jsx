import { useState, useEffect } from "react";
import { getInterviews } from "../../services/interviewService";
import AvailableInterviews from "../../components/candidate/Dashboard/AvailableInterviews";

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getInterviews();
        setInterviews(data);

      } catch (err) {
        console.error(err);
        setError("Failed to load interviews");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

if (loading) {
  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-400">
      Loading interviews...
    </div>
  );
}

if (error) {
  return (
    <div className="flex items-center justify-center h-[60vh] text-red-400">
      {error}
    </div>
  );
}

return (
  <div className="p-6 space-y-6 text-gray-100">

    {/* HEADER */}
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Interviews
      </h1>
      <p className="text-gray-400 text-sm mt-1">
        Explore available interviews and start practicing
      </p>
    </div>

    {/* CONTENT */}
    <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-6">
      <AvailableInterviews interviews={interviews || []} />
    </div>

  </div>
);
}

export default Interviews;