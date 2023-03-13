import React, { useEffect } from 'react';

export default function PersonalInformation(props: any) {
  const {
    name,
    email,
    addressLine1,
    addressLine2,
    city,
    county,
    postalCode,
    country,
  } = props.personalInformation;
  const { invoiceNumber, issueDate, dueDate } = props.invoiceInformation;
  const { status } = props;

  useEffect(() => {
    calculateStatus();
  }, [dueDate]);

  const calculateStatus = () => {
    const dueDateFormatted = new Date(dueDate);
    const currentDate = new Date(Date.now());
    if (dueDate) {
      if (status === 'Paid') {
        return (
          <div className="my-4 w-32 rounded-xl border border-solid border-green-800 bg-green-100 p-2 text-center font-bold text-green-800">
            Paid
          </div>
        );
      }
      if (dueDateFormatted < currentDate) {
        return (
          <div className="my-4 w-32 rounded-xl border border-solid border-red-800 bg-red-100 p-2 text-center font-bold text-red-800">
            Overdue
          </div>
        );
      } else {
        return (
          <div className="my-4 w-32 rounded-xl border border-solid border-yellow-800 bg-yellow-100 p-2 text-center font-bold text-yellow-800">
            Unpaid
          </div>
        );
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full py-3">
        <div className="flex items-center">
          <div className="flex-shrink-0"></div>
          <div className="ml-3 flex-1">
            <div className="text-lg font-medium text-slate-900">
              Personal Information
            </div>
            <div className="font-small text-sm text-gray-500">
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
                  <em>Example Name</em>
                  <br></br>
                  <em>Example Email</em> <br></br>
                  <em>Example Address</em> <br></br>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-3">
        <div className="flex items-center">
          <div className="flex-shrink-0"></div>
          <div className="ml-3 flex-1 text-left md:text-right">
            <div className="text-lg font-medium text-slate-900">
              Invoice Information
            </div>
            <div className="font-small truncate text-sm text-gray-500">
              {invoiceNumber ? (
                <>
                  Invoice number: {invoiceNumber} <br></br>
                  Date of issue:{' '}
                  {new Date(issueDate).toLocaleDateString('en-US')}
                  <br></br>
                  Payment due by:{' '}
                  {new Date(dueDate).toLocaleDateString('en-US')}
                </>
              ) : (
                <>
                  <em>Invoice number: 1</em> <br></br>
                  <em>Date of Issue: 01/01/2023</em> <br></br>
                  <em>Payment due by: 01/02/2023</em>
                </>
              )}
            </div>
            <div className="flex justify-end">{calculateStatus()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
