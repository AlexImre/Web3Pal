import { StateContext, initialState } from '@/context/stateContext';
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
import InvoiceNumberSorting from './InvoiceNumberSorting';
import AmountSorting from './AmountSorting';
import DateSorting from './DateSorting';
import NameSorting from './NameSorting';
import StatusSorting from './StatusSorting';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const views = ['Unpaid', 'Paid', 'Draft', 'Void', 'Archived'];

export default function MyInvoicesDisplay() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { myInvoices, myInvoicesView } = masterState;
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const { selectedInvoices } = masterState;
  const [invoices, setInvoices] = useState([]);

  const setView = (myInvoicesView: string) => {
    setMasterState({
      ...masterState,
      myInvoicesView,
    });
    setInvoices(selectInvoicesGivenView(myInvoicesView));
  };

  const selectInvoicesGivenView = (view: string) => {
    const unpaidInvoices = myInvoices.filter(
      (invoice) =>
        (invoice.status === 'Unpaid' && !invoice.isArchived) ||
        (invoice.status === 'Overdue' && !invoice.isArchived)
    );
    switch (view) {
      case 'Unpaid':
        return unpaidInvoices;
      case 'Draft':
        const draftInvoices = myInvoices.filter(
          (invoice) => invoice.status === 'Draft' && !invoice.isArchived
        );
        return draftInvoices;
      case 'Paid':
        const paidInvoices = myInvoices.filter(
          (invoice) => invoice.status === 'Paid' && !invoice.isArchived
        );
        return paidInvoices;
      case 'Void':
        const voidInvoices = myInvoices.filter(
          (invoice) => invoice.status === 'Void' && !invoice.isArchived
        );
        return voidInvoices;
      case 'Archived':
        const archivedInvoices = myInvoices.filter(
          (invoice) => invoice.isArchived === true
        );
        return archivedInvoices;
      default:
        return unpaidInvoices;
    }
  };

  useEffect(() => {
    const isIndeterminate =
      selectedInvoices.length > 0 &&
      selectedInvoices.length < myInvoices.length;
    if (selectedInvoices.length === 0) {
      setChecked(false);
    } else {
      setChecked(selectedInvoices.length === myInvoices.length);
    }
    setIndeterminate(isIndeterminate);
    setInvoices(selectInvoicesGivenView(myInvoicesView));
    // if (checkbox.current) {
    //   checkbox.current.indeterminate = isIndeterminate;
    // }
  }, [selectedInvoices]);

  function toggleAll() {
    setMasterState({
      ...masterState,
      selectedInvoices: checked || indeterminate ? [] : myInvoices,
    });
    // setSelectedInvoice(checked || indeterminate ? [] : myInvoices);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleBulkAction = (view: string, selectedInvoices: any) => {
    switch (view) {
      case 'Draft':
        handleDelete(selectedInvoices);
        break;
      case 'Archived':
        handleRestore(selectedInvoices);
        break;
      default:
        handleArchive(selectedInvoices);
    }
  };

  const handleRestore = async (selectedInvoices: any) => {
    if (
      window.confirm(
        'Are you sure you wish to restore? If you wish to continue with this action, press OK.'
      )
    ) {
      const selectedInvoiceIds = selectedInvoices.map(
        (invoice: any) => invoice.invoiceId
      );

      const restoreToast = () =>
        toast.success(
          `Invoice${selectedInvoiceIds.length > 1 ? 's' : ''} restored.`
        );
      const restoredInvoices = await fetch('/api/restoreinvoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedInvoiceIds),
      });

      if (restoredInvoices.ok) {
        setMasterState((prevState) => ({
          ...prevState,
          invoice: initialState.invoice,
          myInvoices: prevState.myInvoices.map((invoice) => {
            if (selectedInvoiceIds.includes(invoice.invoiceId)) {
              return {
                ...invoice,
                isArchived: false,
              };
            } else {
              return invoice;
            }
          }),
          selectedInvoices: [],
        }));
        restoreToast();
      }
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

      if (deletedInvoices.ok) {
        setMasterState((prevState) => ({
          ...prevState,
          invoice: initialState.invoice,
          myInvoices: prevState.myInvoices.filter(
            (invoice) => !selectedInvoiceIds.includes(invoice.invoiceId)
          ),
          selectedInvoices: [],
        }));
        invoiceToast();
      }
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
                isArchived: true,
              };
            } else {
              return invoice;
            }
          }),
          selectedInvoices: [],
        }));
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
                  : 'border-gray-400 bg-white text-gray-700 hover:bg-gray-100'
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
                {selectedInvoices.length > 0 && (
                  <div className="absolute top-0 left-14 flex h-12 items-center space-x-3 sm:left-12 sm:rounded-lg">
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={() =>
                        handleBulkAction(myInvoicesView, selectedInvoices)
                      }
                    >
                      {`${
                        myInvoicesView === 'Draft'
                          ? 'Delete'
                          : myInvoicesView === 'Archived'
                          ? 'Restore'
                          : 'Archive'
                      } selected (${selectedInvoices.length})`}
                    </button>
                  </div>
                )}
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-slate-900">
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
                        <InvoiceNumberSorting
                          activeSort={activeSort}
                          setActiveSort={setActiveSort}
                          defaultSortState={defaultSortState}
                          invoices={invoices}
                        />
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-medium text-white"
                      >
                        <div className="flex">
                          To
                          <NameSorting
                            activeSort={activeSort}
                            setActiveSort={setActiveSort}
                            defaultSortState={defaultSortState}
                            invoices={invoices}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-medium text-white"
                      >
                        <div className="flex">
                          Due Date
                          <DateSorting
                            activeSort={activeSort}
                            setActiveSort={setActiveSort}
                            defaultSortState={defaultSortState}
                            invoices={invoices}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-medium text-white"
                      >
                        <div className="flex">
                          Amount
                          <AmountSorting
                            activeSort={activeSort}
                            setActiveSort={setActiveSort}
                            defaultSortState={defaultSortState}
                            invoices={invoices}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-medium text-white"
                      >
                        <div className="flex">
                          Status
                          <StatusSorting
                            activeSort={activeSort}
                            setActiveSort={setActiveSort}
                            defaultSortState={defaultSortState}
                            invoices={invoices}
                          />
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
                    {invoices.map((invoice, index) => (
                      <tr
                        key={invoice._id}
                        className={
                          selectedInvoices.includes(invoice)
                            ? 'bg-gray-50'
                            : undefined
                        }
                      >
                        <td className="relative px-7 sm:w-12 sm:px-6">
                          {selectedInvoices.includes(invoice) && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                          )}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            value={invoice.user}
                            checked={selectedInvoices.includes(invoice)}
                            onChange={(e) => {
                              console.log(
                                invoice.invoiceInformation.invoiceNumber
                              );
                              setMasterState({
                                ...masterState,
                                selectedInvoices: e.target.checked
                                  ? [...selectedInvoices, invoice]
                                  : selectedInvoices.filter(
                                      (p) => p !== invoice
                                    ),
                              });
                            }}
                          />
                        </td>
                        <td
                          className={classNames(
                            'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                            selectedInvoices.includes(invoice)
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
                            invoices={invoices}
                            setInvoices={setInvoices}
                            handleArchive={handleArchive}
                            selectedInvoice={selectedInvoices}
                            index={index}
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
