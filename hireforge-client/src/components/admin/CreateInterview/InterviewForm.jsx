import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../../hooks/useForm";
import { createInterview } from "../../../services/interviewService";

import Input from "./Input";
import Textarea from "./Textarea";
// import Button from "./Button";
import Button from "./Button"
function InterviewForm() {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);//added
  const { values, handleChange, resetForm } = useForm({
    title: "",
    description: "",
    duration: "",
    experienceLevel: "Junior"
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    let newErrors = {};

    if (!values.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!values.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!values.duration || values.duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
  setLoading(true);

  const res = await createInterview({
  ...values,
  duration: Number(values.duration) 
});
      const interviewId = res.data._id;

      resetForm();

      navigate(`/admin/interviews/${interviewId}/questions`);

    } catch (err) {
        toast({
      title: "Error",
      description: "Something went wrong",
      variant: "destructive"
    });

  }finally {
  setLoading(false);
}
  }

  return (
  <form onSubmit={handleSubmit} className="space-y-6">

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Title
      </label>

      <Input
        name="title"
        value={values.title}
        onChange={handleChange}
        placeholder="Enter interview title"
        className="w-full"
      />

      {errors.title && (
        <p className="text-red-500 text-xs">{errors.title}</p>
      )}
    </div>

    {/* DESCRIPTION */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Description
      </label>

      <Textarea
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Enter description"
        className="w-full"
      />

      {errors.description && (
        <p className="text-red-500 text-xs">{errors.description}</p>
      )}
    </div>

    {/* DURATION */}
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Duration (minutes)
      </label>

      <Input
        name="duration"
        value={values.duration}
        onChange={handleChange}
        placeholder="e.g. 30"
        className="w-full"
      />

      {errors.duration && (
        <p className="text-red-500 text-xs">{errors.duration}</p>
      )}
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Experience Level
      </label>

      <select
        name="experienceLevel"
        value={values.experienceLevel}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Junior">Junior</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </select>
    </div>

    {/* SUBMIT BUTTON */}
    <div className="pt-2">
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 rounded-lg hover:opacity-90 transition"
      >
        {loading ? "Creating..." : "Create Interview"}
      </Button>
      

    </div>

  </form>
);
}
export default InterviewForm;