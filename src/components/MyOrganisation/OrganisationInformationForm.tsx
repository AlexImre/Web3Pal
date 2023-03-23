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
  const [tempOrgInfo, setTempOrgInfo] = useState(organisation);
  const {
    organisationName,
    organisationEmail,
    organisationAddressLine1,
    organisationAddressLine2,
    organisationCity,
    organisationCounty,
    organisationPostalCode,
  } = tempOrgInfo;
  const handleChange = (e) => {
    setTempOrgInfo({
      ...tempOrgInfo,
      [e.target.name]: e.target.value,
    });
  };

  const defaultError = {
    organisationName: false,
    organisationEmail: false,
  };
  const defaultErrorMessage = {
    organisationName: '',
    organisationEmail: '',
  };
  const [error, setError] = useState(defaultError);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(defaultError);
    setErrorMessage(defaultErrorMessage);

    const isNameError = validateName(organisationName, 'name', 'Name');
    if (!!isNameError) {
      setError((prevState) => {
        return { ...prevState, organisationName: true };
      });
      setErrorMessage((prevState) => {
        return { ...prevState, organisationName: isNameError.message };
      });
    }

    const isEmailError = validateEmail(organisationEmail);
    if (!!isEmailError) {
      setError((prevState) => {
        return { ...prevState, organisationEmail: true };
      });
      setErrorMessage((prevState) => {
        return { ...prevState, organisationEmail: isEmailError.message };
      });
    }

    const hasError = !!isNameError || !!isEmailError;
    if (hasError) {
      return;
    }

    // update org in db
    const updateOrganisation = await fetch('/api/updateorganisation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tempOrgInfo),
    });
    const response = await updateOrganisation.json();
    if (updateOrganisation.status === 201) {
      setMasterState({
        ...masterState,
        organisation: tempOrgInfo,
      });
      pesonalToast();
    }
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
                      name="organisationName"
                      width="w-full"
                      onChange={handleChange}
                      value={organisationName}
                      error={error.organisationName}
                      errorMessage={errorMessage.organisationName}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <EmailField
                      label="Email address"
                      name="organisationEmail"
                      width="w-full"
                      onChange={handleChange}
                      value={organisationEmail}
                      error={error.organisationEmail}
                      errorMessage={errorMessage.organisationEmail}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <CountriesField
                      tempInfo={tempOrgInfo}
                      setTempInfo={setTempOrgInfo}
                    />
                  </div>

                  <div className="col-span-6">
                    <TextField
                      label="Address line 1"
                      name="organisationAddressLine1"
                      width="w-full"
                      onChange={handleChange}
                      value={organisationAddressLine1}
                    />
                  </div>
                  <div className="col-span-6">
                    <TextField
                      label="Address line 2"
                      name="organisationAddressLine2"
                      width="w-full"
                      onChange={handleChange}
                      value={organisationAddressLine2}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField
                      label="City"
                      name="organisationCity"
                      width="w-full"
                      onChange={handleChange}
                      value={organisationCity}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField
                      label="State / Province"
                      name="organisationCounty"
                      width="w-full"
                      onChange={handleChange}
                      value={organisationCounty}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField
                      label="ZIP / Postal code"
                      name="organisationPostalCode"
                      width="w-full"
                      onChange={handleChange}
                      value={organisationPostalCode}
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
