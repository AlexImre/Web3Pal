import { StateContext } from '@/context/stateContext';
import React, { useContext } from 'react';

export default function PersonalInformation(props: any) {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { invoiceNumber } = masterState.invoice.invoiceInformation;
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
  const { issueDate, dueDate } = props.invoiceInformation;

  return (
    <>
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
                {dueDate ? (
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
                    <em>Invoice number: {invoiceNumber}</em> <br></br>
                    <em>Date of Issue: 01/01/2023</em> <br></br>
                    <em>Payment due by: 01/02/2023</em>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
