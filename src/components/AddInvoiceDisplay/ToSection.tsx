import { PencilIcon } from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import ToCommandPalette from './ToCommandPalette';
import { useState } from 'react';
import { StateContext } from '@/context/stateContext';

function ToSection() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { validation } = masterState;
  const {
    clientName,
    clientEmail,
    clientAddressLine1,
    clientAddressLine2,
    clientCity,
    clientCounty,
    clientPostalCode,
    clientCountry,
  } = masterState.invoice.recipientInformation;
  const [open, setOpen] = useState(false);

  return (
    <div className="col-span-2 col-start-3 rounded-md text-sm sm:pr-4">
      <div className="flex items-center space-x-3">
        <dt className="font-semibold text-gray-900">To</dt>
        <div
          className="ml-3 w-fit cursor-pointer rounded-full p-0.5 text-indigo-600 hover:bg-indigo-100"
          onClick={() => setOpen(true)}
        >
          <PencilIcon width="13" height="13" />
        </div>
      </div>
      {validation.recipientInformation && (
        <span className="font-bold text-red-600">
          Missing recipient details.
        </span>
      )}
      <ToCommandPalette open={open} setOpen={setOpen} />
      <dd className="text-gray-500">
        <span className="font-medium text-gray-900">
          {clientName ? clientName : ''}{' '}
        </span>{' '}
        <br></br>
        <span className="font-medium text-gray-900">
          {clientEmail ? clientEmail : ''}{' '}
        </span>
        <br></br>
        {clientAddressLine1 ? clientAddressLine1 : ''}{' '}
        {clientAddressLine1 ? <br></br> : ''}
        {clientAddressLine2 ? clientAddressLine2 : ''}{' '}
        {clientAddressLine2 ? <br></br> : ''}
        {`${clientCity ? clientCity : ''} ${clientCounty ? clientCounty : ''} ${
          clientPostalCode ? clientPostalCode : ''
        }`}{' '}
        {clientCity || clientCounty || clientPostalCode ? <br></br> : ''}
        {clientCountry ? clientCountry : ''} {clientCountry ? <br></br> : ''}
      </dd>
    </div>
  );
}

export default ToSection;
