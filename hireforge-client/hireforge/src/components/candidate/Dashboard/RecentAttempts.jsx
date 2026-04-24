import AttemptItem from "./AttemptItem";

function RecentAttempts({ attempts = [] }) {

  const recentAttempts = attempts.slice(0, 5);

  return (
    <div className="bg-white shadow rounded-lg p-4">

      <h3 className="text-lg font-semibold mb-3">Recent Attempts</h3>

      {recentAttempts.length === 0 ? (
        <p className="text-gray-500">No attempts found</p>
      ) : (
        <div className="space-y-2">
          {recentAttempts.map((attempt) => (
            <AttemptItem key={attempt._id} attempt={attempt} />
          ))}
        </div>
      )}

    </div>
  );
}

export default RecentAttempts;