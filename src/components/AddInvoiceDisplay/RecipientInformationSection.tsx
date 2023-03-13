import React from 'react';

export default function RecipientInformation(props: any) {
  const {
    clientName,
    clientEmail,
    clientAddressLine1,
    clientAddressLine2,
    clientCity,
    clientCounty,
    clientPostalCode,
    clientCountry,
  } = props.recipientInformation;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full py-3">
        <div className="flex items-center">
          <div className="flex-shrink-0"></div>
          <div className="ml-3 w-0 flex-1">
            <div className="text-lg font-medium text-slate-900">
              Recipient Information
            </div>
            <div className="font-small text-sm text-gray-500">
              {clientName && clientEmail ? (
                <>
                  {clientName} <br></br>
                  {clientEmail} <br></br>
                  {clientAddressLine1 ? clientAddressLine1 : ''}{' '}
                  {clientAddressLine1 ? <br></br> : ''}
                  {clientAddressLine2 ? clientAddressLine2 : ''}{' '}
                  {clientAddressLine2 ? <br></br> : ''}
                  {`${clientCity ? clientCity : ''} ${
                    clientCounty ? clientCounty : ''
                  } ${clientPostalCode ? clientPostalCode : ''}`}{' '}
                  {clientCity || clientCounty || clientPostalCode ? (
                    <br></br>
                  ) : (
                    ''
                  )}
                  {clientCountry ? clientCountry : ''}{' '}
                  {clientCountry ? <br></br> : ''}
                </>
              ) : (
                <>
                  <em>Example Client Name</em> <br></br>
                  <em>Example Client Address</em> <br></br>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
