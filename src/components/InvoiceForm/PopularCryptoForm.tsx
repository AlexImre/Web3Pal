import React, { useState } from 'react';
import PopularCurrenciesDropDown from './PopularCurrenciesDropDown';
import TextFieldWithValidation from './Fields/TextFieldWithValidation';
import { StateContext } from '../../context/stateContext';
import { useContext } from 'react';

function PopularCryptoForm(props: any) {
  const stateContext = useContext(StateContext);
  const { masterState } = stateContext;
  const { marketData } = masterState;
  const { tempPaymentInfo, setTempPaymentInfo, handleChange, error } = props;
  const { walletName, walletAddress } = tempPaymentInfo;

  const [currentPrice, setCurrentPrice] = useState(0);

  return (
    <>
      <div className="my-5 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex sm:col-span-3">
          <PopularCurrenciesDropDown
            tempPaymentInfo={tempPaymentInfo}
            setTempPaymentInfo={setTempPaymentInfo}
            currentPrice={currentPrice}
            setCurrentPrice={setCurrentPrice}
            error={error}
          />
        </div>
        <div className="col-span-6 content-center items-center text-indigo-500 sm:col-span-3 sm:text-sm">
          {currentPrice
            ? `Market price: $${Intl.NumberFormat('en-US').format(
                currentPrice
              )}`
            : 'Select a currency to view market price.'}{' '}
          <br />
          <div className="text-slate-600 sm:text-xs">Powered by Coingecko</div>
        </div>
      </div>
      <div className="my-5 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-6">
          <TextFieldWithValidation
            label="Your wallet name"
            name="walletName"
            width="w-full"
            value={walletName}
            onChange={handleChange}
            error={error}
          />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-6">
          <TextFieldWithValidation
            label="Your wallet address"
            name="walletAddress"
            width="w-full"
            value={walletAddress}
            onChange={handleChange}
            error={error}
          />
        </div>
      </div>
    </>
  );
}

export default PopularCryptoForm;
