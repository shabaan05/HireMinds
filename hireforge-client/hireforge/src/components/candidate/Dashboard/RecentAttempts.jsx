import AttemptItem from "./AttemptItem";

function RecentAttempts() {

  const attempts = [
    { id: 1, interview: "React Interview", score: "8/10" },
    { id: 2, interview: "JavaScript Interview", score: "7/10" }
  ];

  return (
    <div>

      <h3>Recent Attempts</h3>

      {attempts.map((attempt) => (
        <AttemptItem key={attempt.id} attempt={attempt} />
      ))}

    </div>
  );
}

export default RecentAttempts;