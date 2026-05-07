import InterviewCard from "./InterviewCard";

function AvailableInterviews({ interviews }) {
  return (
  <div className="space-y-5">

    {/* HEADER */}
    <div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Available Interviews
      </h3>
      <p className="text-gray-400 text-sm mt-1">
        Choose an interview and start testing your skills
      </p>
    </div>

    {/* GRID */}
    {interviews?.length === 0 ? (
      <p className="text-gray-500">No interviews available</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {interviews.map((interview) => (
          <InterviewCard
            key={interview._id}
            interview={interview}
          />
        ))}

      </div>
    )}

  </div>
);
}
export default AvailableInterviews
