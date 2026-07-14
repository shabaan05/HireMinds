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

    
const normalize = (str) =>
  (str || "")
    .toString()
    .trim()
    .replace(/\r/g, "")        // remove \r
    .replace(/\n/g, "")        // remove \n
    .replace(/\s+/g, " ");     // normalize spaces

const actual = normalize(result.output);
const expected = normalize(expectedOutput);

console.log("EXPECTED:", expected);
console.log("ACTUAL:", actual);

const isPassed = actual === expected;

    if (isPassed) passedCount++;

  
    results.push({
  input,
  expected,
  actual,
  passed: isPassed,
});
  }

  // Final status
  const status =
    passedCount === testCases.length ? "accepted" : "wrong_answer";

  // Simple scoring
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

// CODING (MAIN FIX)
//   if (question.type === "coding") {
//   const allTestCases = [
//     ...(question.sampleTestCases || []),
//     ...(question.hiddenTestCases || []),
//   ];

//   const result = await evaluateCode({
//     code: ans.codeSubmitted,
//     language: "javascript",
//     testCases: allTestCases,
//     totalMarks: question.marks,
//   });

//   ans.isCorrect = result.status === "accepted";
//   ans.obtainedMarks = result.obtainedMarks;
//   ans.results = result.results;

//   totalScore += result.obtainedMarks || 0;
// }
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