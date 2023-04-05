import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function NameSorting(props: any) {
  const { invoices } = props;
  const { activeSort, setActiveSort, defaultSortState } = props;
  const [shouldSortClientName, setShouldSortClientName] = useState(false);
  const handleClientNameSorting = () => {
    if (invoices.length === 0) return;

    setActiveSort({ ...defaultSortState, clientName: true });

    invoices.sort((a, b) => {
      shouldSortClientName
        ? setShouldSortClientName(false)
        : setShouldSortClientName(true);
      if (shouldSortClientName) {
        return a.recipientInformation.clientName.localeCompare(
          b.recipientInformation.clientName
        );
      } else {
        return b.recipientInformation.clientName.localeCompare(
          a.recipientInformation.clientName
        );
      }
    });
  };

  return (
    <span className="ml-2 flex-none cursor-pointer cursor-pointer rounded text-gray-400 group-hover:visible group-focus:visible">
      {shouldSortClientName ? (
        <ChevronDownIcon
          className={classNames(
            'h-5 w-5',
            activeSort.clientName ? 'rounded bg-gray-200 text-gray-600' : ''
          )}
          aria-hidden="true"
          onClick={handleClientNameSorting}
        />
      ) : (
        <ChevronUpIcon
          className={classNames(
            'h-5 w-5',
            activeSort.clientName ? 'rounded bg-gray-200 text-gray-600' : ''
          )}
          aria-hidden="true"
          onClick={handleClientNameSorting}
        />
      )}
    </span>
  );
}

export default NameSorting;
