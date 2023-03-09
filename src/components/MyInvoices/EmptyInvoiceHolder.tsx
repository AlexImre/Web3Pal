import { PlusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function EmptyInvoiceHolder() {
  return (
    <div className="m-10 border py-10 text-center shadow sm:rounded-lg">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating an invoice.
      </p>
      <div className="mt-6">
        <Link href="/addinvoice">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Invoice
          </button>
        </Link>
      </div>
    </div>
  );
}
