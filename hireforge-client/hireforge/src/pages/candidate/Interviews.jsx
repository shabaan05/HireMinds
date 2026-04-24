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
    return <div className="p-6">Loading interviews...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <AvailableInterviews interviews={interviews || []} />
    </div>
  );
}

export default Interviews;