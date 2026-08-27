import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestions, deleteQuestion } from "../../services/questionService";

function QuestionBank() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [filterType, setFilterType] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [filterTopic, setFilterTopic] = useState("");

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await getQuestions();
      setQuestions(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Apply filters whenever filter state or questions change
  useEffect(() => {
    let result = questions;
    if (filterType) result = result.filter((q) => q.type === filterType);
    if (filterDifficulty) result = result.filter((q) => q.difficulty === filterDifficulty);
    if (filterTopic) result = result.filter((q) =>
      q.topic?.toLowerCase().includes(filterTopic.toLowerCase())
    );
    setFiltered(result);
  }, [filterType, filterDifficulty, filterTopic, questions]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    await deleteQuestion(id);
    fetchQuestions();
  };

  const clearFilters = () => {
    setFilterType("");
    setFilterDifficulty("");
    setFilterTopic("");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Question Bank
          </h2>
          <p className="text-gray-500 mt-1">Manage all questions</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/questions/create")}
          className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-90 transition"
        >
          + Create Question
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-2xl shadow-sm border p-4 flex flex-wrap gap-4 items-end">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All Types</option>
            <option value="mcq">MCQ</option>
            <option value="coding">Coding</option>
            <option value="subjective">Subjective</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Difficulty</label>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Topic</label>
          <input
            type="text"
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            placeholder="Search topic..."
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {(filterType || filterDifficulty || filterTopic) && (
          <button
            type="button"
            onClick={clearFilters}
            className="px-3 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50 transition"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading questions...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No questions found.{" "}
            <button
              type="button"
              onClick={() => navigate("/admin/questions/create")}
              className="text-blue-600 hover:underline"
            >
              Create one
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Question</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Difficulty</th>
                <th className="px-4 py-3 text-left">Topic</th>
                <th className="px-4 py-3 text-left">Marks</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((q) => (
                <tr key={q._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">
                    {q.questionText}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600 font-medium">
                      {q.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded font-medium ${
                      q.difficulty === "easy"
                        ? "bg-green-100 text-green-600"
                        : q.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{q.topic}</td>
                  <td className="px-4 py-3 text-gray-600">{q.marks}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(q._id)}
                      className="text-red-500 hover:underline text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default QuestionBank;
