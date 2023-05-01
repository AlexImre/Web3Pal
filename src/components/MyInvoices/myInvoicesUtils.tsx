export function getInvoiceStatusChip(invoice) {
  const status = invoice.status;
  const dueDate = new Date(invoice.invoiceInformation.dueDate);
  const currentDate = new Date(Date.now());
  if (status === 'Draft') {
    return (
      <div className="inline-flex w-16 items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium capitalize text-blue-800">
        Draft
      </div>
    );
  }
  if (status === 'Void') {
    return (
      <div className="inline-flex w-16 items-center justify-center rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium capitalize text-white">
        Void
      </div>
    );
  }
  if (dueDate) {
    if (status === 'Paid') {
      return (
        <div className="inline-flex w-16 items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium capitalize text-green-800">
          Paid
        </div>
      );
    } else if (dueDate < currentDate) {
      return (
        <div className="inline-flex w-16 items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium capitalize text-red-800">
          Overdue
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium capitalize text-yellow-800">
          Unpaid
        </div>
      );
    }
  }
}

export function getDashboardStatusChips(status: string) {
  switch (status) {
    case 'Draft':
      return (
        <div className="inline-flex w-16 items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium capitalize text-blue-800">
          Draft
        </div>
      );
    case 'Void':
      return (
        <div className="inline-flex w-16 items-center justify-center rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium capitalize text-white">
          Void
        </div>
      );
    case 'Paid':
      return (
        <div className="inline-flex w-16 items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium capitalize text-green-800">
          Paid
        </div>
      );
    case 'Overdue':
      return (
        <div className="inline-flex w-16 items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium capitalize text-red-800">
          Overdue
        </div>
      );
    case 'Unpaid':
      return (
        <div className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium capitalize text-yellow-800">
          Unpaid
        </div>
      );
    default:
      return (
        <div className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium capitalize text-yellow-800">
          Unpaid
        </div>
      );
  }
}

export function getAddInvoiceHeaderStatusChip(invoice) {
  const status = invoice.status;
  const dueDate = new Date(invoice.invoiceInformation.dueDate);
  const currentDate = new Date(Date.now());
  if (status === 'Draft') {
    return (
      <div className="inline-flex w-32 items-center justify-center rounded-md bg-blue-100 px-5 py-1 text-2xl font-medium capitalize text-blue-800">
        Draft
      </div>
    );
  }
  if (status === 'Void') {
    return (
      <div className="inline-flex w-32 items-center justify-center rounded-md bg-slate-800 px-5 py-1 text-2xl font-medium capitalize text-white">
        Void
      </div>
    );
  }
  if (dueDate) {
    if (status === 'Paid') {
      return (
        <div className="text-greeen-800 inline-flex w-32 items-center justify-center rounded-md bg-green-100 px-5 py-1 text-2xl font-medium capitalize">
          Paid
        </div>
      );
    } else if (dueDate < currentDate) {
      return (
        <div className="inline-flex w-32 items-center justify-center rounded-md bg-red-100 px-5 py-1 text-2xl font-medium capitalize text-red-800">
          Overdue
        </div>
      );
    } else {
      return (
        <div className="inline-flex w-32 items-center justify-center rounded-md bg-yellow-100 px-5 py-1 text-2xl font-medium capitalize text-yellow-800">
          Unpaid
        </div>
      );
    }
  }
}
