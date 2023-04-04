import { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import { StateContext } from '../../context/stateContext';
import { useContext } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type PopularCurrenciesDropDownProps = {
  tempPaymentInfo: any;
  setTempPaymentInfo: any;
};

const truncateAddress = (address: string) => {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
};

export default function SelectWalletDropDown(
  props: PopularCurrenciesDropDownProps
) {
  const { tempPaymentInfo, setTempPaymentInfo } = props;
  const stateContext = useContext(StateContext);
  const { masterState } = stateContext;
  const { wallets } = masterState.organisation;

  const [query, setQuery] = useState('');

  const filteredWallet =
    query === ''
      ? wallets
      : wallets.filter((wallet) => {
          return wallet.walletName.toLowerCase().includes(query.toLowerCase());
        });

  const handleChange = (wallet: any) => {
    setTempPaymentInfo({
      ...tempPaymentInfo,
      walletName: wallet.walletName,
      walletAddress: wallet.walletAddress,
    });
  };

  return (
    <Combobox
      as="div"
      value={wallets[0].walletName}
      onChange={(e) => {
        handleChange(e);
      }}
      className="mt-4 w-full"
    >
      <label htmlFor="text" className="block text-sm font-medium text-gray-700">
        Wallet
      </label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Select wallet"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredWallet.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredWallet.map((wallet) => (
              <Combobox.Option
                key={wallet.walletAddress}
                value={wallet}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <span
                        className={classNames(
                          'ml-3 truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        <strong>{wallet.walletName}</strong>
                      </span>
                      <span
                        className={classNames(
                          'ml-3 truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        {truncateAddress(wallet.walletAddress)}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
