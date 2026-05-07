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
  <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-2xl shadow-sm border">

    {/* HEADER */}
    <div>
      <h2 className="text-2xl font-bold text-gray-800">
        Create Question
      </h2>
      <p className="text-gray-500 text-sm">
        Add a new question to the question bank
      </p>
    </div>

    {/* QUESTION */}
    <FormField
      label="Question"
      name="questionText"
      value={form.questionText}
      onChange={handleChange}
      error={errors.questionText}
    />

    {/* TYPE + DIFFICULTY (GRID) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* TYPE */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="mcq">MCQ</option>
          <option value="coding">Coding</option>
          <option value="subjective">Subjective</option>
        </select>
      </div>

      {/* DIFFICULTY */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Difficulty</label>
        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

    </div>

    {/* MARKS + TOPIC */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <FormField
        label="Marks"
        name="marks"
        type="number"
        value={form.marks}
        onChange={handleChange}
        error={errors.marks}
      />

      <FormField
        label="Topic"
        name="topic"
        value={form.topic}
        onChange={handleChange}
      />

    </div>

    {/* MCQ */}
    {form.type === "mcq" && (
      <div className="bg-gray-50 rounded-xl p-4 border">
        <MCQOptions form={form} setForm={setForm} errors={errors} />
      </div>
    )}

    {/* CODING */}
    {form.type === "coding" && (
      <div className="bg-gray-50 rounded-xl p-4 border">
        <CodingTestCases form={form} setForm={setForm} errors={errors} />
      </div>
    )}

    {/* SUBMIT */}
    <div className="pt-2">
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Question"}
      </button>
    </div>

  </form>
);    
  }

  export default QuestionForm;