
import Timer from "../../candidate/attempt/Timer";
const AttemptHeader = ({ currentIndex, total, attempt, handleSubmit }) => {
return (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    {/* Left */}
    <div>
      <h2 className="text-2xl font-bold text-white">
        Technical Assessment
      </h2>

      <p className="text-gray-400 mt-1">
        Question <span className="text-blue-400 font-semibold">{currentIndex + 1}</span>
        {" "}of{" "}
        <span className="text-blue-400 font-semibold">{total}</span>
      </p>
    </div>

    {/* Center */}
    <div className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-5 py-3">

      <span className="text-2xl">
        ⏳
      </span>

      {attempt && (
        <Timer
          startedAt={attempt.startedAt}
          duration={attempt?.interviewId?.duration}
          onTimeUp={handleSubmit}
        />
      )}

    </div>

    {/* Right */}
    <div>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600
                   text-white font-semibold hover:opacity-90 transition"
      >
        Submit Test
      </button>

    </div>

  </div>
);
};

export default AttemptHeader;