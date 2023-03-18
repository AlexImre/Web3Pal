import EmailField from './Fields/EmailField';
import TextFieldRequired from './Fields/TextFieldWithValidation';
import CountriesField from './Fields/CountriesField';
import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import TextField from './Fields/TextField';
import toast from 'react-hot-toast';
import { validateEmail, validateName } from './Fields/formValidation';

export default function PersonalInformationForm() {
  const recipientToast = () => toast.success('Information updated.');
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const recipientInformation =
    stateContext.masterState.invoice.recipientInformation;
  const [tempRecipientInfo, setTempRecipientInfo] =
    useState(recipientInformation);
  const {
    clientName,
    clientEmail,
    clientAddressLine1,
    clientAddressLine2,
    clientCity,
    clientCounty,
    clientPostalCode,
  } = tempRecipientInfo;
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setTempRecipientInfo({
      ...tempRecipientInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateName(clientName)) {
      setError(true);
      return;
    }
    if (!validateEmail(clientEmail)) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        recipientInformation: tempRecipientInfo,
        formCompletion: {
          ...masterState.invoice.formCompletion,
          recipientInformation: true,
        },
      },
    });
    recipientToast();
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
                    Recipient Information
                  </h3>
                  <p className="mt-1 mb-5 text-sm text-gray-500">
                    Enter information about the recipient of this invoice.
                  </p>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <TextFieldRequired
                        label="Name"
                        name="clientName"
                        width="w-full"
                        onChange={handleChange}
                        value={clientName}
                        error={error}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <EmailField
                        label="Email address"
                        name="clientEmail"
                        width="w-full"
                        onChange={handleChange}
                        value={clientEmail}
                        error={error}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <CountriesField
                        tempInfo={tempRecipientInfo}
                        setTempInfo={setTempRecipientInfo}
                      />
                    </div>

                    <div className="col-span-6">
                      <TextField
                        label="Address line 1"
                        name="clientAddressLine1"
                        width="w-full"
                        onChange={handleChange}
                        value={clientAddressLine1}
                      />
                    </div>
                    <div className="col-span-6">
                      <TextField
                        label="Address line 2"
                        name="clientAddressLine2"
                        width="w-full"
                        onChange={handleChange}
                        value={clientAddressLine2}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <TextField
                        label="City"
                        name="clientCity"
                        width="w-full"
                        onChange={handleChange}
                        value={clientCity}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <TextField
                        label="State / Province"
                        name="clientCounty"
                        width="w-full"
                        onChange={handleChange}
                        value={clientCounty}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <TextField
                        label="ZIP / Postal code"
                        name="clientPostalCode"
                        width="w-full"
                        onChange={handleChange}
                        value={clientPostalCode}
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
