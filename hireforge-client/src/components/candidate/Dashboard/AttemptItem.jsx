import { useNavigate } from "react-router-dom";

function AttemptItem({ attempt }) {
  const navigate = useNavigate();

  const title = attempt.interviewId?.title || "Untitled Interview";
  const score = attempt.score ?? 0;
  const totalMarks = attempt.totalMarks > 0 ? attempt.totalMarks : null;
  const pct = totalMarks ? Math.round((score / totalMarks) * 100) : null;
  const totalQ = attempt.answers?.length ?? 0;
  const status = attempt.status || "evaluated";

  const date = attempt.completedAt
    ? new Date(attempt.completedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const statusMap = {
    evaluated: { label: "Evaluated", cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    submitted: { label: "Submitted", cls: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
    "in-progress": { label: "In Progress", cls: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  };
  const statusInfo = statusMap[status] || statusMap.evaluated;

  const pctColor =
    pct === null ? "" :
    pct >= 70 ? "text-emerald-400" :
    pct >= 40 ? "text-yellow-400" : "text-red-400";

  const barColor =
    pct === null ? "" :
    pct >= 70 ? "bg-emerald-500" :
    pct >= 40 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div
      className="group bg-gray-900 border border-white/5 rounded-xl px-5 py-4
                 hover:border-white/10 hover:bg-gray-900/80
                 transition-all duration-150"
    >
      <div className="flex items-center gap-4">

        {/* Score ring / circle */}
        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                         text-sm font-bold border
                         ${pct !== null
                           ? pct >= 70 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                             : pct >= 40 ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                             : "bg-red-500/10 border-red-500/20 text-red-400"
                           : "bg-gray-800 border-gray-700 text-gray-500"
                         }`}>
          {pct !== null ? `${pct}%` : "—"}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-sm text-gray-100 truncate">{title}</p>
            <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${statusInfo.cls}`}>
              {statusInfo.label}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>
              Score:{" "}
              <span className="text-gray-300 font-medium">
                {score}{totalMarks ? ` / ${totalMarks}` : ""}
              </span>
            </span>
            {totalQ > 0 && <span>· {totalQ}Q</span>}
            {date && <span>· {date}</span>}
          </div>

          {/* Progress bar */}
          {pct !== null && (
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${barColor} opacity-70`}
                style={{ width: `${pct}%`, transition: "width 0.4s ease" }}
              />
            </div>
          )}
        </div>

        {/* View button */}
        <button
          type="button"
          onClick={() => navigate(`/user/attempts/${attempt._id}`)}
          className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg
                     border border-white/10 text-gray-400
                     hover:border-blue-500/40 hover:text-blue-400 hover:bg-blue-500/5
                     transition-all duration-150"
        >
          View →
        </button>

      </div>
    </div>
  );
}

export default AttemptItem;
