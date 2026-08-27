import { useNavigate } from "react-router-dom";

function WelcomeCard({ name }) {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-gray-900 to-gray-900/50">
      {/* Decorative gradient blob */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-7 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="space-y-1">
          <p className="text-sm text-gray-400">{greeting}</p>
          <h2 className="text-2xl font-bold text-white">
            {name}
            <span className="ml-2 text-2xl">👋</span>
          </h2>
          <p className="text-sm text-gray-500 pt-0.5">
            Track your progress, review attempts, and keep improving.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate("/user/interviews")}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                       bg-gradient-to-r from-blue-500 to-purple-600
                       hover:from-blue-400 hover:to-purple-500
                       transition-all duration-150 shadow-lg shadow-blue-500/20 whitespace-nowrap"
          >
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
