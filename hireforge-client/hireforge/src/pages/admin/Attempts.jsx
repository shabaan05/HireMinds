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
    <div>
      <h2>All Attempts</h2>
      <AttemptTable attempts={attempts} />
    </div>
  );
}

export default Attempts;