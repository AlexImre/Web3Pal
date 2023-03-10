import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import TextField from '../InvoiceForm/Fields/TextField';
import WalletTable from './WalletTable';
import { ethers } from 'ethers';

function Wallets() {
  const { address, isConnected } = useAccount();

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [wallets, setWallets] = useState<any>([]);

  const handleChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleNameChange = (e) => {
    setWalletName(e.target.value);
  };

  const handleClick = () => {
    const isValid = ethers.utils.isAddress(walletAddress);
    if (isValid) {
      console.log('valid address');
    } else {
      console.log('invalid address');
      return;
    }
    setWallets([...wallets, { name: walletName, address: walletAddress }]);
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="text-2xl font-semibold text-slate-900">
                  Add Wallets
                </div>
                <p className="mt-1 mb-5 text-sm text-gray-500">
                  Wallets added here will be available for use throughout the
                  app.
                </p>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6">
                    <TextField
                      label="Wallet Name"
                      name="walletName"
                      width="w-full"
                      value={walletName}
                      onChange={(e) => handleNameChange(e)}
                    />
                    <div className="mt-5">
                      <TextField
                        label="Wallet Address"
                        name="walletAddress"
                        width="w-full"
                        value={walletAddress}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  className="inline-flex w-20 justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleClick}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="text-2xl font-semibold text-slate-900">
                  Wallets
                </div>
                <br></br>
                {wallets.map((wallet) => (
                  <>
                    {wallet.name} <br></br> {wallet.address}
                    <br></br>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallets;
