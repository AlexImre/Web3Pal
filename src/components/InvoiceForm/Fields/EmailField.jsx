import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

export default function EmailField(props) {
  const { label, name, width, value, onChange, error } = props

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        {label}*
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="email"
          name={name}
          id={name}
          value={value}
          onChange={(e) => onChange(e)}
          className={`${width} rounded-md pr-10 focus:outline-none sm:text-sm ${
            (error && value === '') || (error && !value.includes('@'))
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }`}
          aria-invalid="true"
          aria-describedby="email-error"
        />
        {(error && value === '') || (error && !value.includes('@')) ? (
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

      {(error && value === '') || (error && !value.includes('@')) ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          Please enter a valid email address.
        </p>
      ) : (
        ''
      )}
    </div>
  )
}
