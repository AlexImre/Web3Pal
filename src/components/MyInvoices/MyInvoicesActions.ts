import { StateContext, initialState } from "@/context/stateContext";
import { useContext } from "react";
import toast from "react-hot-toast";

export const handleDelete = async (selectedInvoices: any) => {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
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
  
        }));
          setMasterState({
            ...masterState,
            selectedInvoices: [],
          });
        invoiceToast();
      } 
    }
  };

  export const handleArchive = async (selectedInvoices: any, masterState: any, setMasterState: any) => {
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
        }));
        setMasterState({
          ...masterState,
          selectedInvoices:[],
        });
        archiveToast();
      }
    }
  };