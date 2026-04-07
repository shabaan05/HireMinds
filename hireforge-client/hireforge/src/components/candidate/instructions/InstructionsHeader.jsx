const InstructionsHeader = ({ interview }) => {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">{interview.title}</h1>
      <p className="text-gray-600 mt-2">{interview.description}</p>
    </div>
  );
};

export default InstructionsHeader;