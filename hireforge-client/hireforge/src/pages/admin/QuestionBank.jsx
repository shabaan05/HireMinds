import { useState } from "react";
import MCQOptions from "../../components/admin/questions/MCQOptions";
import CodingTestCases from "../../components/admin/questions/CodingTestCases";
import { createQuestion } from "../../services/questionService";
import { useCallback } from "react";
import { useToast } from "../../components/ui/use-toast";
import FormField from "../../components/admin/questions/FormField"; 

function QuestionForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const initialForm = {
  questionText: "",
  type: "mcq",
  difficulty: "easy",
  topic: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  sampleTestCases: [],
  hiddenTestCases: [],
  marks: 1,
};

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

const handleChange = useCallback((e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);

    await createQuestion(form);

    toast({
      title: "Success",
      description: "Question created successfully",
    });

    setForm(initialForm); 

    onSuccess && onSuccess(); 

  } catch (err) {
    console.error(err);
    toast({
      title: "Error",
      description: err?.response?.data?.message || "Failed to create question",
      variant: "destructive",
    });

  } finally {
    setLoading(false);
  }
};


const validate = () => {
  const err = {};

  if (!form.questionText.trim()) {
    err.questionText = "Question is required";
  }

  if (form.marks < 1) {
    err.marks = "Marks must be at least 1";
  }

  if (form.type === "mcq") {
    if (form.options.some((opt) => !opt.trim())) {
      err.options = "All options are required";
    }

    if (!form.correctAnswer) {
      err.correctAnswer = "Select correct answer";
    }
  }

  if (form.type === "coding") {
    if (!form.sampleTestCases.length || !form.hiddenTestCases.length) {
      err.testCases = "Add test cases";
    }
  }

  setErrors(err);

  return Object.keys(err).length === 0;
};

    return (
  <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">

    {/* QUESTION */}
    <FormField
      label="Question"
      name="questionText"
      value={form.questionText}
      onChange={handleChange}
      error={errors.questionText}
    />

    {/* TYPE */}
    <div>
      <label className="block text-sm font-medium mb-1">Type</label>
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
      >
        <option value="mcq">MCQ</option>
        <option value="coding">Coding</option>
        <option value="subjective">Subjective</option>
      </select>
    </div>

    {/* DIFFICULTY */}
    <div>
      <label className="block text-sm font-medium mb-1">Difficulty</label>
      <select
        name="difficulty"
        value={form.difficulty}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>

    {/* MARKS */}
    <FormField
      label="Marks"
      name="marks"
      type="number"
      value={form.marks}
      onChange={handleChange}
      error={errors.marks}
    />

    {/* TOPIC */}
    <FormField
      label="Topic"
      name="topic"
      value={form.topic}
      onChange={handleChange}
    />

    {/* MCQ */}
    {form.type === "mcq" && (
      <MCQOptions form={form} setForm={setForm} errors={errors} />
    )}

    {/* CODING */}
    {form.type === "coding" && (
      <CodingTestCases form={form} setForm={setForm} errors={errors} />
    )}

    {/* SUBMIT BUTTON */}
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
    >
      {loading ? "Creating..." : "Create Question"}
    </button>

  </form>
);
    
  }

  export default QuestionForm;