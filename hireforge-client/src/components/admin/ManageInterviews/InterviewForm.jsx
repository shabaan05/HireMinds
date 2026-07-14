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
  <form onSubmit={handleUpdate} className="space-y-6">

    {/* TITLE */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Title
      </label>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Enter title"
        className="w-full border rounded-lg px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* DESCRIPTION */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Description
      </label>

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Enter description"
        className="w-full border rounded-lg px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* DURATION */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Duration (minutes)
      </label>

      <input
        name="duration"
        type="number"
        value={form.duration}
        onChange={handleChange}
        placeholder="e.g. 30"
        className="w-full border rounded-lg px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* EXPERIENCE LEVEL */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Experience Level
      </label>

      <select
        name="experienceLevel"
        value={form.experienceLevel}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Junior">Junior</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </select>
    </div>

    {/* SUBMIT BUTTON */}
    <div className="pt-2">
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium 
                   bg-gradient-to-r from-blue-600 to-indigo-600 
                   text-white rounded-lg hover:opacity-90 transition"
      >
        Update Interview
      </button>
    </div>

  </form>
);
}

export default InterviewForm;