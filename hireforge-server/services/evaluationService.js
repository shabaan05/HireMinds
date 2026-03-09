const { evaluateSubjective } = require("./aiService");

async function evaluateInterview(attempt) {

  let totalScore = 0;
  let correctMCQ = 0;
  let totalMCQ = 0;

  for (let answer of attempt.answers) {

    const question = answer.questionId;

    // MCQ
    if (question.type === "mcq") {
      totalMCQ++;

      if (answer.selectedAnswer === question.correctAnswer) {
        answer.isCorrect = true;
        answer.obtainedMarks = question.marks;
        totalScore += question.marks;
        correctMCQ++;
      }
    }

    // Coding
    if (question.type === "coding") {

      let passed = 0;

      for (let testCase of question.testCases) {

        try {
            //later improve 
          const func = new Function("input", answer.codeSubmitted);
          const output = func(testCase.input);

          if (String(output).trim() === testCase.expectedOutput.trim()) {
            passed++;
          }

        } catch (err) {}
      }

      const marks =
        (passed / question.testCases.length) * question.marks;

      answer.obtainedMarks = marks;
      totalScore += marks;
    }

    // Subjective
    if (question.type === "subjective") {

      const aiScore = await evaluateSubjective(
        question.questionText,
        answer.subjectiveAnswer,
        question.marks
      );

      answer.obtainedMarks = aiScore;
      totalScore += aiScore;
    }
  }

  const accuracy = totalMCQ
    ? (correctMCQ / totalMCQ) * 100
    : 0;

  return {
    score: totalScore,
    accuracy
  };
}

module.exports = { evaluateInterview };