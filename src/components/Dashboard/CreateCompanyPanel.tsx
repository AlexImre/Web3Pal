import { useContext, useEffect, useState } from 'react';
import TextFieldWithValidation from '../InvoiceForm/Fields/TextFieldWithValidation';
import { StateContext } from '@/context/stateContext';
import { validateOrganisationName } from '../InvoiceForm/Fields/formValidation';
import toast from 'react-hot-toast';
import { OrganisationType } from '@/context/stateContext';
import { useSession } from 'next-auth/react';

export default function CreateCompanyPanel() {
  const { data: session } = useSession();
  const { masterState, setMasterState } = useContext(StateContext);
  const user = session?.user?.email;

  const defaultOrganisation: OrganisationType = {
    organisationName: '',
    organisationEmail: '',
    createdBy: '',
    createdTimestamp: undefined,
    updatedBy: '',
    updatedTimestamp: undefined,
    members: [],
    admins: [],
    wallets: [],
  };
  const [tempOrganisation, setTempOrganisation] = useState(defaultOrganisation);
  const [readyToSave, setReadyToSave] = useState(false);

  const handleChange = (e) => {
    const newOrganisation = {
      ...tempOrganisation,
      organisationName: e.target.value,
    };

    setTempOrganisation(newOrganisation);
  };

  useEffect(() => {
    if (!readyToSave) {
      return;
    }

    const saveOrg = async () => {
      const saveOrganisation = await fetch('/api/saveorganisation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempOrganisation),
      });
      const data = await saveOrganisation.json();
      if (saveOrganisation.status === 201) {
        setMasterState({
          ...masterState,
          organisation: {
            ...tempOrganisation,
            _id: data.insertedId,
          },
        });
        savedToast();
      }
    };

    saveOrg();
  }, [readyToSave]);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const savedToast = () => toast.success('Company created.');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorMessage('');

    const hasOrganizationError = validateOrganisationName(
      tempOrganisation.organisationName
    );

    if (hasOrganizationError) {
      setError(true);
      setErrorMessage(hasOrganizationError.message);
      return;
    }

    setTempOrganisation((prevState) => {
      return {
        ...prevState,
        createdBy: user,
        createdTimestamp: new Date(Date.now()),
        members: [user],
        admins: [user],
      };
    });

    setReadyToSave(true);
  };

  return (
    <div className="m-10 max-w-4xl bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Let&apos;s get you started!
        </h3>
        <div className="mt-2 w-full text-sm text-gray-500">
          <p>
            To use this app, you need to create an organisation. Your invoices
            and payments will be associated with this organisation. You can only
            be a member of one organisation at a time.
          </p>
        </div>
        <br></br>
        <div>
          <TextFieldWithValidation
            label="Organisation name"
            name="organisationName"
            width="w-full"
            helperText="You can add more details about your organisation in the My organisation section."
            value={tempOrganisation.organisationName}
            onChange={(e) => {
              handleChange(e);
            }}
            error={error}
            errorMessage={errorMessage}
          />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right sm:rounded-lg sm:px-6">
        <button
          className="w-50 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={(e) => handleSubmit(e)}
        >
          Create Organisation
        </button>
      </div>
    </div>
  );
}
