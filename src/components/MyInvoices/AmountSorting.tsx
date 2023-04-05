import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { getServicesTotal } from '../InvoiceForm/ServicesUtils';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function AmountSorting(props: any) {
  const { invoices } = props;
  const { activeSort, setActiveSort, defaultSortState } = props;
  const [shouldSortAmount, setShouldSortAmount] = useState(true);
  const handleAmountSorting = () => {
    if (invoices.length === 0) return;
    invoices.sort((a, b) => {
      setActiveSort({ ...defaultSortState, amount: true });
      shouldSortAmount ? setShouldSortAmount(false) : setShouldSortAmount(true);
      if (shouldSortAmount) {
        return (
          getServicesTotal(a.servicesInformation) -
          getServicesTotal(b.servicesInformation)
        );
      } else {
        return (
          getServicesTotal(b.servicesInformation) -
          getServicesTotal(a.servicesInformation)
        );
      }
    });
  };

  return (
    <span className="ml-2 flex-none cursor-pointer rounded text-gray-400 group-hover:visible group-focus:visible">
      {shouldSortAmount ? (
        <ChevronDownIcon
          className={classNames(
            'h-5 w-5',
            activeSort.amount ? 'rounded bg-gray-200 text-gray-600' : ''
          )}
          aria-hidden="true"
          onClick={handleAmountSorting}
        />
      ) : (
        <ChevronUpIcon
          className={classNames(
            'h-5 w-5',
            activeSort.amount ? 'rounded bg-gray-200 text-gray-600' : ''
          )}
          aria-hidden="true"
          onClick={handleAmountSorting}
        />
      )}
    </span>
  );
}

export default AmountSorting;
