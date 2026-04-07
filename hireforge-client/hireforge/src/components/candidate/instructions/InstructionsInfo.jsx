const InstructionsInfo = ({ interview }) => {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <p><strong>Duration:</strong> {interview.duration} minutes</p>
      <p><strong>Total Questions:</strong> {interview.questions?.length || 0}</p>
    </div>
  );
};

export default InstructionsInfo;