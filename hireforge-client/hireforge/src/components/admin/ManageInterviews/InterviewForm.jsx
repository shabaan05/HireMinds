import { useState } from "react";
import { updateInterview } from "../../../services/interviewService";

function InterviewForm({ interview, onRefresh }) {
  const [form, setForm] = useState({
    title: interview.title,
    description: interview.description,
    duration: interview.duration,
    experienceLevel: interview.experienceLevel,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateInterview(interview._id, {
      ...form,
      duration: Number(form.duration),
    });

    onRefresh();
  };

  return (
    <form onSubmit={handleUpdate}>
      <input name="title" value={form.title} onChange={handleChange} />

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="duration"
        type="number"
        value={form.duration}
        onChange={handleChange}
      />

      <select
        name="experienceLevel"
        value={form.experienceLevel}
        onChange={handleChange}
      >
        <option value="Junior">Junior</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </select>

      <button type="submit">Update Interview</button>
    </form>
  );
}

export default InterviewForm;