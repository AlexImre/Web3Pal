import EmailField from './Fields/EmailField';
import TextFieldRequired from './Fields/TextFieldWithValidation';
import CountriesField from './Fields/CountriesField';
import { ClientType, StateContext } from '../../context/stateContext';
import { useContext, useEffect, useState } from 'react';
import TextField from './Fields/TextField';
import toast from 'react-hot-toast';
import { validateEmail, validateName } from './Fields/formValidation';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';

export default function PersonalInformationForm(props: any) {
  const recipientToast = () => toast.success('Information updated.');
  const errorToast = () => toast.error('Client already exists.');
  const genericErrorToast = () => toast.error('Something went wrong.');
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { data: session } = useSession();
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
    clientCountry,
  } = tempRecipientInfo;
  const handleChange = (e) => {
    setTempRecipientInfo({
      ...tempRecipientInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setTempRecipientInfo({
      clientName: '',
      clientEmail: '',
      clientAddressLine1: '',
      clientAddressLine2: '',
      clientCity: '',
      clientCounty: '',
      clientPostalCode: '',
      clientCountry: '',
    });
  }, []);

  const defaultError = {
    clientName: false,
    clientEmail: false,
  };
  const defaultErrorMessage = {
    clientName: '',
    clientEmail: '',
  };
  const [error, setError] = useState(defaultError);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(defaultError);
    setErrorMessage(defaultErrorMessage);

    const isNameError = validateName(clientName, 'clientName', 'Name');
    if (!!isNameError) {
      setError((prevState) => {
        return { ...prevState, clientName: true };
      });
      setErrorMessage((prevState) => {
        return { ...prevState, clientName: isNameError.message };
      });
    }

    const isEmailError = validateEmail(clientEmail);
    if (!!isEmailError) {
      console.log('getting here!');
      setError((prevState) => {
        return { ...prevState, clientEmail: true };
      });
      setErrorMessage((prevState) => {
        return { ...prevState, clientEmail: isEmailError.message };
      });
    }

    const doesClientExist = masterState.organisation.clients.find(
      (client) =>
        client.clientEmail.toLocaleLowerCase() ===
        clientEmail.toLocaleLowerCase()
    );
    if (!!doesClientExist) {
      setError((prevState) => {
        return { ...prevState, clientEmail: true };
      });
      setErrorMessage((prevState) => {
        return {
          ...prevState,
          clientEmail: 'Client with this email already exists.',
        };
      });
    }

    const hasError = !!isNameError || !!isEmailError || !!doesClientExist;
    if (hasError) {
      return;
    }

    const newClient: ClientType = {
      organisation_id: masterState.organisation._id,
      clientId: uuidv4(),
      clientName: clientName,
      clientEmail: clientEmail,
      clientAddressLine1: clientAddressLine1,
      clientAddressLine2: clientAddressLine2,
      clientCity: clientCity,
      clientCounty: clientCounty,
      clientPostalCode: clientPostalCode,
      clientCountry: clientCountry,
      createdBy: session.user.email,
      createdTimestamp: new Date(Date.now()),
    };

    // add try catch here
    const addClient = await fetch('/api/addclient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    });

    if (addClient.status === 201) {
      setMasterState({
        ...masterState,
        organisation: {
          ...masterState.organisation,
          clients: [...masterState.organisation.clients, newClient],
        },
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
      props.setShowAddNewClient(!props.showAddNewClient);
      props.setOpen(!props.open);
    } else if (addClient.status === 400) {
      errorToast();
    } else {
      genericErrorToast();
    }
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  {/* <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Recipient Information
                  </h3>
                  <p className="mt-1 mb-5 text-sm text-gray-500">
                    Enter information about the recipient of this invoice.
                  </p> */}
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <TextFieldRequired
                        label="Name"
                        name="clientName"
                        width="w-full"
                        onChange={handleChange}
                        value={clientName}
                        error={error.clientName}
                        errorMessage={errorMessage.clientName}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <EmailField
                        label="Email address"
                        name="clientEmail"
                        width="w-full"
                        onChange={handleChange}
                        value={clientEmail}
                        error={error.clientEmail}
                        errorMessage={errorMessage.clientEmail}
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
                    className="inline-flex w-20 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Add
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
