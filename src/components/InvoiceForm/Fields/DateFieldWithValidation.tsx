import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

type DateFieldWithValidationProps = {
  label: string;
  name: string;
  width: string;
  value: Date;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  errorMessage: string;
  placeholder: string;
};

export default function DateFieldWithValidation(
  props: DateFieldWithValidationProps
) {
  const {
    label,
    name,
    width,
    value,
    onChange,
    error,
    errorMessage,
    placeholder,
  } = props;

  return (
    <div>
      <label htmlFor="text" className="block text-sm font-medium text-gray-700">
        {label}*
      </label>
      <div className="relative mt-1 flex rounded-md shadow-sm">
        <input
          type="date"
          name={name}
          id={name}
          value={value.toDateString()}
          onChange={(e) => onChange(e)}
          className={`${width} rounded-md pr-10 focus:outline-none sm:text-sm ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          aria-invalid="true"
          aria-describedby="email-error"
          placeholder={placeholder}
        />
        {error ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : (
          ''
        )}
      </div>
      {error ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
        </p>
      ) : (
        ''
      )}
    </div>
  );
}
