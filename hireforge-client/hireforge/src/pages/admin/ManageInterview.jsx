import { useEffect, useState } from "react";
import SearchBar from "../../components/admin/ManageInterviews/SearchBar";
import InterviewTable from "../../components/admin/ManageInterviews/InterviewTable";

function ManageInterview() {

  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState("");

 //..
  const fetchInterviews = async () => {
    const data = await getInterviews();
    setInterviews(data.data);
  };

  useEffect(() => {
    fetchInterviews();
  }, []);


  const filtered = interviews.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <h2>Manage Interviews</h2>

      <SearchBar value={search} onChange={setSearch} />

      <InterviewTable interviews={filtered} refresh={fetchInterviews} />

    </div>
  );
}

export default ManageInterview;