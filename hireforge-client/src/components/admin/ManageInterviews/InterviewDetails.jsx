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
  <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">

    {!isEditing ? (
      <>
        {/* VIEW MODE */}

        <div className="space-y-3 text-sm">

          <p>
            <span className="font-medium text-gray-700">Title:</span>{" "}
            <span className="text-gray-800">{interview.title}</span>
          </p>

          <p>
            <span className="font-medium text-gray-700">Description:</span>{" "}
            <span className="text-gray-600">{interview.description}</span>
          </p>

          <p>
            <span className="font-medium text-gray-700">Duration:</span>{" "}
            <span className="text-gray-800">{interview.duration} min</span>
          </p>

          <p>
            <span className="font-medium text-gray-700">Experience:</span>{" "}
            <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-600 font-medium">
              {interview.experienceLevel}
            </span>
          </p>

        </div>

        {/* EDIT BUTTON */}
        <div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
          >
            Edit
          </button>
        </div>
      </>
    ) : (
      <>
        {/* EDIT MODE */}

        <div className="grid gap-4">

          {/* TITLE */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* DESCRIPTION */}
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* DURATION */}
          <input
            name="duration"
            type="number"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* EXPERIENCE */}
          <select
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 pt-2">

          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Save
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>

        </div>
      </>
    )}

  </div>
);
}

export default InterviewDetails;