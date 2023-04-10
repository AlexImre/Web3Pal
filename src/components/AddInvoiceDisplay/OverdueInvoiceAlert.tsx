import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

export default function OverdueInvoiceAlert() {
  return (
    <div className="mt-4 rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Overdue Invoice - This invoice can no longer be amended.
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              If you need to make any changes to this invoice, please void this
              invoice and create a copy with the amended details. This will
              minimise issues with correctly tracking the status of your
              invoices.
              <br></br>
              <br></br>
            </p>
            <div className="flex justify-between">
              To do this, press the void & copy button.
              <button className="mb-2 mr-4 w-32 rounded bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700">
                VOID + COPY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
