export const getInvoiceStatus = (invoice) => {
    const { status } = invoice;
    const { dueDate } = invoice.invoiceInformation;
    const dueDateFormatted = new Date(dueDate);
    const currentDate = new Date(Date.now());
    if (status === 'Draft') {
      return "Draft";
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
  }
}