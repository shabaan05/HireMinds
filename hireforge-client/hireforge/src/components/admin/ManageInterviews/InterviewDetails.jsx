import { useState, useEffect } from "react";
import { updateInterview } from "../../../services/interviewService";

function InterviewDetails({ interview, onRefresh }) {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    experienceLevel: "",
  });

  useEffect(() => {
    if (interview) {
      setForm({
        title: interview.title,
        description: interview.description,
        duration: interview.duration,
        experienceLevel: interview.experienceLevel,
      });
    }
  }, [interview]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateInterview(interview._id, {
      ...form,
      duration: Number(form.duration),
    });

    setIsEditing(false);
    onRefresh();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      {!isEditing ? (
        <>
          <p><strong>Title:</strong> {interview.title}</p>
          <p><strong>Description:</strong> {interview.description}</p>
          <p><strong>Duration:</strong> {interview.duration} min</p>
          <p><strong>Experience:</strong> {interview.experienceLevel}</p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      ) : (
        <>
          <input name="title" value={form.title} onChange={handleChange} />
          <input name="description" value={form.description} onChange={handleChange} />
          <input name="duration" type="number" value={form.duration} onChange={handleChange} />

          <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange}>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default InterviewDetails;