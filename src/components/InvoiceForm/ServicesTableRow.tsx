import React, { useContext } from 'react';
import ServicesField from './Fields/ServicesField';
import { TrashIcon } from '@heroicons/react/24/outline';
import { getServiceAmount } from './ServicesUtils';
import { invoiceLabels } from '../AddInvoiceDisplay/AddInvoiceUtils';
import { StateContext } from '@/context/stateContext';

function ServicesTableRow(props: any) {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { invoiceLabelling } = masterState.invoice.paymentInformation;
  const {
    service,
    index,
    tempServicesInfo,
    setTempServicesInfo,
    updateServiceAmount,
    error,
    errorMessage,
  } = props;

  const { uuid, description, quantity, price, tax, discount } = service;

  const removeRow = () => {
    setTempServicesInfo(
      tempServicesInfo.filter((item: any) => item.uuid !== service.uuid)
    );
  };

  const handleChange = (e: any, uuid: string) => {
    setTempServicesInfo(
      tempServicesInfo.map((service: any) => {
        if (service?.uuid === uuid) {
          return {
            ...service,
            [e.target.name]: e.target.value,
          };
        }
        return service;
      })
    );
  };

  const invoiceLabel = invoiceLabels.find(
    (label) => label.abbreviation === invoiceLabelling
  ).symbol;

  const serviceAmount = getServiceAmount(service) || 0;

  return (
    <>
      <div className="relative col-span-8 sm:col-span-2">
        <div className="absolute -left-6 mt-3.5 overflow-visible">
          {index === 0 ? (
            ''
          ) : (
            <TrashIcon
              className="curs h-5 w-5 text-slate-500 hover:cursor-pointer hover:text-slate-700"
              onClick={removeRow}
            />
          )}
        </div>
        <ServicesField
          type="text"
          name="description"
          width="w-full"
          className="block w-full overflow-x-auto border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          value={description}
          handleChange={(e: any) => handleChange(e, uuid)}
          error={error}
          errorMessage={errorMessage}
        />
      </div>
      <div className="col-span-8 overflow-x-auto sm:col-span-1">
        <ServicesField
          type="text"
          name="quantity"
          width="w-full"
          className="block w-full border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          value={quantity}
          handleChange={(e: any) => handleChange(e, uuid)}
        />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <ServicesField
          type="text"
          name="price"
          width="w-full"
          className="block w-full border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          value={price}
          handleChange={(e: any) => handleChange(e, uuid)}
        />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <ServicesField
          type="text"
          name="discount"
          width="w-full"
          className="block w-full border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          value={discount}
          handleChange={(e: any) => handleChange(e, uuid)}
        />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <ServicesField
          type="text"
          name="tax"
          width="w-full"
          className="block w-full border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          value={tax}
          handleChange={(e: any) => handleChange(e, uuid)}
        />
      </div>
      <div className="col-span-8 flex items-center justify-center overflow-x-auto sm:col-span-1 sm:text-sm">
        {invoiceLabel + serviceAmount.toFixed(2)}
      </div>
    </>
  );
}

export default ServicesTableRow;
