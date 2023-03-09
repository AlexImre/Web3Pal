import React from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { contractAbi } from '@/components/Web3/abis';

function MakePayment(props) {
  const { config } = usePrepareContractWrite({
    address: '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8',
    abi: contractAbi,
    chainId: 5,
    functionName: 'makePayment',
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
        Make Payment
      </button>
      {isSuccess && JSON.stringify(data)}
    </>
  );
}

export default MakePayment;
