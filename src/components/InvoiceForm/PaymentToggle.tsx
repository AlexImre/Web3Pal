import React, { useState } from 'react';
import PopularCryptoForm from './PopularCryptoForm';
import CustomTokenForm from './CustomTokenForm';

const currencyType = [
  { id: 'crypto', title: 'Popular Cryptocurrencies' },
  { id: 'custom', title: 'Custom token' },
];

export default function PaymentToggle(props: any) {
  const { tempPaymentInfo, setTempPaymentInfo, handleChange } = props;
  const { paymentMethod } = tempPaymentInfo;
  const [selected, setSelected] = useState('crypto');

  const handleToggle = (type: any) => {
    setSelected(type.id);
    setTempPaymentInfo({
      ...tempPaymentInfo,
      paymentMethod: type.id,
    });
  };

  return (
    <div className="mt-3">
      <label className="text-base font-medium text-gray-900">
        Payment method
      </label>
      <fieldset className="my-3">
        <legend className="sr-only">Payment method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {currencyType.map((type) => (
            <div key={type.id} className="flex items-center">
              <input
                id={type.id}
                name="notification-method"
                type="radio"
                defaultChecked={type.id === paymentMethod}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={() => handleToggle(type)}
              />
              <label
                htmlFor={type.id}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {type.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      {paymentMethod === 'crypto' ? (
        <PopularCryptoForm
          tempPaymentInfo={tempPaymentInfo}
          setTempPaymentInfo={setTempPaymentInfo}
          handleChange={handleChange}
        />
      ) : (
        <CustomTokenForm
          tempPaymentInfo={tempPaymentInfo}
          setTempPaymentInfo={setTempPaymentInfo}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}
