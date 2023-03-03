import { StateContext } from '@/context/stateContext';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import toast from 'react-hot-toast';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function MyInvoicesDisplay(props: any) {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { myInvoices } = masterState;

  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState([]);

  useEffect(() => {
    const isIndeterminate =
      selectedInvoice.length > 0 && selectedInvoice.length < myInvoices.length;
    setChecked(selectedInvoice.length === myInvoices.length);
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
      toast.success(`Invoice${selectedInvoiceIds > 1 ? 's' : ''} deleted.`);
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

    deletedInvoices.ok && invoiceToast();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      NOTE TO ADD SPECIAL COMPONENT IF NO INVOICES
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div className="text-2xl font-semibold text-slate-900">
            My Invoices
          </div>
        </div>
      </div>
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
                      className="flex min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Invoice Number
                      <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex">
                        To
                        <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Issue Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount
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
                  {myInvoices.map((invoice, index) => (
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
                        {invoice.invoiceId.slice(0, 8)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {invoice.personalInformation.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {invoice.personalInformation.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {invoice.personalInformation.email}
                      </td>
                      <td className="whitespace-nowrap py-4 text-right text-sm font-medium sm:pr-3">
                        <button
                          type="button"
                          className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Edit
                        </button>
                        {/* <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </a> */}
                      </td>
                      <td className="whitespace-nowrap py-4 text-right text-sm font-medium sm:pr-3">
                        <button
                          type="button"
                          className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Share
                        </button>
                        {/* <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Share<span className="sr-only">, {person.name}</span>
                        </a> */}
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
