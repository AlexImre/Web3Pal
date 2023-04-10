import { StateContext } from '@/context/stateContext';
import { fetchInvoiceNumber } from '@/utils/fetchData';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function VoidInvoiceAlert() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { invoice } = masterState;
  const { _id } = masterState.organisation;

  const handleCopy = async () => {
    const newInvoiceId = uuidv4();
    const invoiceNumber = await fetchInvoiceNumber(_id);
    const newInvoice = {
      ...invoice,
      invoiceId: newInvoiceId,
      status: 'Draft',
      createdTimestamp: new Date(Date.now()),
      invoiceInformation: {
        ...invoice.invoiceInformation,
        invoiceNumber,
      },
    };
    setMasterState({ ...masterState, invoice: newInvoice });
  };

  return (
    <div className="rounded-md bg-slate-900 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-white"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-white">
            Void invoice - This invoice is no longer published.
          </h3>
          <div className="mt-2 text-sm text-white">
            <p>
              If you would like to create a copy of this invoice, click the
              button below. If you wish to use the same invoice number for your
              copy, you must first archive the void invoice from 'My invoices'.
              <br></br>
              <br></br>
            </p>
            <div className="flex justify-between">
              <button
                className="mb-2 mr-4 w-32 rounded bg-white py-2 px-4 text-sm font-medium text-slate-900 hover:bg-gray-200"
                onClick={handleCopy}
              >
                Copy invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
