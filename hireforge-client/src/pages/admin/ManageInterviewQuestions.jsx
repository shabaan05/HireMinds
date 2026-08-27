import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../../services/questionService";
import { attachQuestions } from "../../services/interviewService";

import QuestionTable from "../../components/admin/ManageInterviewQuestions/QuestionTable";
import FilterDropdown from "../../components/admin/ManageInterviewQuestions/FilterDropdown";

function ManageInterviewQuestions() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("");

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);


  

 const handleAttach = async () => {
  if (selected.length === 0) {
    toast({
  title: "Select at least one question"
});
    return;
  }

  try {
    setLoading(true); 

await attachQuestions(id, selected);

    navigate(`/admin/interviews/${id}/manage`);
  } catch (err) {
    console.error("ERROR:", err);
  }finally {
    setLoading(false); 
  }
};

return questions.length === 0 ? (
  <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">

    <div className="bg-white rounded-2xl shadow-sm border p-8 text-center space-y-4 max-w-md">

      <h2 className="text-xl font-semibold text-gray-800">
        No Questions Available
      </h2>

      <p className="text-gray-500 text-sm">
        Please add questions from the Question Bank to continue.
      </p>

      <button
        onClick={() => navigate("/admin/questions")}
        className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
      >
        + Go to Question Bank
      </button>

    </div>

  </div>
) : (
  <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

    {/* HEADER */}
    <div>
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Select Questions
      </h2>
      <p className="text-gray-500 mt-1">
        Choose questions to attach to this interview
      </p>
    </div>

    {/* FILTER */}
    <div className="bg-white rounded-2xl shadow-sm border p-4">
      <FilterDropdown filterType={filterType} onFilterChange={setFilterType} />
    </div>

    {/* TABLE */}
    <div className="bg-white rounded-2xl shadow-sm border p-4 hover:shadow-md transition">
      <QuestionTable
        questions={filterType ? questions.filter((q) => q.type === filterType) : questions}
        selected={selected}
        onSelect={(id) =>
          setSelected((prev) =>
            prev.includes(id)
              ? prev.filter((q) => q !== id)
              : [...prev, id]
          )
        }
      />
    </div>

    {/* ACTION BUTTON */}
    <div className="flex justify-end">
      <button
        onClick={handleAttach}
        disabled={loading}
        className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Selected Questions"}
      </button>
    </div>

  </div>
);
}

export default ManageInterviewQuestions;