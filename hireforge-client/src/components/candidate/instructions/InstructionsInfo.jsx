const InstructionsInfo = ({ interview }) => {
  
return (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">

    <div className="space-y-2 text-sm text-gray-300">

      <p>
        <span className="text-gray-400">Duration:</span>{" "}
        <span className="font-medium text-blue-400">
          {interview.duration} minutes
        </span>
      </p>

      <p>
        <span className="text-gray-400">Total Questions:</span>{" "}
        <span className="font-medium text-purple-400">
          {interview.questions?.length || 0}
        </span>
      </p>

    </div>

  </div>
);
};

export default InstructionsInfo;