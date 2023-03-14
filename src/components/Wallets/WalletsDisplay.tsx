import React, { useState } from 'react';
import TextField from '../InvoiceForm/Fields/TextField';
import WalletTable from './WalletTable';
import { ethers } from 'ethers';
import { useSession } from 'next-auth/react';

type WalletType = {
  name: string;
  address: string;
};

function Wallets() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletName, setWalletName] = useState<string>('');
  const [wallets, setWallets] = useState<WalletType[]>([]);

  const session = useSession();
  const user = session.data.user.email;

  const handleChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleNameChange = (e) => {
    setWalletName(e.target.value);
  };

  const handleRemoveWallet = (index: number) => {
    const newWallets = [...wallets];
    newWallets.splice(index, 1);
    setWallets(newWallets);
  };

  const handleAddWallet = async () => {
    const isValidWallet = ethers.utils.isAddress(walletAddress);

    // TO DO: Add this to validation
    if (!isValidWallet) {
      alert('Please enter a valid wallet address');
      return;
    }

    const newWallet: WalletType = {
      name: walletName,
      address: walletAddress,
    };

    const requestBody = {
      user: user,
      wallet: newWallet,
    };

    const addWallet = await fetch('/api/addwallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requestBody }),
    });

    if (addWallet.ok) {
      setWallets([...wallets, newWallet]);
    }
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
                      <span className="cursor-pointer text-xs hover:text-indigo-500">
                        Click here to add connected wallet address
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  className="inline-flex w-20 justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleAddWallet}
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
                {wallets.map((wallet, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    {wallet.name} <br></br> {wallet.address}
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => handleRemoveWallet(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
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
