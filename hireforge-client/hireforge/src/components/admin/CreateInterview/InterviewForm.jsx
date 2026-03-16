import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../../hooks/useForm";
import { createInterview } from "../../../services/interviewService";

import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";

function InterviewForm() {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

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

      const res = await createInterview(values);

      const interviewId = res.data._id;

      resetForm();

      navigate(`/admin/interviews/${interviewId}/questions`);

    } catch (err) {
      console.error("Error creating interview", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <Input
        label="Title"
        name="title"
        value={values.title}
        onChange={handleChange}
      />

      {errors.title && (
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.title}
        </p>
      )}

      <Textarea
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange}
      />

      {errors.description && (
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.description}
        </p>
      )}

      <Input
        label="Duration (minutes)"
        name="duration"
        value={values.duration}
        onChange={handleChange}
      />

      {errors.duration && (
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.duration}
        </p>
      )}

      <div>

        <label>Experience Level</label>

        <select
          name="experienceLevel"
          value={values.experienceLevel}
          onChange={handleChange}
        >
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

      </div>

      <Button type="submit">
        Create Interview
      </Button>

    </form>
  );
}

export default InterviewForm;