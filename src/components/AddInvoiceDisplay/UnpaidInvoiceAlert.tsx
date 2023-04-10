import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function UnpaidInvoiceAlert() {
  return (
    <div className="mt-4 rounded-md bg-yellow-50 p-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
