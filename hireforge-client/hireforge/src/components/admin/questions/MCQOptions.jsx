function MCQOptions({ form, setForm, errors }) {
  const handleOptionChange = (index, value) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm({ ...form, options: newOptions });
  };

  return (
    <div>
      {form.options.map((opt, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
        />
      ))}

      {errors.options && <p style={{ color: "red" }}>{errors.options}</p>}

      <select
        value={form.correctAnswer}
        onChange={(e) =>
          setForm({ ...form, correctAnswer: e.target.value })
        }
      >
        <option value="">Select Correct Answer</option>
        {form.options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt || `Option ${i + 1}`}
          </option>
        ))}
      </select>

      {errors.correctAnswer && (
        <p style={{ color: "red" }}>{errors.correctAnswer}</p>
      )}
    </div>
  );
}

export default MCQOptions;