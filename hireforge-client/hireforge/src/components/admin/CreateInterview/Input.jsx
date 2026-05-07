function Input({ label, name, value, onChange }) {

 return (
  <div className="space-y-1">

    {/* LABEL */}
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>

    {/* INPUT */}
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 transition"
    />

  </div>
);

}

export default Input;