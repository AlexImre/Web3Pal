import EmailField from '../InvoiceForm/Fields/EmailField';
import TextFieldRequired from '../InvoiceForm/Fields/TextFieldWithValidation';
import CountriesField from '../InvoiceForm/Fields/CountriesField';
import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import TextField from '../InvoiceForm/Fields/TextField';
import toast from 'react-hot-toast';
import {
  validateEmail,
  validateName,
} from '../InvoiceForm/Fields/formValidation';

export default function OrganisationInformationForm() {
  const pesonalToast = () => toast.success('Information updated.');
  const { masterState, setMasterState } = useContext(StateContext);
  const { organisation } = masterState;
  const [tempPersonalInfo, setTempPersonalInfo] = useState(
    masterState.invoice.personalInformation
  );
  const { name, email, addressLine1, addressLine2, city, county, postalCode } =
    tempPersonalInfo;
  const handleChange = (e) => {
    setTempPersonalInfo({
      ...tempPersonalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const defaultError = {
    name: false,
    email: false,
  };
  const defaultErrorMessage = {
    name: '',
    email: '',
  };
  const [error, setError] = useState(defaultError);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(defaultError);
    setErrorMessage(defaultErrorMessage);

    const isNameError = validateName(name, 'name', 'Name');
    if (!!isNameError) {
      setError((prevState) => {
        return { ...prevState, name: true };
      });
      setErrorMessage((prevState) => {
        return { ...prevState, name: isNameError.message };
      });
    }

    const isEmailError = validateEmail(email);
    if (!!isEmailError) {
      console.log('getting here!');
      setError((prevState) => {
        return { ...prevState, email: true };
      });
      setErrorMessage((prevState) => {
        return { ...prevState, email: isEmailError.message };
      });
    }

    const hasError = !!isNameError || !!isEmailError;
    if (hasError) {
      return;
    }

    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        personalInformation: tempPersonalInfo,
        formCompletion: {
          ...masterState.invoice.formCompletion,
          personalInformation: true,
        },
      },
    });
    pesonalToast();
  };

  return (
    <>
      <div className="m-10">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-10">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Organisation Information
                </h3>
                <p className="mt-1 mb-5 text-sm text-gray-500">
                  Enter information about your organisation. This information
                  will be available for use when creating invoices.
                </p>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <TextFieldRequired
                      label="Name"
                      name="name"
                      width="w-full"
                      onChange={handleChange}
                      value={organisation.organisationName}
                      error={error.name}
                      errorMessage={errorMessage.name}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <EmailField
                      label="Email address"
                      name="email"
                      width="w-full"
                      onChange={handleChange}
                      value={email}
                      error={error.email}
                      errorMessage={errorMessage.email}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <CountriesField
                      tempInfo={tempPersonalInfo}
                      setTempInfo={setTempPersonalInfo}
                    />
                  </div>

                  <div className="col-span-6">
                    <TextField
                      label="Address line 1"
                      name="addressLine1"
                      width="w-full"
                      onChange={handleChange}
                      value={addressLine1}
                    />
                  </div>
                  <div className="col-span-6">
                    <TextField
                      label="Address line 2"
                      name="addressLine2"
                      width="w-full"
                      onChange={handleChange}
                      value={addressLine2}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField
                      label="City"
                      name="city"
                      width="w-full"
                      onChange={handleChange}
                      value={city}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField
                      label="State / Province"
                      name="county"
                      width="w-full"
                      onChange={handleChange}
                      value={county}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField
                      label="ZIP / Postal code"
                      name="postalCode"
                      width="w-full"
                      onChange={handleChange}
                      value={postalCode}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-10">
                <button
                  className="inline-flex w-20 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={(e) => handleSubmit(e)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
