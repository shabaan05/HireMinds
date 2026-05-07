import AttemptItem from "./AttemptItem";

function RecentAttempts({ attempts = [] }) {

  const recentAttempts = attempts.slice(0, 5);

return (
  <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl p-5">

    <h3 className="text-lg font-semibold text-white mb-4">
      Recent Attempts
    </h3>

    {recentAttempts.length === 0 ? (
      <p className="text-gray-400 text-sm">
        No attempts found
      </p>
    ) : (
      <div className="space-y-3">
        {recentAttempts.map((attempt) => (
          <div
            key={attempt._id}
            className="bg-gradient-to-r from-gray-800 to-gray-900 
                       border border-gray-700 rounded-xl p-4 
                       hover:border-blue-500 
                       hover:shadow-[0_0_10px_rgba(59,130,246,0.25)] 
                       transition cursor-pointer"
          >
            <AttemptItem attempt={attempt} />
          </div>
        ))}
      </div>
    )}

  </div>
);
}

export default RecentAttempts;