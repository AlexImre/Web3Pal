import { StateContext, TempServicesInfoContext } from '@/context/stateContext';
import Link from 'next/link';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';

export default function InvoiceActions(props: any) {
  const {
    invoice,
    handleArchive,
    handleDelete,
    selectedInvoice,
    invoices,
    setInvoices,
    index,
  } = props;
  const stateContext = useContext(StateContext);
  const { setMasterState } = stateContext;

  const tempServicesContext = useContext(TempServicesInfoContext);
  const { tempServicesInfo, setTempServicesInfo } = tempServicesContext;

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

    setTempServicesInfo(invoice.servicesInformation);
  };

  const handleVoid = async (invoiceId: string) => {
    if (
      window.confirm(
        'Are you sure you wish to void? If you wish to continue with this action, press OK.'
      )
    ) {
      const voidToast = () => toast.success(`Invoice voided.`);

      const voidInvoice = await fetch('/api/voidinvoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceId),
      });

      const newArray = invoices.filter(
        (item) => item.invoiceId !== invoice.invoiceId
      );

      if (voidInvoice.ok) {
        // QQ This feels extremely inefficient!? Would it be faster to refetch data from db?
        setMasterState((prevState) => ({
          ...prevState,
          myInvoices: prevState.myInvoices.map((item) => {
            if (item.invoiceId === invoice.invoiceId) {
              return {
                ...invoice,
                status: 'Void',
              };
            } else {
              return item;
            }
          }),
        })),
          setInvoices(newArray),
          voidToast();
      }
    }
  };

  const isInvoicePaid = invoice.status === 'Paid';
  const isInvoiceDraft = invoice.status === 'Draft';
  const isInvoiceUnpaid =
    invoice.status === 'Unpaid' || invoice.status === 'Overdue';
  const isInvoicePublished = isInvoiceUnpaid || isInvoicePaid;
  const isInvoiceArchived = invoice.isArchived === true;

  return (
    <div className="flex">
      <Link
        href={{
          pathname: '/addinvoice',
          query: { invoiceId: invoice.invoiceId },
        }}
      >
        <button
          type="button"
          className="mr-2 inline-flex w-14 items-center justify-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => handleEdit(invoice)}
        >
          {isInvoiceDraft ? 'Edit' : 'View'}
        </button>
      </Link>
      {isInvoiceUnpaid && !isInvoiceArchived && (
        <Link href={`/invoices/${invoice.invoiceId}`}>
          <button
            type="button"
            className="mr-2 inline-flex w-14 items-center justify-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Share
          </button>
        </Link>
      )}
      {isInvoiceUnpaid && (
        <button
          type="button"
          className="mr-2 inline-flex items-center rounded border border-transparent bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
          onClick={() => handleVoid(invoice.invoiceId)}
        >
          Void
        </button>
      )}
      {isInvoiceDraft && (
        <button
          type="button"
          className="mr-2 inline-flex w-14 items-center justify-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => handleDelete([invoice])}
        >
          Delete
        </button>
      )}
    </div>
  );
}
