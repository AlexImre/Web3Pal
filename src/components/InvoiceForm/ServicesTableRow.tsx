import React from 'react';
import ServicesField from './Fields/ServicesField';
import { TrashIcon } from '@heroicons/react/24/outline';

function ServicesTableRow(props: any) {
  const {
    service,
    index,
    tempServicesInfo,
    setTempServicesInfo,
    handleChange,
  } = props;

  const { uuid, description, quantity, price, amount, tax, discount } = service;

  const removeRow = () => {
    setTempServicesInfo(
      tempServicesInfo.filter((item: any) => item.uuid !== service.uuid)
    );
  };

  const getAmount = () => {
    if (!quantity || !price || quantity === 0 || price === 0) {
      return 0;
    }
    let convertDiscount = (discount / 100) * price;
    return (quantity * price - convertDiscount) * (1 + tax / 100);
  };

  return (
    <>
      <div className="col-span-8 sm:col-span-2">
        <ServicesField
          type="text"
          name="description"
          width="w-full"
          className="block w-full border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          value={description}
          handleChange={(e: any) => handleChange(e, uuid)}
        />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <ServicesField
          type="number"
          name="quantity"
          width="w-full"
          className="block w-full border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          value={quantity}
          handleChange={(e: any) => handleChange(e, uuid)}
        />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <ServicesField
          type="number"
          name="price"
          width="w-full"
          className="block w-full border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          value={price}
          handleChange={(e: any) => handleChange(e, uuid)}
        />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <ServicesField
          type="number"
          name="discount"
          width="w-full"
          className="block w-full border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          value={discount}
          handleChange={(e: any) => handleChange(e, uuid)}
        />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <ServicesField
          type="number"
          name="tax"
          width="w-full"
          className="block w-full border-0 border-b border-transparent bg-gray-100 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          value={tax}
          handleChange={(e: any) => handleChange(e, uuid)}
        />
      </div>
      <div className="col-span-8 flex items-center justify-center sm:col-span-1 sm:text-sm ">
        {Intl.NumberFormat('en-US').format(getAmount())}
      </div>
      {index === 0 ? (
        ''
      ) : (
        <div className="col-span-8 flex items-center justify-center sm:col-span-1">
          <TrashIcon
            className="curs h-5 w-5 text-slate-500 hover:cursor-pointer hover:text-slate-700"
            onClick={removeRow}
          />
        </div>
      )}
    </>
  );
}

export default ServicesTableRow;
