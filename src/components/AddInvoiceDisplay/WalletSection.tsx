import { StateContext } from '@/context/stateContext';
import { PencilIcon } from '@heroicons/react/24/solid';
import React, { useContext, useState } from 'react';
import WalletCommandPalette from './WalletCommandPalette';

function WalletSection() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { validation } = masterState;
  const { walletName, walletAddress } = masterState.invoice.paymentInformation;
  const [open, setOpen] = useState(false);

  const truncateAddress = (address) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  return (
    <div className="col-span-2 col-start-3">
      <div className="flex items-center space-x-3 ">
        <dt className="text-sm font-semibold text-gray-900">
          Choose your wallet to receive payment
        </dt>
        <div
          className="ml-3 w-fit cursor-pointer rounded-full p-0.5 text-indigo-600 hover:bg-indigo-100"
          onClick={() => setOpen(true)}
        >
          <PencilIcon width="13" height="13" />
        </div>
      </div>
      {validation.wallet && (
        <span className="text-sm font-bold text-red-600">
          Missing wallet details.
        </span>
      )}
      <WalletCommandPalette open={open} setOpen={setOpen} />
      <dd className="text-sm text-gray-500">
        <span className="font-medium text-gray-900">
          {walletName ? walletName : ''}{' '}
        </span>{' '}
        <br></br>
        <span className="font-medium text-gray-900">
          {walletAddress ? truncateAddress(walletAddress) : ''}{' '}
        </span>
      </dd>
    </div>
  );
}

export default WalletSection;
