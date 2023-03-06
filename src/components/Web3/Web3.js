import Web3 from 'web3';

const web3 = new Web3(
  'https://mainnet.infura.io/v3/8a1ee2c98c584a8a8470b0be59ac4c6e'
);
const contractAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'amount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'makePayment',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paid',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'payee',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'payer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_payer',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: '_payee',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'setPayment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const contractAddress = '0xE41e906819746C457F8004C50385035e48F3D7A8';

// export const getBalance = async (address) => {
//   const balance = await web3.eth.getBalance(address);
//   const finalBalance = web3.utils.fromWei(balance, 'ether');

//   console.log('balance', finalBalance);
//   return finalBalance;
// };

export const makePayment = (payer, payee, amount) => {
  const paymentContract = new web3.eth.Contract(contractAbi, contractAddress);
  // const payer = payer;
  // const payee = payee;
  // const amount = amount;
  paymentContract.methods
    .setPayment(payer, payee, web3.utils.toWei(amount.toString(), 'ether'))
    .send({ from: payer })
    .then((res) => {
      console.log('payment details set: ', res);
    })
    .catch((err) => {
      console.log('error setting payment details: ', err);
    });

  // paymentContract.methods.makePayment();

  // .then((res) => {
  //   console.log('payment details set: ', res);
  // })
  // .catch((err) => {
  //   console.log('error setting payment details: ', err);
  // });
  // paymentContract.methods.makePayment().send({ from: payer, value: web3.utils.toWei(amount.toString(), 'ether') });
};

/* https://stackoverflow.com/questions/55154713/error-the-method-eth-sendtransaction-does-not-exist-is-not-available */
