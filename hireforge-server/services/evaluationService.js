const { executeCode } = require("./codeExecutionService");

const evaluateCode = async ({ code, language, testCases, totalMarks }) => {
  let passedCount = 0;
  let results = [];

  for (let testCase of testCases) {
    const { input, output: expectedOutput } = testCase;

    const result = await executeCode({
      code,
      language,
      input,
    });

    // If runtime/compile error → stop immediately
    if (result.error) {
      return {
        status: "runtime_error",
        passedCount,
        totalCount: testCases.length,
        results,
        obtainedMarks: 0,
        error: result.error,
      };
    }

    const actualOutput = result.output?.trim();
    const expected = expectedOutput.trim();

    const isPassed = actualOutput === expected;

    if (isPassed) passedCount++;

    results.push({
      input,
      expected,
      actual: actualOutput,
      passed: isPassed,
    });
  }

  // Final status
  const status =
    passedCount === testCases.length ? "accepted" : "wrong_answer";

  // Simple scoring
  const obtainedMarks =
    (passedCount / testCases.length) * totalMarks;

  return {
    status,
    passedCount,
    totalCount: testCases.length,
    results,
    obtainedMarks,
    error: null,
  };
};

module.exports = {
  evaluateCode,
};