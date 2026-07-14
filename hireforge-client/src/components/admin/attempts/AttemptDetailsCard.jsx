function AttemptDetailsCard({ attempt }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <p><strong>User:</strong> {attempt.userId?.name}</p>
      <p><strong>Email:</strong> {attempt.userId?.email}</p>
      <p><strong>Interview:</strong> {attempt.interviewId?.title}</p>
      <p><strong>Score:</strong> {attempt.score}</p>
      <p><strong>Accuracy:</strong> {attempt.accuracy}%</p>

      <h3>Answers</h3>

      {attempt.answers?.map((ans, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <p><strong>Q:</strong> {ans.questionId?.questionText}</p>
          <p><strong>Your Answer:</strong> {ans.userAnswer}</p>
          <p>
            <strong>Result:</strong>{" "}
            {ans.isCorrect ? "✅ Correct" : "❌ Wrong"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AttemptDetailsCard;