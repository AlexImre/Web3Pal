import React, { useContext, useState } from 'react';
import { getServicesTotal } from '../InvoiceForm/ServicesUtils';
import { getInvoiceStatusChip } from '../MyInvoices/myInvoicesUtils';
import Link from 'next/link';
import { StateContext } from '@/context/stateContext';

function RecentInvoices(props: any) {
  const { myInvoices, title, showHeaderButtons, dataIsPaidInvoices } = props;
  const stateContext = useContext(StateContext);
  const { setMasterState } = stateContext;
  const [view, setView] = useState('Published');
  const views = ['Published', 'Draft'];

  const sortedInvoices = myInvoices.sort((a, b) => {
    const date1 = new Date(a.createdTimestamp);
    const date2 = new Date(b.createdTimestamp);
    const timestamp1 = BigInt(date1.getTime());
    const timestamp2 = BigInt(date2.getTime());
    return parseInt(timestamp2.toString()) - parseInt(timestamp1.toString());
  });

  const recentPaidInvoices = sortedInvoices
    .filter((invoice) => {
      return invoice.status === 'Paid';
    })
    .slice(0, 3);

  const recentPublishedInvoices = sortedInvoices
    .filter((invoice) => {
      return invoice.status !== 'Draft';
    })
    .slice(0, 3);

  const recentDraftInvoices = sortedInvoices
    .filter((invoice) => {
      return invoice.status === 'Draft';
    })
    .slice(0, 3);

  let invoices = [];
  if (dataIsPaidInvoices) {
    invoices = recentPaidInvoices;
  } else if (view === 'Published') {
    invoices = recentPublishedInvoices;
  } else {
    invoices = recentDraftInvoices;
  }

  const headerButtons = views.map((item) => {
    return (
      <button
        key={item}
        className={`my-2 mr-2 w-32 rounded border ${
          view === item
            ? 'cursor-auto border border-indigo-700 bg-indigo-700 text-white'
            : 'border-gray-400 bg-white text-gray-700 hover:bg-gray-100'
        } py-2 px-4 text-sm font-medium shadow`}
        onClick={() => setView(view === 'Published' ? 'Draft' : 'Published')}
      >
        {item}
      </button>
    );
  });

  const handleEdit = (invoice) => {
    setMasterState((prevState) => ({
      ...prevState,
      uuid: invoice.invoiceId,
      invoiceInformation: invoice.invoiceInformation,
      personalInformation: invoice.personalInformation,
      recipientInformation: invoice.recipientInformation,
      paymentInformation: invoice.paymentInformation,
      servicesInformation: invoice.servicesInformation,
      notesInformation: invoice.notesInformation,
    }));
  };

  return (
    <>
      <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
        {title}
      </h2>
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {showHeaderButtons && headerButtons}
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-900">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-sm font-semibold text-white"
                      scope="col"
                    >
                      Invoice Number
                    </th>
                    <th
                      className="px-6 py-3 text-left text-sm font-semibold text-white"
                      scope="col"
                    >
                      To
                    </th>
                    <th
                      className="px-6 py-3 text-right text-sm font-semibold text-white"
                      scope="col"
                    >
                      Due Date
                    </th>
                    <th
                      className="px-6 py-3 text-right text-sm font-semibold text-white"
                      scope="col"
                    >
                      Amount
                    </th>
                    <th
                      className="hidden px-6 py-3 text-left text-sm font-semibold text-white md:block"
                      scope="col"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice.invoiceInformation.invoiceNumber}
                      className="bg-white"
                    >
                      <td className="max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div className="flex">
                          <p className="truncate text-gray-500 group-hover:text-gray-900">
                            {invoice.invoiceInformation.invoiceNumber}
                          </p>
                        </div>
                      </td>
                      <td className="max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div className="flex">
                          <p className="text-gray-500 group-hover:text-gray-900">
                            {invoice.recipientInformation.clientName}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        {new Date(
                          invoice.invoiceInformation.dueDate
                        ).toLocaleDateString('en-US')}{' '}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <span className="font-medium text-gray-900">
                          {`${getServicesTotal(invoice.servicesInformation)} ${
                            invoice.paymentInformation.invoiceLabelling
                          }`}
                        </span>
                      </td>
                      <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                        <span>{getInvoiceStatusChip(invoice)}</span>
                        <Link
                          href={{
                            pathname: '/addinvoice',
                            query: { invoiceId: invoice.invoiceId },
                          }}
                        >
                          <button
                            type="button"
                            className="ml-5 mr-2 inline-flex w-14 items-center justify-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => handleEdit(invoice)}
                          >
                            {invoice.status === 'Draft' ? 'Edit' : 'View'}
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              {/* <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">10</span> of{' '}
                <span className="font-medium">20</span> results
              </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
          </nav> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentInvoices;
