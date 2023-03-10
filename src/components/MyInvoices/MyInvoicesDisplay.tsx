import { StateContext } from '@/context/stateContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import toast from 'react-hot-toast';
import { getServicesTotal } from '../InvoiceForm/ServicesUtils';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MyInvoicesDisplay() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { myInvoices } = masterState;
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState([]);

  const statusStyles = {
    Paid: 'bg-green-100 text-green-800',
    Unpaid: 'bg-yellow-100 text-yellow-800',
    Failed: 'bg-gray-100 text-gray-800',
  };

  useEffect(() => {
    const isIndeterminate =
      selectedInvoice.length > 0 && selectedInvoice.length < myInvoices.length;
    if (selectedInvoice.length === 0) {
      setChecked(false);
    } else {
      setChecked(selectedInvoice.length === myInvoices.length);
    }
    setIndeterminate(isIndeterminate);
    // if (checkbox.current) {
    //   checkbox.current.indeterminate = isIndeterminate;
    // }
  }, [selectedInvoice]);

  function toggleAll() {
    setSelectedInvoice(checked || indeterminate ? [] : myInvoices);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleDelete = async (selectedInvoices: any) => {
    const selectedInvoiceIds = selectedInvoices.map(
      (invoice: any) => invoice.invoiceId
    );
    const invoiceToast = () =>
      toast.success(
        `Invoice${selectedInvoiceIds.length > 1 ? 's' : ''} deleted.`
      );
    const deletedInvoices = await fetch('/api/deleteinvoices', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedInvoiceIds),
    });

    setMasterState((prevState) => ({
      ...prevState,
      myInvoices: prevState.myInvoices.filter(
        (invoice) => !selectedInvoiceIds.includes(invoice.invoiceId)
      ),
    }));

    // setNumberOfInvoices(numberOfInvoices - myInvoices.length);

    deletedInvoices.ok && invoiceToast();
  };

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

  const defaultSortState = {
    invoiceNumber: false,
    clientName: false,
    issueDate: false,
    amount: false,
    status: false,
  };
  const [activeSort, setActiveSort] = useState(defaultSortState);

  const [shouldSortInvoiceNumber, setShouldSortInvoiceNumber] = useState(true);
  const handleInvoiceNumberSorting = () => {
    if (myInvoices.length === 0) return;
    myInvoices.sort((a, b) => {
      setActiveSort({ ...defaultSortState, invoiceNumber: true });
      shouldSortInvoiceNumber
        ? setShouldSortInvoiceNumber(false)
        : setShouldSortInvoiceNumber(true);
      if (shouldSortInvoiceNumber) {
        return (
          a.invoiceInformation.invoiceNumber -
          b.invoiceInformation.invoiceNumber
        );
      } else {
        return (
          b.invoiceInformation.invoiceNumber -
          a.invoiceInformation.invoiceNumber
        );
      }
    });
  };

  const [shouldSortAmount, setShouldSortAmount] = useState(true);
  const handleAmountSorting = () => {
    if (myInvoices.length === 0) return;
    myInvoices.sort((a, b) => {
      setActiveSort({ ...defaultSortState, amount: true });
      shouldSortAmount ? setShouldSortAmount(false) : setShouldSortAmount(true);
      if (shouldSortAmount) {
        return (
          getServicesTotal(a.servicesInformation) -
          getServicesTotal(b.servicesInformation)
        );
      } else {
        return (
          getServicesTotal(b.servicesInformation) -
          getServicesTotal(a.servicesInformation)
        );
      }
    });
  };

  const [shouldSortDate, setShouldSortDate] = useState(true);
  const handleDateSorting = () => {
    if (myInvoices.length === 0) return;
    myInvoices.sort((a: any, b: any) => {
      setActiveSort({ ...defaultSortState, issueDate: true });
      const convertDateStringToNumber1 = Number(
        new Date(a.invoiceInformation.issueDate)
      );
      const convertDateStringToNumber2 = Number(
        new Date(b.invoiceInformation.issueDate)
      );
      shouldSortDate ? setShouldSortDate(false) : setShouldSortDate(true);
      if (shouldSortDate) {
        return convertDateStringToNumber1 - convertDateStringToNumber2;
      } else {
        return convertDateStringToNumber2 - convertDateStringToNumber1;
      }
    });
  };

  const [shouldSortClientName, setShouldSortClientName] = useState(false);
  const handleClientNameSorting = () => {
    setActiveSort({ ...defaultSortState, clientName: true });
    if (myInvoices.length === 0) return;
    myInvoices.sort((a, b) => {
      shouldSortClientName
        ? setShouldSortClientName(false)
        : setShouldSortClientName(true);
      if (shouldSortClientName) {
        return a.recipientInformation.clientName.localeCompare(
          b.recipientInformation.clientName
        );
      } else {
        return b.recipientInformation.clientName.localeCompare(
          a.recipientInformation.clientName
        );
      }
    });
  };

  const [shouldSortStatus, setShouldSortStatus] = useState(false);
  const handleStatusSorting = () => {
    setActiveSort({ ...defaultSortState, status: true });
    if (myInvoices.length === 0) return;
    myInvoices.sort((a, b) => {
      shouldSortStatus ? setShouldSortStatus(false) : setShouldSortStatus(true);
      if (shouldSortStatus) {
        return a.status.localeCompare(b.status);
      } else {
        return b.status.localeCompare(a.status);
      }
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              {selectedInvoice.length > 0 && (
                <div className="absolute top-0 left-14 flex h-12 items-center space-x-3 bg-white sm:left-12">
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    onClick={() => handleDelete(selectedInvoice)}
                  >
                    Delete selected {`(${selectedInvoice.length})`}
                  </button>
                </div>
              )}
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th
                      scope="col"
                      className="flex min-w-[8rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Invoice Number
                      <span className="ml-2 flex-none cursor-pointer rounded text-gray-400 group-hover:visible group-focus:visible">
                        {shouldSortInvoiceNumber ? (
                          <ChevronDownIcon
                            className={classNames(
                              'h-5 w-5',
                              activeSort.invoiceNumber
                                ? 'rounded bg-gray-200 text-gray-600'
                                : ''
                            )}
                            aria-hidden="true"
                            onClick={handleInvoiceNumberSorting}
                          />
                        ) : (
                          <ChevronUpIcon
                            className={classNames(
                              'h-5 w-5',
                              activeSort.invoiceNumber
                                ? 'rounded bg-gray-200 text-gray-600'
                                : ''
                            )}
                            aria-hidden="true"
                            onClick={handleInvoiceNumberSorting}
                          />
                        )}
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex">
                        To
                        <span className="ml-2 flex-none cursor-pointer cursor-pointer rounded text-gray-400 group-hover:visible group-focus:visible">
                          {shouldSortClientName ? (
                            <ChevronDownIcon
                              className={classNames(
                                'h-5 w-5',
                                activeSort.clientName
                                  ? 'rounded bg-gray-200 text-gray-600'
                                  : ''
                              )}
                              aria-hidden="true"
                              onClick={handleClientNameSorting}
                            />
                          ) : (
                            <ChevronUpIcon
                              className={classNames(
                                'h-5 w-5',
                                activeSort.clientName
                                  ? 'rounded bg-gray-200 text-gray-600'
                                  : ''
                              )}
                              aria-hidden="true"
                              onClick={handleClientNameSorting}
                            />
                          )}
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex">
                        Issue Date
                        <span className="ml-2 flex-none cursor-pointer rounded text-gray-400 group-hover:visible group-focus:visible">
                          {shouldSortDate ? (
                            <ChevronDownIcon
                              className={classNames(
                                'h-5 w-5',
                                activeSort.issueDate
                                  ? 'rounded bg-gray-200 text-gray-600'
                                  : ''
                              )}
                              aria-hidden="true"
                              onClick={handleDateSorting}
                            />
                          ) : (
                            <ChevronUpIcon
                              className={classNames(
                                'h-5 w-5',
                                activeSort.issueDate
                                  ? 'rounded bg-gray-200 text-gray-600'
                                  : ''
                              )}
                              aria-hidden="true"
                              onClick={handleDateSorting}
                            />
                          )}
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex">
                        Amount
                        <span className="ml-2 flex-none cursor-pointer rounded text-gray-400 group-hover:visible group-focus:visible">
                          {shouldSortAmount ? (
                            <ChevronDownIcon
                              className={classNames(
                                'h-5 w-5',
                                activeSort.amount
                                  ? 'rounded bg-gray-200 text-gray-600'
                                  : ''
                              )}
                              aria-hidden="true"
                              onClick={handleAmountSorting}
                            />
                          ) : (
                            <ChevronUpIcon
                              className={classNames(
                                'h-5 w-5',
                                activeSort.amount
                                  ? 'rounded bg-gray-200 text-gray-600'
                                  : ''
                              )}
                              aria-hidden="true"
                              onClick={handleAmountSorting}
                            />
                          )}
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex">
                        Status
                        <span className="ml-2 flex-none cursor-pointer rounded text-gray-400 group-hover:visible group-focus:visible">
                          {shouldSortStatus ? (
                            <ChevronDownIcon
                              className={classNames(
                                'h-5 w-5',
                                activeSort.status
                                  ? 'rounded bg-gray-200 text-gray-600'
                                  : ''
                              )}
                              aria-hidden="true"
                              onClick={handleStatusSorting}
                            />
                          ) : (
                            <ChevronUpIcon
                              className={classNames(
                                'h-5 w-5',
                                activeSort.status
                                  ? 'rounded bg-gray-200 text-gray-600'
                                  : ''
                              )}
                              aria-hidden="true"
                              onClick={handleStatusSorting}
                            />
                          )}
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">Share</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {myInvoices.map((invoice) => (
                    <tr
                      key={invoice._id}
                      className={
                        selectedInvoice.includes(invoice)
                          ? 'bg-gray-50'
                          : undefined
                      }
                    >
                      <td className="relative px-7 sm:w-12 sm:px-6">
                        {selectedInvoice.includes(invoice) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          value={invoice.user}
                          checked={selectedInvoice.includes(invoice)}
                          onChange={(e) =>
                            setSelectedInvoice(
                              e.target.checked
                                ? [...selectedInvoice, invoice]
                                : selectedInvoice.filter((p) => p !== invoice)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                          selectedInvoice.includes(invoice)
                            ? 'text-indigo-600'
                            : 'text-gray-900'
                        )}
                      >
                        {invoice.invoiceInformation.invoiceNumber}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {invoice.recipientInformation.clientName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {invoice.invoiceInformation.issueDate}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {getServicesTotal(invoice.servicesInformation)}{' '}
                        {invoice.paymentInformation.invoiceLabelling}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={classNames(
                            statusStyles[invoice.status],
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize'
                          )}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 text-right text-sm font-medium">
                        <Link
                          href={{
                            pathname: '/addinvoice',
                            query: { invoiceId: invoice.invoiceId },
                          }}
                        >
                          <button
                            type="button"
                            className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => handleEdit(invoice)}
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap py-4 text-right text-sm font-medium">
                        <Link href={`/invoices/${invoice.invoiceId}`}>
                          <button
                            type="button"
                            className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Share
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
