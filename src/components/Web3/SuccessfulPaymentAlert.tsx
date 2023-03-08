import { CheckCircleIcon } from '@heroicons/react/20/solid';

export default function SuccessfulPaymentAlert(props: any) {
  return (
    <div className="m-5 w-[600px] rounded-md bg-green-50  p-4 sm:rounded-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            Transaction completed
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              Success! This invoice has been paid. You can view this transaction{' '}
              <a
                className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
                href={`https://etherscan.io/tx/${props.tx}`}
              >
                here.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
