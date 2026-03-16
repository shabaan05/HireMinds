import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuestions } from "../../services/questionService";
import { attachQuestions } from "../../services/interviewService";

import QuestionTable from "../../components/admin/ManageInterviewQuestions/QuestionTable";
import FilterDropdown from "../../components/admin/ManageInterviewQuestions/FilterDropdown";

function ManageInterviewQuestions() {

  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState([]);

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAttach = async () => {

    await attachQuestions(id, selected);

    alert("Questions added to interview");

  };

  return (
    <div>

      <h2>Select Questions</h2>

      <FilterDropdown />

      <QuestionTable
        questions={questions}
        selected={selected}
        setSelected={setSelected}
      />

      <button onClick={handleAttach}>
        Add Selected Questions
      </button>

    </div>
  );
}

export default ManageInterviewQuestions;