const { executeCode } = require("./codeExecutionService");

const evaluateCode = async ({ code, language, testCases, totalMarks }) => {
  let passedCount = 0;
  let results = [];

  console.log("===== CODE EVALUATION =====");
  console.log("Language:", language);
  console.log("Total marks:", totalMarks);
  console.log("Test cases count:", testCases.length);
  console.log("Code:\n", code);

  for (let testCase of testCases) {
    const { input, output: expectedOutput } = testCase;

    console.log("--- Running test case ---");
    console.log("Input:", JSON.stringify(input));
    console.log("Expected output:", JSON.stringify(expectedOutput));

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

    
const normalize = (str) =>
  (str || "")
    .toString()
    .trim()
    .replace(/\r/g, "")        // remove \r
    .replace(/\n/g, "")        // remove \n
    .replace(/\s+/g, " ");     // normalize spaces

const actual = normalize(result.output);
const expected = normalize(expectedOutput);



const isPassed = actual === expected;

    if (isPassed) passedCount++;

  
    results.push({
  input,
  expected,
  actual,
  passed: isPassed,
});
  }

  // Final status — treat 0 test cases as a data problem, not "accepted"
  const status =
    testCases.length === 0
      ? "no_test_cases"
      : passedCount === testCases.length
      ? "accepted"
      : "wrong_answer";

  const obtainedMarks =
    testCases.length > 0
      ? (passedCount / testCases.length) * totalMarks
      : 0;

  return {
    status,
    passedCount,
    totalCount: testCases.length,
    results,
    obtainedMarks,
    error: null,
  };
};
//..

const evaluateInterview = async (attempt) => {
  let totalScore = 0;
  let totalMarks = 0;

  for (let ans of attempt.answers) {
    const question = ans.questionId;

    if (!question) continue;

    totalMarks += question.marks;

    //  MCQ
    if (question.type === "mcq") {
      if (ans.selectedAnswer === question.correctAnswer) {
        ans.isCorrect = true;
        ans.obtainedMarks = question.marks;
        totalScore += question.marks;
      } else {
        ans.isCorrect = false;
        ans.obtainedMarks = 0;
      }
    }


if (question.type === "coding") {
  const result = await evaluateCode({
    code: ans.codeSubmitted,
    language: "javascript",
    testCases: [
      ...(question.sampleTestCases || []),
      ...(question.hiddenTestCases || []),
    ],
    totalMarks: question.marks,
  });

  ans.isCorrect = result.status === "accepted";
  ans.obtainedMarks = result.obtainedMarks;
  ans.results = result.results;

  totalScore += result.obtainedMarks || 0;
}
  }

  const accuracy =
    totalMarks > 0 ? (totalScore / totalMarks) * 100 : 0;

  return {
    score: totalScore,
    totalMarks,
    accuracy,
    answers: attempt.answers,
  };
};


module.exports = {
  evaluateCode,evaluateInterview
};