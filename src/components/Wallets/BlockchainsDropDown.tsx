import { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import { StateContext } from '../../context/stateContext';
import { useContext } from 'react';
import { blockChainData } from './blockchainData';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type PopularCurrenciesDropDownProps = {
  tempWallet: any;
  setTempWallet: any;
  error: boolean;
  errorMessage: string;
};

export default function BlockchainsDropDown(
  props: PopularCurrenciesDropDownProps
) {
  const { tempWallet, setTempWallet, error, errorMessage } = props;
  const stateContext = useContext(StateContext);
  const { masterState } = stateContext;
  const blockchains = blockChainData;

  const [query, setQuery] = useState('');

  const filteredChain =
    query === ''
      ? blockchains
      : blockchains.filter((chain) => {
          return chain.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleChange = (blockChain: any) => {
    console.log('tempWallet: ', tempWallet);
    console.log('blockChain: ', blockChain);
    setTempWallet({
      ...tempWallet,
      walletBlockchain: blockChain,
    });
  };

  return (
    <Combobox
      as="div"
      value={tempWallet?.walletBlockchain.name}
      onChange={(e) => {
        handleChange(e);
      }}
      className="mt-4 w-full"
    >
      <label htmlFor="text" className="block text-sm font-medium text-gray-700">
        Blockchain*
      </label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Select a blockchain"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredChain.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredChain.map((chain) => (
              <Combobox.Option
                key={chain.chainId}
                value={chain}
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
                      <img
                        src={chain.logo}
                        alt=""
                        className="h-6 w-6 flex-shrink-0 rounded-full"
                      />
                      <span
                        className={classNames(
                          'ml-3 truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        {chain.name}
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
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
        </p>
      )}
    </Combobox>
  );
}
