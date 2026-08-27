function FilterDropdown({ filterType, onFilterChange }) {

return (
  <div className="space-y-1">

    {/* LABEL */}
    <label className="text-sm font-medium text-gray-700">
      Filter by Type
    </label>

    {/* SELECT */}
    <select
      value={filterType}
      onChange={(e) => onFilterChange(e.target.value)}
      className="w-full max-w-xs border rounded-lg px-3 py-2 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 transition bg-white"
    >
      <option value="">All</option>
      <option value="mcq">MCQ</option>
      <option value="coding">Coding</option>
      <option value="subjective">Subjective</option>
    </select>

  </div>
);
}

export default FilterDropdown;