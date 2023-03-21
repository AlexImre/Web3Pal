import React, { useState } from 'react';
import PopularCurrenciesDropDown from './PopularCurrenciesDropDown';
import TextFieldWithValidation from './Fields/TextFieldWithValidation';

function PopularCryptoForm(props: any) {
  const {
    tempPaymentInfo,
    setTempPaymentInfo,
    handleChange,
    error,
    errorMessage,
  } = props;
  const { walletName, walletAddress } = tempPaymentInfo;

  const [currentPrice, setCurrentPrice] = useState(0);

  return (
    <>
      <div className="my-5 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex sm:col-span-3">
          <PopularCurrenciesDropDown
            tempPaymentInfo={tempPaymentInfo}
            setTempPaymentInfo={setTempPaymentInfo}
            setCurrentPrice={setCurrentPrice}
            error={error.popularCurrency}
            errorMessage={errorMessage.popularCurrency}
          />
        </div>
        <div className="col-span-6 content-center items-center text-indigo-500 sm:col-span-3 sm:text-sm">
          {currentPrice
            ? `Market price: $${Intl.NumberFormat('en-US').format(
                currentPrice
              )}`
            : 'Select a currency to view market price.'}{' '}
          <br />
          <div className="text-slate-600 sm:text-xs">Powered by CoinGecko</div>
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
            error={error.walletName}
            errorMessage={errorMessage.walletName}
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
            error={error.walletAddress}
            errorMessage={errorMessage.walletAddress}
          />
        </div>
      </div>
    </>
  );
}

export default PopularCryptoForm;
