import { PencilIcon } from '@heroicons/react/24/solid';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import FromSectionModal from './FromSectionModal';
import { StateContext } from '@/context/stateContext';

function FromSection() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const {
    name,
    email,
    addressLine1,
    addressLine2,
    city,
    county,
    postalCode,
    country,
  } = masterState.invoice.personalInformation;
  const { organisationName, organisationEmail } = masterState.organisation;

  const [open, setOpen] = useState(false);

  const isNameUndefined = name === undefined || name === '';
  const isEmailUndefined = email === undefined || email === '';

  useEffect(() => {
    if (isNameUndefined || isEmailUndefined) {
      setMasterState((prevState) => {
        return {
          ...prevState,
          invoice: {
            ...prevState.invoice,
            personalInformation: {
              ...prevState.invoice.personalInformation,
              name: isNameUndefined && organisationName,
              email: isEmailUndefined && organisationEmail,
            },
          },
        };
      });
    }
  }, []);

  return (
    <div className="col-span-2 col-start-1 text-sm sm:pr-4">
      <div className="flex items-center space-x-3">
        <dt className="font-semibold text-gray-900">From</dt>
        <div
          className="ml-3 w-fit cursor-pointer rounded-full p-0.5 text-indigo-600 hover:bg-indigo-100"
          onClick={() => setOpen(true)}
        >
          <PencilIcon width="13" height="13" />
        </div>
      </div>
      <FromSectionModal open={open} setOpen={setOpen} />
      <dd className="text-gray-500">
        <span className="font-medium text-gray-900">{name}</span> <br></br>
        <span className="font-medium text-gray-900">{email}</span> <br></br>
        {addressLine1 ? addressLine1 : ''} {addressLine1 ? <br></br> : ''}
        {addressLine2 ? addressLine2 : ''} {addressLine2 ? <br></br> : ''}
        {`${city ? city : ''} ${county ? county : ''} ${
          postalCode ? postalCode : ''
        }`}{' '}
        {city || county || postalCode ? <br></br> : ''}
        {country ? country : ''} {country ? <br></br> : ''}
      </dd>
    </div>
  );
}

export default FromSection;
