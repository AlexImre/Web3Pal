import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import TextFieldWithValidation from './Fields/TextFieldWithValidation';
import PaymentToggle from './PaymentToggle';
import {
  validateCustomCurrencyAddress,
  validateCustomCurrencySymbol,
  validateInvoiceLabelling,
  validateName,
  validatePopularCurrency,
  validateWalletAddress,
} from './Fields/formValidation';
import InvoiceLabellingDropDown from './InvoiceLabellingDropDown';

export default function PaymentInformationForm() {
  const paymentToast = () => toast.success('Information updated.');
  const { masterState, setMasterState } = useContext(StateContext);
  const [tempPaymentInfo, setTempPaymentInfo] = useState(
    masterState.invoice.paymentInformation
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
  const handleChange = (e) => {
    setTempPaymentInfo({
      ...tempPaymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const defaultError = {
    invoiceLabelling: false,
    popularCurrency: false,
    walletName: false,
    walletAddress: false,
    customCurrencyName: false,
    customCurrencySymbol: false,
    customCurrencyAddress: false,
    customCurrencyPlatform: false,
  };

  const defaultErrorMessage = {
    invoiceLabelling: '',
    popularCurrency: '',
    walletName: '',
    walletAddress: '',
    customCurrencyName: '',
    customCurrencySymbol: '',
    customCurrencyAddress: '',
    customCurrencyPlatform: '',
  };

  const [error, setError] = useState(defaultError);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);

  const setErrorAndErrorMessages = (formItem) => {
    if (formItem.error === true) {
      setError((prevState) => {
        return { ...prevState, [formItem.property]: true };
      });
      setErrorMessage((prevState) => {
        return {
          ...prevState,
          [formItem.property]: formItem.message,
        };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(defaultError);
    setErrorMessage(defaultErrorMessage);

    if (paymentMethod === 'crypto') {
      const hasInvoiceLabellingError =
        validateInvoiceLabelling(invoiceLabelling);
      const hasPopularCurrencyError = validatePopularCurrency(popularCurrency);
      const hasWalletNameError = validateName(
        walletName,
        'walletName',
        'Wallet name'
      );
      const hasWalletAddressError = validateWalletAddress(walletAddress);
      const validationArray = [
        hasInvoiceLabellingError,
        hasPopularCurrencyError,
        hasWalletNameError,
        hasWalletAddressError,
      ];

      validationArray.forEach(setErrorAndErrorMessages);

      const hasError =
        !!hasPopularCurrencyError ||
        !!hasWalletNameError ||
        !!hasWalletAddressError;
      if (hasError) {
        return;
      }

      setMasterState({
        ...masterState,
        invoice: {
          ...masterState.invoice,
          paymentInformation: {
            ...tempPaymentInfo,
            customCurrencyName: '',
            customCurrencySymbol: '',
            customCurrencyAddress: '',
            customCurrencyPlatform: '',
          },
          formCompletion: {
            ...masterState.invoice.formCompletion,
            paymentInformation: true,
          },
        },
      });
    } else if (paymentMethod === 'custom') {
      const hasInvoiceLabellingError =
        validateInvoiceLabelling(invoiceLabelling);
      const hasCustomCurrencyNameError = validateName(
        customCurrencyName,
        'customCurrencyName',
        'Token name'
      );
      const hasCustomCurrencySymbolError =
        validateCustomCurrencySymbol(customCurrencySymbol);
      const hasCustomCurrencyAddressError = validateCustomCurrencyAddress(
        customCurrencyAddress
      );
      const hasCustomCurrencyPlatformError = validateName(
        customCurrencyPlatform,
        'customCurrencyPlatform',
        'Token platform'
      );
      const hasWalletNameError = validateName(
        walletName,
        'walletName',
        'Wallet name'
      );
      const hasWalletAddressError = validateWalletAddress(walletAddress);

      const validationArray = [
        hasInvoiceLabellingError,
        hasCustomCurrencyNameError,
        hasCustomCurrencySymbolError,
        hasCustomCurrencyAddressError,
        hasCustomCurrencyPlatformError,
        hasWalletNameError,
        hasWalletAddressError,
      ];

      validationArray.forEach(setErrorAndErrorMessages);

      const hasError =
        !!hasCustomCurrencyNameError ||
        !!hasCustomCurrencySymbolError ||
        !!hasCustomCurrencyAddressError ||
        !!hasCustomCurrencyPlatformError ||
        !!hasWalletNameError ||
        !!hasWalletAddressError;
      if (hasError) {
        setTempPaymentInfo({
          ...tempPaymentInfo,
          invoiceLabelling: '',
          popularCurrency: '',
        });
        return;
      }

      setMasterState({
        ...masterState,
        invoice: {
          ...masterState.invoice,
          paymentInformation: {
            ...tempPaymentInfo,
            popularCurrency: '',
          },
          formCompletion: {
            ...masterState.invoice.formCompletion,
            paymentInformation: true,
          },
        },
      });
    }
    paymentToast();
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
                    Payment Information
                  </h3>
                  <p className="mt-1 mb-5 text-sm text-gray-500">
                    Enter currency and payment information.
                  </p>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <InvoiceLabellingDropDown
                        tempPaymentInfo={tempPaymentInfo}
                        setTempPaymentInfo={setTempPaymentInfo}
                        error={error.invoiceLabelling}
                        errorMessage={errorMessage.invoiceLabelling}
                      />
                    </div>
                  </div>
                  <PaymentToggle
                    tempPaymentInfo={tempPaymentInfo}
                    setTempPaymentInfo={setTempPaymentInfo}
                    handleChange={handleChange}
                    error={error}
                    errorMessage={errorMessage}
                  />
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    className="inline-flex w-20 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
