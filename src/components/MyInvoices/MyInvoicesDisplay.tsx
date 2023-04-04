import { StateContext, initialState } from '@/context/stateContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import toast from 'react-hot-toast';
import { getServicesTotal } from '../InvoiceForm/ServicesUtils';
import InvoiceActions from './InvoiceActions';
import { getInvoiceStatusChip } from './myInvoicesUtils';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MyInvoicesDisplay() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { myInvoices, myInvoicesView } = masterState;
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState([]);

  const setView = (myInvoicesView: string) => {
    setMasterState({
      ...masterState,
      myInvoicesView,
    });
  };

  const selectInvoicesGivenView = (view: string) => {
    const unpaidInvoices = myInvoices.filter(
      (invoice) => invoice.status === 'Unpaid' || invoice.status === 'Overdue'
    );
    switch (view) {
      case 'Unpaid':
        return unpaidInvoices;
      case 'Draft':
        const draftInvoices = myInvoices.filter(
          (invoice) => invoice.status === 'Draft'
        );
        return draftInvoices;
      case 'Paid':
        const paidInvoices = myInvoices.filter(
          (invoice) => invoice.status === 'Paid'
        );
        return paidInvoices;
      case 'Void':
        const voidInvoices = myInvoices.filter(
          (invoice) => invoice.status === 'Void'
        );
        return voidInvoices;
      case 'Archived':
        const archivedInvoices = myInvoices.filter(
          (invoice) => invoice.status === 'Archived'
        );
        return archivedInvoices;
      default:
        return unpaidInvoices;
    }
  };

  const invoices = selectInvoicesGivenView(myInvoicesView);

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

  const handleBulkAction = (view: string, selectedInvoices: any) => {
    switch (view) {
      case 'Draft':
        handleDelete(selectedInvoices);
        break;
      default:
        handleArchive(selectedInvoices);
    }
  };

  const handleDelete = async (selectedInvoices: any) => {
    if (
      window.confirm(
        'Deleting an invoice cannot be undone. If you wish to continue with this action, press OK.'
      )
    ) {
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
        invoice: initialState.invoice,
        myInvoices: prevState.myInvoices.filter(
          (invoice) => !selectedInvoiceIds.includes(invoice.invoiceId)
        ),
      }));

      setSelectedInvoice([]);
      deletedInvoices.ok && invoiceToast();
    }
  };

  const handleArchive = async (selectedInvoices: any) => {
    if (
      window.confirm(
        'Are you sure you wish to archive? If you wish to continue with this action, press OK.'
      )
    ) {
      const selectedInvoiceIds = selectedInvoices.map(
        (invoice: any) => invoice.invoiceId
      );

      const archiveToast = () =>
        toast.success(
          `Invoice${selectedInvoiceIds.length > 1 ? 's' : ''} archived.`
        );
      const archivedInvoices = await fetch('/api/archiveinvoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedInvoiceIds),
      });

      if (archivedInvoices.ok) {
        setMasterState((prevState) => ({
          ...prevState,
          invoice: initialState.invoice,
          myInvoices: prevState.myInvoices.map((invoice) => {
            if (selectedInvoiceIds.includes(invoice.invoiceId)) {
              return {
                ...invoice,
                status: 'Archived',
              };
            } else {
              return invoice;
            }
          }),
        }));
        setSelectedInvoice([]);
        archiveToast();
      }
    }
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

  const views = ['Unpaid', 'Paid', 'Draft', 'Void', 'Archived'];

  return (
    <>
      <div className="ml-8 mt-5 flex items-center">
        {views.map((view) => {
          return (
            <button
              key={view}
              className={`mr-2 w-32 rounded border ${
                myInvoicesView === view
                  ? 'cursor-auto border border-indigo-700 bg-indigo-700 text-white'
                  : 'border-gray-400 text-gray-700 hover:bg-gray-100'
              } py-2 px-4 text-sm font-medium shadow`}
              onClick={() => setView(view)}
            >
              {view} ({selectInvoicesGivenView(view).length})
            </button>
          );
        })}
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -mt-5 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative sm:rounded-lg">
                {selectedInvoice.length > 0 && (
                  <div className="absolute top-0 left-14 flex h-12 items-center space-x-3 sm:left-12 sm:rounded-lg">
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={() =>
                        handleBulkAction(myInvoicesView, selectedInvoice)
                      }
                    >
                      {`${
                        myInvoicesView === 'Draft' ? 'Delete' : 'Archive'
                      } selected (${selectedInvoice.length})`}
                    </button>
                  </div>
                )}
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-indigo-700">
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
                        className="flex min-w-[8rem] py-3.5 pr-3 text-left text-sm font-medium text-white"
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
                        className="px-3 py-3.5 text-left text-sm font-medium text-white"
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
                        className="px-3 py-3.5 text-left text-sm font-medium text-white"
                      >
                        <div className="flex">
                          Due Date
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
                        className="px-3 py-3.5 text-left text-sm font-medium text-white"
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
                        className="px-3 py-3.5 text-left text-sm font-medium text-white"
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
                        <span className="sr-only">Invoice Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {invoices.map((invoice) => (
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
                            onChange={(e) => {
                              console.log(
                                invoice.invoiceInformation.invoiceNumber
                              );
                              setSelectedInvoice(
                                e.target.checked
                                  ? [...selectedInvoice, invoice]
                                  : selectedInvoice.filter((p) => p !== invoice)
                              );
                            }}
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
                          {new Date(
                            invoice.invoiceInformation.dueDate
                          ).toLocaleDateString('en-US')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {/* TO DO FIX NUMBER FORMATING*/}
                          {Intl.NumberFormat('en-US').format(
                            getServicesTotal(invoice.servicesInformation)
                          )}{' '}
                          {invoice.paymentInformation.invoiceLabelling}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {getInvoiceStatusChip(invoice)}
                        </td>
                        <td className="whitespace-nowrap py-4 text-right text-sm font-medium">
                          <InvoiceActions
                            invoice={invoice}
                            handleArchive={handleArchive}
                            selectedInvoice={selectedInvoice}
                          />
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
    </>
  );
}
