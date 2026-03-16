function SearchBar({ value, onChange }) {

  return (
    <input
      type="text"
      placeholder="Search interview..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );

}

export default SearchBar;