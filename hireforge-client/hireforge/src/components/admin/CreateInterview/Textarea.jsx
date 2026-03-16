function Textarea({ label, name, value, onChange }) {

  return (
    <div>

      <label>{label}</label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
      />

    </div>
  );

}

export default Textarea;