const InstructionsHeader = ({ interview }) => {
  return (
  <div className="space-y-2">

    {/* TITLE */}
    <h1 className="text-2xl font-bold text-gray-100">
      {interview.title}
    </h1>

    {/* DESCRIPTION */}
    <p className="text-gray-400 text-sm leading-relaxed">
      {interview.description}
    </p>

  </div>
);
};

export default InstructionsHeader;