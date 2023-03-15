import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { validateName } from './formValidation';

export default function TextFieldWithValidation(props) {
  const { label, name, width, value, onChange, error } = props;

  const isBlankError = error && value === '';
  const isInvalidError = error && validateName(value) === false;
  const hasError = isBlankError || isInvalidError;

  return (
    <div>
      <label htmlFor="text" className="block text-sm font-medium text-gray-700">
        {label}*
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={(e) => onChange(e)}
          className={`${width} rounded-md pr-10 focus:outline-none sm:text-sm ${
            hasError
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          aria-invalid="true"
          aria-describedby="email-error"
        />
        {hasError ? (
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
      {isBlankError ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          Please complete this field.
        </p>
      ) : isInvalidError ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {'Please only use characters [a - z].'}
        </p>
      ) : (
        ''
      )}
    </div>
  );
}
