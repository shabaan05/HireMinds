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
useEffect(() => {

 const fetchData = async () => {

  try {
    const statsRes = await getAdminStats();

    setStats(statsRes); // ✅ will now run
  } catch (err) {
    console.error("Stats error:", err);
  }

  try {
    const attemptsRes = await getAllAttempts();
    setAttempts(attemptsRes);
  } catch (err) {
    console.error("Attempts error:", err);
  }

  try {
    const interviewsRes = await getInterviews();
    setInterviews(interviewsRes);
  } catch (err) {
    console.error("Interviews error:", err);
  }
};
fetchData();
}, []);
  return (
    <div>

      <h2>Admin Dashboard</h2>

      <StatsSection stats={stats} />

      <div style={{ display: "flex", gap: "20px" }}>
        <RecentAttemptsTable attempts={attempts} />
        <RecentInterviewsTable interviews={interviews} />
      </div>

      <DashboardChart attempts={attempts} />

    </div>
  );
}

export default AdminDashboard;