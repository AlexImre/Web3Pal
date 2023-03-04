import React from 'react';
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react';

export const YourApp = () => {
  return <Web3Button />;
};

function Wallets() {
  return (
    <>
      <div>Connect your wallet</div>
      <Web3Button />
    </>
  );
}

export default Wallets;
