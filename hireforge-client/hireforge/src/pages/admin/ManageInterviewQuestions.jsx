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

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data); // ✅ FIX
  };

  useEffect(() => {
    fetchQuestions();
  }, []);


  const handleAttach = async () => {
    if (selected.length === 0) {
      alert("Select at least one question");
      return;
    }

    await attachQuestions(id, { questionIds: selected });

    alert("Questions added");
    navigate("/admin/interviews");
  };


return questions.length === 0 ? (
 <div>
        <p>No questions available. Please add from Question Bank.</p>

        <button onClick={() => navigate("/admin/questions")}>
          + Go to Question Bank
        </button>
      </div>
) : (
  <div>
    <h2>Select Questions</h2>

    <FilterDropdown />

    <QuestionTable
      questions={questions}
      selected={selected}
      onSelect={(id) =>
        setSelected((prev) =>
          prev.includes(id)
            ? prev.filter((q) => q !== id)
            : [...prev, id]
        )
      }
    />

    <button onClick={handleAttach}>
      Add Selected Questions
    </button>
  </div>
);
}

export default ManageInterviewQuestions;