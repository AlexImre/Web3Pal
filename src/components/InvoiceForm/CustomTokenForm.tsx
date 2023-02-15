import React from 'react';
import TextFieldWithValidation from './Fields/TextFieldWithValidation';

function PopularCryptoForm(props: any) {
  const { tempPaymentInfo, handleChange, error } = props;
  const {
    customCurrencyName,
    customCurrencySymbol,
    customCurrencyPlatform,
    customCurrencyAddress,
    walletName,
    walletAddress,
  } = tempPaymentInfo;

  return (
    <>
      <div className="my-5 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <TextFieldWithValidation
            label="Token name"
            name="customCurrencyName"
            width="w-full"
            value={customCurrencyName}
            onChange={handleChange}
            error={error}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <TextFieldWithValidation
            label="Token symbol"
            name="customCurrencySymbol"
            width="w-full"
            value={customCurrencySymbol}
            onChange={handleChange}
            error={error}
          />
        </div>
      </div>
      <div className="my-5 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <TextFieldWithValidation
            label="Token platform"
            name="customCurrencyPlatform"
            width="w-full"
            value={customCurrencyPlatform}
            onChange={handleChange}
            error={error}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <TextFieldWithValidation
            label="Token contract address"
            name="customCurrencyAddress"
            width="w-full"
            value={customCurrencyAddress}
            onChange={handleChange}
            error={error}
          />
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
      <div className="my-5 grid grid-cols-6 gap-6">
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
