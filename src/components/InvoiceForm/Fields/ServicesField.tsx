export default function ServicesField(props: any) {
  const { name, className, type, value, handleChange, error, errorMessage } =
    props;

  const descriptionInvalid =
    value === '' || value === null || value === undefined;

  return (
    <div>
      <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
        <input
          type={type}
          name={name}
          id={name}
          className={className}
          value={value}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {error && descriptionInvalid && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
