import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import NumberFieldWithValidation from './Fields/NumberFieldWithValidation';
import DateFieldWithValidation from './Fields/DateFieldWithValidation';
import toast from 'react-hot-toast';
import {
  hasIssueDateError,
  hasDueDateError,
  hasInvoiceNumberError,
} from './Fields/formValidation';
import { useSession } from 'next-auth/react';

export default function InvoiceInformationForm() {
  const { data: session } = useSession();

  const invoiceToast = () => toast.success('Information updated.');
  const { masterState, setMasterState } = useContext(StateContext);
  const { invoice, formCompletion } = masterState;
  const { invoiceId } = invoice;
  const [tempInvoiceInfo, setTempInvoiceInfo] = useState(
    masterState.invoice.invoiceInformation
  );
  const { invoiceNumber, issueDate, dueDate } = tempInvoiceInfo;
  const defaultError = {
    invoiceNumber: false,
    issueDate: false,
    dueDate: false,
  };
  const defaultErrorMessage = {
    invoiceNumber: '',
    issueDate: '',
    dueDate: '',
  };
  const [error, setError] = useState(defaultError);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);
  const handleChange = (e) => {
    setTempInvoiceInfo({
      ...tempInvoiceInfo,
      [e.target.name]: e.target.value,
    });
  };

  // how to generate invoice number?
  // look at invoices.length?
  // Every time an invoice is published +1 to some tracking number?
  // check no duplicates of invoice number

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = session?.user?.email;
    const isInvoiceNumberError = await hasInvoiceNumberError(
      invoiceNumber,
      user,
      invoiceId
    );
    const isIssueDateError = hasIssueDateError(issueDate);
    const isDueDateError = hasDueDateError(issueDate, dueDate);

    if (isInvoiceNumberError) {
      setError({ ...error, invoiceNumber: true });
      setErrorMessage({
        ...errorMessage,
        invoiceNumber: isInvoiceNumberError.message,
      });
      return;
    }

    if (isIssueDateError) {
      setError({ ...error, issueDate: true });
      setErrorMessage({ ...errorMessage, issueDate: isIssueDateError.message });
      return;
    } else if (isDueDateError) {
      setError({ ...error, dueDate: true });
      setErrorMessage({ ...errorMessage, dueDate: isDueDateError.message });
      return;
    } else {
      setError(defaultError);
      setErrorMessage(defaultErrorMessage);
    }
    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        invoiceInformation: tempInvoiceInfo,
      },
      formCompletion: {
        ...formCompletion,
        invoiceInformation: true,
      },
    });
    invoiceToast();
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Invoice Information
                  </h3>
                  <p className="mt-1 mb-5 text-sm text-gray-500">
                    Enter the invoice number and key dates that will appear on
                    this invoice.
                  </p>
                  <div className="mb-5 grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <NumberFieldWithValidation
                        label="Invoice number"
                        name="invoiceNumber"
                        width="w-full"
                        value={invoiceNumber}
                        onChange={handleChange}
                        error={error.invoiceNumber}
                        errorMessage={errorMessage.invoiceNumber}
                      />
                    </div>
                  </div>
                  <div className="mb-5 grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <DateFieldWithValidation
                        label="Invoice issue date"
                        name="issueDate"
                        width="w-full"
                        value={issueDate}
                        onChange={handleChange}
                        error={error.issueDate}
                        errorMessage={errorMessage.issueDate}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <DateFieldWithValidation
                        label="Invoice due date"
                        name="dueDate"
                        width="w-full"
                        value={dueDate}
                        onChange={handleChange}
                        error={error.dueDate}
                        errorMessage={errorMessage.dueDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    className="inline-flex w-20 justify-center rounded-md border border-transparent bg-slate-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
