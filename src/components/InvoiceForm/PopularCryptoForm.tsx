import React, { useState } from 'react';
import PopularCurrenciesDropDown from './PopularCurrenciesDropDown';
import TextFieldWithValidation from './Fields/TextFieldWithValidation';
import { StateContext } from '../../context/stateContext';
import { useContext } from 'react';

function PopularCryptoForm(props: any) {
  const stateContext = useContext(StateContext);
  const { masterState } = stateContext;
  const { marketData } = masterState;
  const { tempPaymentInfo, setTempPaymentInfo, handleChange } = props;
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
          />
        </div>
        <div className="col-span-6 flex content-center items-center text-indigo-500 sm:col-span-3 sm:text-sm">
          {currentPrice
            ? `Live price: $
              ${Intl.NumberFormat('en-US').format(currentPrice)}`
            : 'Select a currency for recent prices.'}
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
          />
        </div>
      </div>
    </>
  );
}

export default PopularCryptoForm;