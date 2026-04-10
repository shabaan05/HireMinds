function CodingTestCases({ form, setForm, errors }) {
  const addTestCase = () => {
    setForm({
      ...form,
      testCases: [...form.testCases, { input: "", expectedOutput: "" }],
    });
  };

  const handleChange = (index, field, value) => {
    const updated = [...form.testCases];
    updated[index][field] = value;
    setForm({ ...form, testCases: updated });
  };

  return (
    <div>
      <h4>Test Cases</h4>

      {form.testCases.map((tc, i) => (
        <div key={i}>
          <input
            placeholder="Input"
            value={tc.input}
            onChange={(e) => handleChange(i, "input", e.target.value)}
          />
          <input
            placeholder="Expected Output"
            value={tc.expectedOutput}
            onChange={(e) =>
              handleChange(i, "expectedOutput", e.target.value)
            }
          />
        </div>
      ))}

      <button type="button" onClick={addTestCase}>
        + Add Test Case
      </button>

      {errors.testCases && <p style={{ color: "red" }}>{errors.testCases}</p>}
    </div>
  );
}

export default CodingTestCases;