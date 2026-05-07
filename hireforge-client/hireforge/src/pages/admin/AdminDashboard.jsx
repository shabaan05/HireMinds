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

// LOADING
if (loading) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <p className="text-gray-500 text-lg animate-pulse">
        Loading dashboard...
      </p>
    </div>
  );
}

// ERROR
if (error) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <p className="text-red-500 text-lg font-medium">
        {error}
      </p>
    </div>
  );
}

return (
  <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

    {/* HEADER */}
    <div>
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Admin Dashboard
      </h2>
      <p className="text-gray-500 mt-1">
        Overview of platform performance
      </p>
    </div>

    {/* STATS */}
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <StatsSection stats={stats} />
    </div>

    {/* TABLES */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Attempts */}
      <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Attempts
          </h3>
          <span className="text-sm text-gray-400">Live</span>
        </div>

        <div className="overflow-x-auto">
          <RecentAttemptsTable attempts={attempts} />
        </div>
      </div>

      {/* Interviews */}
      <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Interviews
          </h3>
          <span className="text-sm text-gray-400">Latest</span>
        </div>

        <div className="overflow-x-auto">
          <RecentInterviewsTable interviews={interviews} />
        </div>
      </div>

    </div>

    {/* CHART */}
    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Performance Overview
      </h3>

      <DashboardChart attempts={attempts} />
    </div>

  </div>
)};

export default AdminDashboard;
