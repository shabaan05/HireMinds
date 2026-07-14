function FormField({ label, name, value, onChange, error, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md px-3 py-2"
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export default FormField;