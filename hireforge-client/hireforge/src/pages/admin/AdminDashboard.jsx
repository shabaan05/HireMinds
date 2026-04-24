import { useEffect, useState } from "react";

import StatsSection from "../../components/admin/dashboard/StatsSection";
import RecentAttemptsTable from "../../components/admin/dashboard/RecentAttemptsTable";
import RecentInterviewsTable from "../../components/admin/dashboard/RecentInterviewsTable";
import DashboardChart from "../../components/admin/dashboard/DashboardChart";
import { getAdminStats } from "../../services/adminService";
import { getInterviews } from "../../services/interviewService";
import { getAllAttempts } from "../../services/adminService";
import AdminNavbar from "../../components/admin/AdminNavbar";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [attempts, setAttempts] = useState([]);
  const [interviews, setInterviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [statsRes, attemptsRes, interviewsRes] = await Promise.all([
          getAdminStats(),
          getAllAttempts(),
          getInterviews(),
        ]);

        setStats(statsRes);
        setAttempts(attemptsRes);
        setInterviews(interviewsRes);

      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }
return (
  <div className="p-6 space-y-6">

    <h2 className="text-2xl font-bold">Admin Dashboard</h2>

    {/* STATS */}
    <StatsSection stats={stats} />

    {/*  TABLES SECTION */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Recent Attempts</h3>
        <RecentAttemptsTable attempts={attempts} />
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Recent Interviews</h3>
        <RecentInterviewsTable interviews={interviews} />
      </div>

    </div>

    {/*  CHART */}
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Performance Overview</h3>
      <DashboardChart attempts={attempts} />
    </div>

  </div>
);
}

export default AdminDashboard;
