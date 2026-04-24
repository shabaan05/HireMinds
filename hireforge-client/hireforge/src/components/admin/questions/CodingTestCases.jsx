import React from "react";

const CodingTestcases = ({ form, setForm, errors }) => {
  // ✅ Add Test Case
  const addTestCase = (type) => {
    if (!form) return null;

    setForm((prev) => ({
      ...prev,
      [`${type}TestCases`]: [
        ...(prev[`${type}TestCases`] || []),
        { input: "", output: "" },
      ],
    }));
  };

  // ✅ Handle Change
  const handleChange = (type, index, field, value) => {
    const updated = [...(form[`${type}TestCases`] || [])];
    updated[index][field] = value;

    setForm((prev) => ({
      ...prev,
      [`${type}TestCases`]: updated,
    }));
  };

  // ✅ Remove Test Case
  const removeTestCase = (type, index) => {
    const updated = (form[`${type}TestCases`] || []).filter(
      (_, i) => i !== index
    );

    setForm((prev) => ({
      ...prev,
      [`${type}TestCases`]: updated,
    }));
  };

  return (
    <div className="mt-4">
      {/* 🔹 SAMPLE TEST CASES */}
      <h3 className="font-semibold mb-2">Sample Test Cases</h3>

      {(form.sampleTestCases || []).map((tc, i) => (
        <div key={i} className="mb-3 border p-2 rounded bg-gray-50">
          <textarea
            placeholder="Input (e.g. 3 4)"
            value={tc?.input || ""}
            onChange={(e) =>
              handleChange("sample", i, "input", e.target.value)
            }
            className="w-full border p-2 rounded mb-2"
            rows={2}
          />

          <textarea
            placeholder="Expected Output (e.g. 7)"
            // value={tc.output}
            value={tc?.output || ""}
            onChange={(e) =>
              handleChange("sample", i, "output", e.target.value)
            }
            className="w-full border p-2 rounded mb-2"
            rows={2}
          />

          <button
            type="button"
            onClick={() => removeTestCase("sample", i)}
            className="text-red-500 text-sm"
          >
            ❌ Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => addTestCase("sample")}
        className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
      >
        + Add Sample Test Case
      </button>

      <hr className="my-4" />

      {/* 🔹 HIDDEN TEST CASES */}
      <h3 className="font-semibold mb-2">Hidden Test Cases</h3>

      {(form.hiddenTestCases || []).map((tc, i) => (
        <div key={i} className="mb-3 border p-2 rounded bg-gray-50">
          <textarea
            placeholder="Input"
            value={tc.input}
            onChange={(e) =>
              handleChange("hidden", i, "input", e.target.value)
            }
            className="w-full border p-2 rounded mb-2"
            rows={2}
          />

          <textarea
            placeholder="Expected Output"
            value={tc.output}
            onChange={(e) =>
              handleChange("hidden", i, "output", e.target.value)
            }
            className="w-full border p-2 rounded mb-2"
            rows={2}
          />

          <button
            type="button"
            onClick={() => removeTestCase("hidden", i)}
            className="text-red-500 text-sm"
          >
            ❌ Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => addTestCase("hidden")}
        className="bg-purple-500 text-white px-3 py-1 rounded"
      >
        + Add Hidden Test Case
      </button>

      {errors?.testCases && (
        <p className="text-red-500 mt-2">{errors.testCases}</p>
      )}
    </div>
  );
};

export default CodingTestcases;