import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import TextFieldWithValidation from './Fields/TextFieldWithValidation';
import PaymentToggle from './PaymentToggle';

export default function PaymentInformationForm() {
  const personalInfoToast = () => toast.success('Information updated.');
  const { masterState, setMasterState } = useContext(StateContext);
  const [tempPaymentInfo, setTempPaymentInfo] = useState(
    masterState.paymentInformation
  );
  const {
    invoiceLabelling,
    walletName,
    walletAddress,
    popularCurrency,
    paymentMethod,
    customCurrencyName,
    customCurrencySymbol,
    customCurrencyAddress,
    customCurrencyPlatform,
  } = tempPaymentInfo;
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setTempPaymentInfo({
      ...tempPaymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'crypto') {
      if (
        invoiceLabelling === '' ||
        popularCurrency === '' ||
        walletName === '' ||
        walletAddress === ''
      ) {
        setError(true);
        return;
      } else {
        setError(false);
      }
      setMasterState({
        ...masterState,
        paymentInformation: {
          ...tempPaymentInfo,
          customCurrencyName: '',
          customCurrencySymbol: '',
          customCurrencyAddress: '',
          customCurrencyPlatform: '',
        },
      });
    } else if (paymentMethod === 'custom') {
      if (
        invoiceLabelling === '' ||
        customCurrencyName === '' ||
        customCurrencySymbol === '' ||
        customCurrencyAddress === '' ||
        customCurrencyPlatform === '' ||
        walletName === '' ||
        walletAddress === ''
      ) {
        setError(true);
        return;
      } else {
        setError(false);
      }
      setMasterState({
        ...masterState,
        paymentInformation: {
          ...tempPaymentInfo,
          popularCurrency: '',
        },
      });
      personalInfoToast();
    }
  };

  return (
    <>
      <div style={{ position: 'sticky' }}>
        <Toaster containerStyle={{ position: 'sticky' }} />
      </div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Payment Information
                  </h3>
                  <p className="mt-1 mb-5 text-sm text-gray-500">
                    Enter currency and payment information.
                  </p>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <TextFieldWithValidation
                        label="Invoice Labelling"
                        name="invoiceLabelling"
                        width="w-full"
                        onChange={handleChange}
                        value={invoiceLabelling}
                        error={error}
                      />
                    </div>
                  </div>
                  <PaymentToggle
                    tempPaymentInfo={tempPaymentInfo}
                    setTempPaymentInfo={setTempPaymentInfo}
                    handleChange={handleChange}
                    error={error}
                  />
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
