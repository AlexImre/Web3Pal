import React from 'react';
import PopularCurrenciesDropDown from './PopularCurrenciesDropDown';
import TextFieldWithValidation from './Fields/TextFieldWithValidation';

function PopularCryptoForm(props: any) {
  return (
    <>
      <div className="my-5 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <TextFieldWithValidation
            label="Token name"
            name="customCurrencyName"
            width="w-full"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <TextFieldWithValidation
            label="Token symbol"
            name="customCurrencySymbol"
            width="w-full"
          />
        </div>
      </div>
      <div className="my-5 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <TextFieldWithValidation
            label="Token platform"
            name="customCurrencyPlatform"
            width="w-full"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <TextFieldWithValidation
            label="Token contract address"
            name="customCurrencyAddress"
            width="w-full"
          />
        </div>
      </div>
      <div className="my-5 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-6">
          <TextFieldWithValidation
            label="Your wallet name"
            name="walletName"
            width="w-full"
          />
        </div>
      </div>
      <div className="my-5 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-6">
          <TextFieldWithValidation
            label="Your wallet address"
            name="walletAddress"
            width="w-full"
          />
        </div>
      </div>
    </>
  );
}

export default PopularCryptoForm;
