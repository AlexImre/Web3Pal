import { StateContext } from '@/context/stateContext';
import React, { useContext } from 'react';

const marketCaps = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  // {
  //   name: 'Tether',
  //   symbol: 'USDT',
  //   image:
  //     'https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663',
  // },
  // {
  //   name: 'USD Coin',
  //   symbol: 'USDC',
  //   image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
  // },
  {
    name: 'Tether',
    symbol: '...',
  },
];

function PaymentSection() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { popularCurrency } = masterState.invoice.paymentInformation;

  const handleChange = (symbol: string) => {
    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        paymentInformation: {
          ...masterState.invoice.paymentInformation,
          popularCurrency: symbol,
        },
      },
    });
  };

  return (
    <div className="col-span-2 col-start-1">
      <div className="text-sm">
        <dt className="font-semibold text-gray-900">
          What do you want to be paid in?
        </dt>

        <div className="relative flex items-center justify-start gap-x-1 py-2.5">
          {marketCaps.map((marketCap, index) => {
            const isActiveCurrency = marketCap.symbol === popularCurrency;
            return (
              <div className="flex items-start" key={index}>
                <div
                  className={`flex min-h-[30px] items-center justify-start rounded-md border ${
                    isActiveCurrency ? 'border-indigo-600' : 'border-slate-200'
                  } bg-white px-2 py-1 hover:cursor-pointer hover:bg-slate-100`}
                  onClick={() => handleChange(marketCap.symbol)}
                >
                  {marketCap.symbol === '...' ? (
                    ''
                  ) : (
                    <img
                      className="mr-2 h-5 w-5 rounded-full"
                      src={marketCap.image}
                      alt=""
                    />
                  )}
                  <div className="flex text-xs text-slate-200">
                    <div className="mx-1 text-slate-800">
                      {marketCap.symbol}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PaymentSection;
