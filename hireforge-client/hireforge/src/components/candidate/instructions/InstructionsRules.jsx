//later scale it and add while creating interview 

const InstructionsRules = () => {
  return (
    <div className="bg-gray-50 border rounded p-4 mb-6">
      <h2 className="font-semibold mb-2">Instructions</h2>

      <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
        <li>Do not refresh the page during the interview</li>
        <li>Timer will start once you begin</li>
        <li>Answer all questions before submitting</li>
        <li>Do not switch tabs (if monitored)</li>
        <li>Submit before time expires</li>
      </ul>
    </div>
  );
};

export default InstructionsRules;