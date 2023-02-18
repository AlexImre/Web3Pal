export default function TextArea(props) {
  const { name, handleChange, value } = props;
  return (
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700"
      ></label>
      <div className="mt-1">
        <textarea
          rows={4}
          name={name}
          id="comment"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          defaultValue={''}
          onChange={(e) => handleChange(e)}
          value={value}
        />
      </div>
    </div>
  );
}
