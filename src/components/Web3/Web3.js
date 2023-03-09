/* import Web3 from 'web3';
import { providers } from 'web3modal';
import { helloWorldAbi, contractAbi } from './abis';

const web3 = new Web3(
  'https://goerli.infura.io/v3/8a1ee2c98c584a8a8470b0be59ac4c6e'
);

const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
const paymentContract = new web3.eth.Contract(contractAbi, contractAddress);

// const tx = await paymentContract.methods.makePayment().send({ from: '0x123' })

export const getAccount = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log('accounts', accounts);
  }
};

export const getProviders = () => {
  console.log('window.ethereum.providers: ', window.ethereum.providers);
};

export const makePaymentViaWindowEthereum = async (payer, payee, amount) => {
  // need to force user to the right chain and convert to ETH/WEI
  const transactionParameters = {
    from: payer, // must match user's active address.
    to: payee, // Required except during contract publications.
    // value: web3.utils.toWei(amount.toString(), 'ether'),
    // gasLimit: '21000',
    // maxFeePerGas: '300',
    // maxPriorityFeePerGas: '10',
    // nonce: '0',
    value: web3.utils.toBN(10000000000000).toString(),
  };

  const txHash = await window.ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    })
    .then((txHash) => {
      console.log('txHash', txHash);
    })
    .catch((error) => {
      console.error('error', error);
    });

  return txHash;
};

/* https://stackoverflow.com/questions/55154713/error-the-method-eth-sendtransaction-does-not-exist-is-not-available */

// const tx = {
//   from: payer,
//   to: payee,
//   value: web3.utils.toWei(amount.toString(), 'ether'),
//   gas: 500000,
//   data: paymentContract.methods.makePayment().encodeABI(),
// };

// Prompt the payer to sign the transaction
// .setPayment(payer, payee, web3.utils.toWei(amount.toString(), 'ether'))
// web3.eth.accounts
//   .signTransaction(tx, process.env.NEXT_PUBLIC_WEB3PAL_TEST_PRIVATE_KEY)
//   .then((signedTx) => {
//     // Send the signed transaction to the network
//     web3.eth
//       .sendSignedTransaction(signedTx.rawTransaction)
//       .on('receipt', (receipt) => {
//         console.log('Payment successful:', receipt);
//       })
//       .on('error', (error) => {
//         console.error('Error making payment:', error);
//       });
//   })
//   .catch((error) => {
//     console.error('Error signing transaction:', error);
//   });

// paymentContract.methods
//   .setPayment(payer, payee, web3.utils.toWei(amount.toString(), 'ether'))
//   .send({
//     from: payer,
//     gas: 500000,
//   })
//   .then((receipt) => {
//     console.log('Payment details set:', receipt);
//     // Once payment details have been set, initiate the payment
//     paymentContract.methods
//       .makePayment()
//       .send({
//         from: payer,
//         gas: 500000,
//         value: web3.utils.toWei(amount.toString(), 'ether'),
//       })
//       .then((receipt) => {
//         console.log('Payment successful:', receipt);
//       })
//       .catch((error) => {
//         console.error('Error making payment:', error);
//       });
//   })
//   .catch((error) => {
//     console.error('Error setting payment details:', error);
//   });

// paymentContract.methods.makePayment();

// .then((res) => {
//   console.log('payment details set: ', res);
// })
// .catch((err) => {
//   console.log('error setting payment details: ', err);
// });
// paymentContract.methods.makePayment().send({ from: payer, value: web3.utils.toWei(amount.toString(), 'ether') }); */
