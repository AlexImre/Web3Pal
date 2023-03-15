import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function UnpaidInvoiceAlert() {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Unpaid Invoice - This invoice has been published and can no longer
            be amended.
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              If you need to make any changes to this invoice, please void this
              invoice and create a copy with the amended details. You can do
              this in{' '}
              <a className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800">
                <Link href="/myinvoices"> My invoices.</Link>
              </a>
            </p>
            {/* <div className="flex justify-between">
              To do this, press the void & copy button.
              <button className="mb-2 mr-4 w-32 rounded bg-yellow-600 py-2 px-4 text-sm font-medium text-white hover:bg-yellow-700">
                VOID + COPY
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
