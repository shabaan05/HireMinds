import { useState } from "react";
import { createQuestion } from "../../../services/questionService";
import MCQOptions from "./MCQOptions";

function QuestionForm({ onSuccess }) {
  const [form, setForm] = useState({
    questionText: "",
    type: "MCQ",
    difficulty: "Easy",
    topic: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    if (!form.questionText.trim()) {
      err.questionText = "Question is required";
    }

    if (form.type === "MCQ") {
      if (form.options.some((opt) => !opt.trim())) {
        err.options = "All options are required";
      }
      if (!form.correctAnswer) {
        err.correctAnswer = "Select correct answer";
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await createQuestion(form);

    setForm({
      questionText: "",
      type: "MCQ",
      difficulty: "Easy",
      topic: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="questionText"
        placeholder="Enter question"
        value={form.questionText}
        onChange={handleChange}
      />
      {errors.questionText && <p style={{ color: "red" }}>{errors.questionText}</p>}

      <select name="type" value={form.type} onChange={handleChange}>
        <option>MCQ</option>
        <option>Coding</option>
        <option>Subjective</option>
      </select>

      <select name="difficulty" value={form.difficulty} onChange={handleChange}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <input
        name="topic"
        placeholder="Topic"
        value={form.topic}
        onChange={handleChange}
      />

      {form.type === "MCQ" && (
        <MCQOptions form={form} setForm={setForm} errors={errors} />
      )}

      <button type="submit">Create Question</button>
    </form>
  );
}

export default QuestionForm;