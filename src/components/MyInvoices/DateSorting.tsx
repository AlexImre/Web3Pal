import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function DateSorting(props: any) {
  const { invoices } = props;
  const { activeSort, setActiveSort, defaultSortState } = props;
  const [shouldSortDate, setShouldSortDate] = useState(true);
  const handleDateSorting = () => {
    if (invoices.length === 0) return;

    setActiveSort({ ...defaultSortState, issueDate: true });

    invoices.sort((a: any, b: any) => {
      const date1 = new Date(a.invoiceInformation.dueDate);
      const date2 = new Date(b.invoiceInformation.dueDate);

      const timestamp1 = BigInt(date1.getTime());
      const timestamp2 = BigInt(date2.getTime());

      shouldSortDate ? setShouldSortDate(false) : setShouldSortDate(true);

      if (shouldSortDate) {
        return (
          parseInt(timestamp1.toString()) - parseInt(timestamp2.toString())
        );
      } else {
        return (
          parseInt(timestamp2.toString()) - parseInt(timestamp1.toString())
        );
      }
    });
  };

  return (
    <span className="ml-2 flex-none cursor-pointer rounded text-gray-400 group-hover:visible group-focus:visible">
      {shouldSortDate ? (
        <ChevronDownIcon
          className={classNames(
            'h-5 w-5',
            activeSort.issueDate ? 'rounded bg-gray-200 text-gray-600' : ''
          )}
          aria-hidden="true"
          onClick={handleDateSorting}
        />
      ) : (
        <ChevronUpIcon
          className={classNames(
            'h-5 w-5',
            activeSort.issueDate ? 'rounded bg-gray-200 text-gray-600' : ''
          )}
          aria-hidden="true"
          onClick={handleDateSorting}
        />
      )}
    </span>
  );
}

export default DateSorting;
