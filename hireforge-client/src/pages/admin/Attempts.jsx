import { useEffect, useState } from "react";
import { getAllAttempts } from "../../services/adminService";
import AttemptTable from "../../components/admin/attempts/AttemptTable";
function Attempts() {
  const [attempts, setAttempts] = useState([]);

  const fetchAttempts = async () => {
    const res = await getAllAttempts();
    setAttempts(res); 
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

return (
  <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

    {/* HEADER */}
    <div>
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        All Attempts
      </h2>
      <p className="text-gray-500 mt-1">
        View and manage all candidate attempts
      </p>
    </div>

    {/* TABLE CARD */}
    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
      <AttemptTable attempts={attempts} />
    </div>

  </div>
);
}

export default Attempts;