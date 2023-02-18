import React from 'react';
import { StateContext } from '../../context/stateContext';
import { useContext } from 'react';

export default function RecipientInformation() {
  const { masterState, setMasterState } = useContext(StateContext);
  const {
    name,
    email,
    addressLine1,
    addressLine2,
    city,
    county,
    postalCode,
    country,
  } = masterState.recipientInformation;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full py-3">
        <div className="flex items-center">
          <div className="flex-shrink-0"></div>
          <div className="ml-3 w-0 flex-1">
            <div className="text-lg font-medium text-slate-900">
              Recipient Information
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
                  MetaExchange Ltd <br></br>
                  Drury Lane, London <br></br>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
