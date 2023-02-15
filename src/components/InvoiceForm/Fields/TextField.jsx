export default function TextFieldRequired(props) {
  const { label, name, width, value, onChange } = props;

  return (
    <div>
      <label htmlFor="text" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={(e) => onChange(e)}
          className={`${width} mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          aria-invalid="true"
          aria-describedby="email-error"
        />
      </div>
    </div>
  );
}
