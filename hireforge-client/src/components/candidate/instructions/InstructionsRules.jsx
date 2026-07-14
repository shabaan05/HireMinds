//later scale it and add while creating interview 

const InstructionsRules = () => {
  return (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">

    {/* HEADER */}
    <h2 className="font-semibold text-gray-100 mb-3">
      Instructions
    </h2>

    {/* RULE LIST */}
    <ul className="space-y-3 text-sm">

      {[
        "Do not refresh the page during the interview",
        "Timer will start once you begin",
        "Answer all questions before submitting",
        "Do not switch tabs (if monitored)",
        "Submit before time expires",
      ].map((rule, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-300">

          {/* NEON BULLET */}
          <span className="mt-1 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.7)]"></span>

          {/* TEXT */}
          <span>{rule}</span>

        </li>
      ))}

    </ul>

  </div>
);
};

export default InstructionsRules;