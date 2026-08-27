const evaluateMCQ = (answer, question) => {
  const isCorrect =
    answer.selectedAnswer === question.correctAnswer;

  return {
    isCorrect,
    obtainedMarks: isCorrect ? 1 : 0,
    totalMarks: 1,
  };
};

module.exports = {
  evaluateMCQ,
};