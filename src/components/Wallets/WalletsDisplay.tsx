import React, { useContext, useState } from 'react';
import TextField from '../InvoiceForm/Fields/TextField';
import toast from 'react-hot-toast';
import { StateContext, WalletType } from '@/context/stateContext';
import {
  validateBlockchain,
  validateName,
  validateOrganisationName,
  validateWalletAddress,
  validateWalletName,
} from '../InvoiceForm/Fields/formValidation';
import MyWalletsTable from './MyWalletsTable';
import TextFieldWithValidation from '../InvoiceForm/Fields/TextFieldWithValidation';
import BlockchainsDropDown from './BlockchainsDropDown';
import { useSession } from 'next-auth/react';

export default function WalletsDisplay(props: any) {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { data: session } = useSession();
  const { email } = session.user;

  const { wallets } = masterState.organisation;

  const [tempWallet, setTempWallet] = useState({
    walletName: '',
    walletBlockchain: '',
    walletAddress: '',
  });
  const { walletName, walletAddress, walletBlockchain } = tempWallet;

  const handleChange = (e) => {
    setTempWallet({
      ...tempWallet,
      [e.target.name]: e.target.value,
    });
  };

  const defaultError = {
    walletName: false,
    walletBlockchain: false,
    walletAddress: false,
  };

  const defaultErrorMessage = {
    walletName: '',
    walletBlockchain: '',
    walletAddress: '',
  };

  const [error, setError] = useState(defaultError);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);

  const setErrorAndErrorMessages = (formItem) => {
    if (formItem.error === true) {
      setError((prevState) => {
        return { ...prevState, [formItem.property]: true };
      });
      setErrorMessage((prevState) => {
        return {
          ...prevState,
          [formItem.property]: formItem.message,
        };
      });
    }
  };

  const savedToast = () => toast.success('Wallet saved.');
  const errorToast = () => toast.error('Wallet already exists.');
  const genericErrorToast = () => toast.error('Something went wrong.');
  const handleAddWallet = async (e) => {
    e.preventDefault();
    setError(defaultError);
    setErrorMessage(defaultErrorMessage);
    const hasWalletNameError = validateWalletName(walletName);
    const hasBlockchainError = validateBlockchain(walletBlockchain);
    const hasWalletAddressError = validateWalletAddress(walletAddress);
    const validationArray = [
      hasWalletNameError,
      hasBlockchainError,
      hasWalletAddressError,
    ];

    validationArray.forEach(setErrorAndErrorMessages);

    const hasError =
      !!hasWalletNameError || !!hasWalletAddressError || !!hasBlockchainError;
    if (hasError) {
      return;
    }

    const newWallet: WalletType = {
      organisation_id: masterState.organisation._id,
      walletName: walletName,
      walletAddress: walletAddress,
      walletBlockchain: walletBlockchain,
      createdBy: email,
      createdTimestamp: new Date(Date.now()),
    };
    const addWallet = await fetch('/api/addwallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWallet),
    });
    if (addWallet.status === 201) {
      setMasterState({
        ...masterState,
        organisation: {
          ...masterState.organisation,
          wallets: [...wallets, newWallet],
        },
      });
      savedToast();
      props.setShowAddNewClient(!props.showAddNewClient);
    } else if (addWallet.status === 400) {
      errorToast();
    } else {
      genericErrorToast();
    }
  };

  return (
    <>
      <div className="mt-10 max-w-4xl sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-10">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6">
                    <TextFieldWithValidation
                      label="Wallet Name"
                      name="walletName"
                      width="w-full"
                      value={walletName}
                      onChange={(e) => handleChange(e)}
                      error={error.walletName}
                      errorMessage={errorMessage.walletName}
                    />
                    <BlockchainsDropDown
                      tempWallet={tempWallet}
                      setTempWallet={setTempWallet}
                      error={error.walletBlockchain}
                      errorMessage={errorMessage.walletBlockchain}
                    />
                    <div className="mt-5">
                      <TextFieldWithValidation
                        label="Wallet Address"
                        name="walletAddress"
                        width="w-full"
                        value={walletAddress}
                        onChange={(e) => handleChange(e)}
                        error={error.walletAddress}
                        errorMessage={errorMessage.walletAddress}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-10">
                <button
                  className="inline-flex w-20 justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={(e) => handleAddWallet(e)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br>

      {/* {wallets.length > 0 && <MyWalletsTable />} */}
    </>
  );
}
