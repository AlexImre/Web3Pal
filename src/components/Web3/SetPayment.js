import React from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { contractAbi } from '@/components/Web3/abis';
import Web3 from 'web3';

const web3 = new Web3(
  'https://goerli.infura.io/v3/8a1ee2c98c584a8a8470b0be59ac4c6e'
);

function SetPayment(props) {
  // const { payer } = props;
  const payer = '0xE41e906819746C457F8004C50385035e48F3D7A8';
  const mainWallet = '0xA1077507Fc680f3dd724CA0104db58Ab23893855';
  const contractAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8';
  const payee = mainWallet;
  const amount = web3.utils.toBN(10000000000000).toString();
  const paid = false;

  console.log('payer', payer);
  console.log('payee', payee);
  console.log('amount', amount);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    chainId: 5,
    functionName: 'setPayment',
    args: [payer, payee, amount],
    onSuccess(data) {
      console.log('success', data);
    },
    onSettled(data) {
      console.log('settled', data);
    },
    onError(error) {
      console.log('error', error);
    },
    enabled: false,
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <>
      <button
        type="button"
        className="ml-4 inline-flex w-72 justify-center rounded-md border border-transparent bg-teal-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
        onClick={() => write?.()}
      >
        Set Payment
      </button>
      {isLoading && 'Loading...'}
      {isSuccess && JSON.stringify(data)}
    </>
  );
}

export default SetPayment;
