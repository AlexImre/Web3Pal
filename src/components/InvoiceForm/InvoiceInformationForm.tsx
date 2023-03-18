import { StateContext } from '../../context/stateContext';
import { useContext, useEffect, useState } from 'react';
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
  const user = session?.user?.email;
  const invoiceToast = () => toast.success('Information updated.');
  const { masterState, setMasterState } = useContext(StateContext);
  const { invoice } = masterState;
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
  const handleChange = async (e) => {
    console.log('changing: ', issueDate, ' to: ', e.target.value);
    setTempInvoiceInfo({
      ...tempInvoiceInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log('tempInvoiceInfo: ', tempInvoiceInfo);
    e.preventDefault();
    setError(defaultError);
    setErrorMessage(defaultErrorMessage);

    const isInvoiceNumberError = await hasInvoiceNumberError(
      invoiceNumber,
      user,
      invoiceId
    );

    if (!!isInvoiceNumberError) {
      setError((prevState) => {
        return { ...prevState, invoiceNumber: true };
      });
      setErrorMessage((prevState) => {
        return {
          ...prevState,
          invoiceNumber: isInvoiceNumberError.message,
        };
      });
    }

    const isIssueDateError = hasIssueDateError(issueDate);
    if (isIssueDateError) {
      setError((prevState) => {
        return { ...prevState, issueDate: true };
      });
      setErrorMessage((prevState) => {
        return { ...prevState, issueDate: isIssueDateError.message };
      });
    }

    const isDueDateError = hasDueDateError(issueDate, dueDate);
    if (isDueDateError) {
      setError((prevState) => {
        return { ...prevState, dueDate: true };
      });
      setErrorMessage((prevState) => {
        return { ...prevState, dueDate: isDueDateError.message };
      });
    }

    const hasError =
      !!isInvoiceNumberError || !!isIssueDateError || !!isDueDateError;

    console.log('hasError: ', hasError);

    console.log('before return');
    if (hasError) {
      return;
    }
    console.log('after return');

    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        invoiceInformation: tempInvoiceInfo,
        formCompletion: {
          ...masterState.invoice.formCompletion,
          invoiceInformation: true,
        },
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
                        placeholder="Selected a date"
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
                        placeholder="Selected a date"
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
