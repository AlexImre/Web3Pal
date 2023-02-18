import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import NumberFieldWithValidation from './Fields/NumberFieldWithValidation';
import DateFieldWithValidation from './Fields/DateFieldWithValidation';
import toast, { Toaster } from 'react-hot-toast';

export default function InvoiceInformationForm() {
  const invoiceToast = () => toast.success('Information updated.');
  const { masterState, setMasterState } = useContext(StateContext);
  const [tempInvoiceInfo, setTempInvoiceInfo] = useState(
    masterState.invoiceInformation
  );
  const { invoiceNumber, issueDate, dueDate } = tempInvoiceInfo;
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setTempInvoiceInfo({ ...tempInvoiceInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (tempInvoiceInfo.firstName === '' || tempInvoiceInfo.lastName === '') {
    //   setError(true)
    //   return
    // } else if (
    //   tempInvoiceInfo.email === '' ||
    //   !tempInvoiceInfo.email.includes('@')
    // ) {
    //   setError(true)
    //   return
    // } else {
    //   setError(false)
    // }
    setMasterState({ ...masterState, invoiceInformation: tempInvoiceInfo });
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
