import React from 'react';
import { StateContext } from '../../context/stateContext';
import { useContext } from 'react';

export default function PersonalInformation() {
  const stateContext = useContext(StateContext);
  const { personalInformation, invoiceInformation } = stateContext.masterState;

  const {
    name,
    email,
    addressLine1,
    addressLine2,
    city,
    county,
    postalCode,
    country,
  } = personalInformation;

  const { invoiceNumber, issueDate, dueDate } = invoiceInformation;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full py-3">
        <div className="flex items-center">
          <div className="flex-shrink-0"></div>
          <div className="ml-5 w-0 flex-1">
            <div className="text-lg font-medium text-slate-900">
              Personal Information
            </div>
            <div className="font-small truncate text-sm text-gray-500">
              {name && email ? (
                <>
                  {name} <br></br>
                  {email} <br></br>
                  {addressLine1 ? addressLine1 : ''}{' '}
                  {addressLine1 ? <br></br> : ''}
                  {addressLine2 ? addressLine2 : ''}{' '}
                  {addressLine2 ? <br></br> : ''}
                  {`${city ? city : ''} ${county ? county : ''} ${
                    postalCode ? postalCode : ''
                  }`}{' '}
                  {city || county || postalCode ? <br></br> : ''}
                  {country ? country : ''} {country ? <br></br> : ''}
                </>
              ) : (
                <>
                  John Smith <br></br>
                  John@Smith.com <br></br>
                  123 Metaverse Lane <br></br>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-3">
        <div className="flex items-center">
          <div className="flex-shrink-0"></div>
          <div className="ml-5 w-0 flex-1 text-left md:text-right">
            <div className="text-lg font-medium text-slate-900">
              Invoice Information
            </div>
            <div className="font-small truncate text-sm text-gray-500">
              {invoiceNumber ? (
                <>
                  {invoiceNumber} <br></br>
                  {issueDate} <br></br>
                  {dueDate}
                </>
              ) : (
                <>
                  Invoice number: 12 <br></br>
                  Date of Issue: 01/01/2021 <br></br>
                  Payment due by: 01/31/2021
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
