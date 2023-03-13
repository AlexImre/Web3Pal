import React from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function PaymentDetails(props) {
  const {
    invoiceLabelling,
    paymentMethod,
    popularPlatform,
    popularCurrency,
    customCurrencyName,
    customCurrencySymbol,
    customCurrencyPlatform,
    customCurrencyAddress,
    walletName,
    walletAddress,
    marketPrice,
  } = props.paymentInformation;
  const { isForSender } = props;

  const copyToast = () => toast.success('Wallet address copied to clipboard.');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    copyToast();
  };

  const copyIcon = (
    <ClipboardDocumentIcon
      className="ml-1 h-5 w-5 text-indigo-500 hover:cursor-pointer hover:text-indigo-600"
      aria-hidden="true"
      onClick={copyToClipboard}
    />
  );

  const walletAddressDisplay = (
    <div className="flex">
      Wallet Address: {walletAddress} {copyIcon}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full py-3">
        <div className="flex items-center">
          <div className="flex-shrink-0"></div>
          <div className="ml-3 w-0 flex-1">
            <div className="text-lg font-medium text-slate-900">
              Payment Details
            </div>
            <div className="font-small truncate text-sm text-gray-500">
              {invoiceLabelling ? (
                <>
                  {paymentMethod === 'crypto' ? (
                    <>
                      {popularPlatform ? `Platform: ${popularPlatform}` : ''}{' '}
                      {popularPlatform ? <br></br> : ''}
                      {popularCurrency
                        ? `Crytocurrency: ${popularCurrency}`
                        : ''}
                      <br></br>
                      {walletName && !isForSender
                        ? `Wallet Name: ${walletName}`
                        : ''}{' '}
                      {!isForSender && <br></br>}
                      {walletAddress && !isForSender
                        ? `Wallet Address: ${walletAddress}`
                        : ''}
                      {!isForSender && <br></br>}
                    </>
                  ) : (
                    <>
                      {customCurrencyPlatform
                        ? `Platform: ${customCurrencyPlatform}`
                        : ''}{' '}
                      <br></br>
                      {customCurrencyName
                        ? `Cryptocurrency: ${customCurrencyName} (${customCurrencySymbol})`
                        : ''}{' '}
                      <br></br>
                      {walletName ? `Wallet Name: ${walletName}` : ''} <br></br>
                      {walletAddress ? walletAddressDisplay : ''}{' '}
                    </>
                  )}
                </>
              ) : (
                <>
                  <em>Example Crytocurrency</em> <br></br>
                  <em>Example Wallet Address</em> <br></br>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
