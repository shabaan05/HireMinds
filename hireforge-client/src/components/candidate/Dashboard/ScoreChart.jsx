import { useRef, useEffect, useState } from "react";

function ScoreChart({ attempts = [] }) {
  const containerRef = useRef(null);
  const [containerW, setContainerW] = useState(500);

  // Observe container width for responsiveness
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerW(entry.contentRect.width);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Last 10 attempts, oldest → newest left to right
  const recent = [...attempts].slice(0, 10).reverse();
  if (recent.length === 0) return null;

  const values = recent.map((a) => {
    const total = a.totalMarks > 0 ? a.totalMarks : 100;
    return Math.min(100, Math.round((a.score / total) * 100));
  });

  const chartH = 180;
  const labelH = 28;
  const yLabelW = 28;
  const paddingTop = 24;
  const innerW = Math.max(containerW - yLabelW - 16, 100);
  const n = recent.length;
  const barW = Math.max(16, Math.min(48, Math.floor(innerW / n) - 8));
  const totalBarsW = n * barW + (n - 1) * 8;
  const barOffset = (innerW - totalBarsW) / 2;

  return (
    <div className="bg-gray-900 border border-white/5 rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Score Trend
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            {recent.length} most recent attempt{recent.length !== 1 ? "s" : ""} · % score
          </p>
        </div>
      </div>

      <div ref={containerRef} className="w-full">
        <svg
          width="100%"
          height={chartH + labelH + paddingTop}
          viewBox={`0 0 ${containerW} ${chartH + labelH + paddingTop}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="barGradHover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = paddingTop + chartH - (pct / 100) * chartH;
            return (
              <g key={pct}>
                <line
                  x1={yLabelW}
                  x2={containerW - 8}
                  y1={y}
                  y2={y}
                  stroke="#1f2937"
                  strokeWidth={1}
                />
                <text
                  x={yLabelW - 5}
                  y={y + 4}
                  fontSize={10}
                  fill="#374151"
                  textAnchor="end"
                  fontFamily="ui-monospace, monospace"
                >
                  {pct}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {values.map((val, i) => {
            const x = yLabelW + barOffset + i * (barW + 8);
            const barH = Math.max(3, (val / 100) * chartH);
            const y = paddingTop + chartH - barH;
            const attempt = recent[i];
            const rawLabel = attempt.interviewId?.title || `#${i + 1}`;
            const label = rawLabel.length > 7 ? rawLabel.slice(0, 7) + "…" : rawLabel;
            const isHigh = val >= 70;
            const isMid = val >= 40 && val < 70;

            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  rx={4}
                  fill={isHigh ? "url(#barGrad)" : isMid ? "#ca8a04" : "#dc2626"}
                  opacity={0.8}
                />
                {/* Value above bar — only if enough space */}
                {barH > 20 || val > 0 ? (
                  <text
                    x={x + barW / 2}
                    y={y - 5}
                    fontSize={9}
                    fill="#9ca3af"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {val}%
                  </text>
                ) : null}
                {/* X label */}
                <text
                  x={x + barW / 2}
                  y={paddingTop + chartH + 16}
                  fontSize={9}
                  fill="#4b5563"
                  textAnchor="middle"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 pt-1 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-indigo-400" />
          <span className="text-xs text-gray-500">≥70% Good</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-yellow-600" />
          <span className="text-xs text-gray-500">40–69% Average</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-red-600" />
          <span className="text-xs text-gray-500">&lt;40% Needs work</span>
        </div>
      </div>
    </div>
  );
}

export default ScoreChart;
