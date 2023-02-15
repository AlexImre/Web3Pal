export default function ServicesField(props: any) {
  const { name, className, type, value, handleChange } = props;
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
    </div>
  );
}
