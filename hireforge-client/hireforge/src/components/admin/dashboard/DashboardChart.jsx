function DashboardChart({ attempts }) {

  return (
    <div>

      <h3>Performance Overview</h3>

      <p>Total Attempts: {attempts.length}</p>

      <p>
        Average Score: {
          attempts.length === 0
            ? 0
            : (
                attempts.reduce((sum, a) => sum + a.score, 0) /
                attempts.length
              ).toFixed(1)
        }
      </p>

    </div>
  );
}

export default DashboardChart;