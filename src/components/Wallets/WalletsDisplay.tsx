import React, { useEffect, useState } from 'react';
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react';
import { useAccount, useConnect, useNetwork } from 'wagmi';
import TextFieldRequired from '../InvoiceForm/Fields/TextField';
import EmailField from '../InvoiceForm/Fields/EmailField';
import { TextField } from '../Fields';
import TextArea from '../InvoiceForm/Fields/TextArea';
import WalletTable from './WalletTable';

function Wallets() {
  const { address, isConnected } = useAccount();

  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="sm:flex-auto">
                <div className="text-2xl font-semibold text-slate-900">
                  My Wallets
                </div>
              </div>
              <WalletTable />
              <br />
              OR
              <br />
              <Web3Button />
              <h2>{isConnected && 'You are now connected to ' + address}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallets;
