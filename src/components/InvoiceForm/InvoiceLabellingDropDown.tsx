import { useEffect, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import { StateContext } from '../../context/stateContext';
import { useContext } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { CurrencyPoundIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type PopularCurrenciesDropDownProps = {
  tempPaymentInfo: any;
  setTempPaymentInfo: any;
  error: boolean;
  errorMessage: string;
};

export default function InvoiceLabellingDropDown(
  props: PopularCurrenciesDropDownProps
) {
  const { tempPaymentInfo, setTempPaymentInfo, error, errorMessage } = props;
  const stateContext = useContext(StateContext);
  const { masterState } = stateContext;
  const coins = masterState.marketData;
  const fiat = [
    {
      name: 'USD',
      symbol: '$',
      image: <CurrencyDollarIcon className="h-6 w-6" />,
    },
    // {
    //   name: 'GBP',
    //   symbol: '£',
    //   image: <CurrencyPoundIcon className="h-6 w-6" />,
    // },
  ];

  const invoiceLabels = fiat.concat(coins);

  const [query, setQuery] = useState('');
  // reset query on submit so dropdown appears again
  useEffect(() => {
    setQuery('');
  }, [error]);

  const data =
    query === ''
      ? invoiceLabels
      : invoiceLabels.filter((currency) => {
          return currency.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleChange = (e: any) => {
    setTempPaymentInfo({
      ...tempPaymentInfo,
      invoiceLabelling: e.name,
    });
  };

  const getImage = (currency) => {
    if (currency.name === 'USD' || currency.name === 'GBP') {
      return currency.image;
    } else {
      return (
        <img
          src={currency.image}
          alt=""
          className="h-6 w-6 flex-shrink-0 rounded-full"
        />
      );
    }
  };

  return (
    <Combobox
      as="div"
      value={tempPaymentInfo?.invoiceLabelling}
      onChange={(e) => {
        handleChange(e);
      }}
      className="w-full"
    >
      <label htmlFor="text" className="block text-sm font-medium text-gray-700">
        Invoice Labelling*
      </label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          // value={tempPaymentInfo?.invoiceLabelling}
          // displayValue={(currency) => currency?.name}
          placeholder="Select a currency"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {data.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {data.slice(0, 2).map((currency) => (
              <Combobox.Option
                key={currency.name}
                value={currency}
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
                      {getImage(currency)}
                      <span
                        className={classNames(
                          'ml-3 truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        {currency.name}
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
      {!error && (
        <p className="mt-2 text-xs text-gray-500">
          Specify the currency that your invoice will be issued in.{' '}
          <span className="font-semibold">More currencies coming soon.</span>
        </p>
      )}
    </Combobox>
  );
}
