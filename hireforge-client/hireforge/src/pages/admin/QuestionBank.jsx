import { useEffect, useState } from "react";
import { createQuestion, getQuestions, deleteQuestion } from "../../services/questionService";

function QuestionBank() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    questionText: "",
    type: "MCQ",
    difficulty: "Easy",
    topic: "",
    options: ["", "", "", ""],
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm({ ...form, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createQuestion(form);
    fetchQuestions();
  };

  const handleDelete = async (id) => {
    await deleteQuestion(id);
    fetchQuestions();
  };

  return (
    <div>
      <h2>Question Bank</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input name="questionText" placeholder="Question" onChange={handleChange} />
        
        <select name="type" onChange={handleChange}>
          <option>MCQ</option>
          <option>Coding</option>
          <option>Subjective</option>
        </select>

        <select name="difficulty" onChange={handleChange}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input name="topic" placeholder="Topic" onChange={handleChange} />

        {/* MCQ OPTIONS */}
        {form.type === "MCQ" &&
          form.options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
            />
          ))}

        <button type="submit">Create Question</button>
      </form>

      <hr />

      {/* LIST */}
      {questions.map((q) => (
        <div key={q._id}>
          <p>{q.questionText} ({q.type})</p>
          <button onClick={() => handleDelete(q._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default QuestionBank;