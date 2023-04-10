export const getInvoiceStatus = (invoice) => {
    const { status } = invoice;
    const { dueDate } = invoice.invoiceInformation;
    const dueDateFormatted = new Date(dueDate);
    const currentDate = new Date(Date.now());
    if (invoice.isArchived === true) {
      return "Archived";
    }
    if (status === 'Draft') {
      return "Draft";
    }
    if (status === 'Example') {
      return "Example"
    }
    if (status === 'Void') {
      return "Void";
    }
    if (dueDate) {
      if (status === 'Paid') {
        return "Paid"
      }
      if (dueDateFormatted < currentDate) {
        return "Overdue";
      } else {
        return "Unpaid";
      }
  } else {
    return "Unpaid";
  }
}