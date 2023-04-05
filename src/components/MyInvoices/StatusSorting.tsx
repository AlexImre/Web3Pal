import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { getInvoiceStatus } from '../AddInvoiceDisplay/GetInvoiceStatus';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function NameSorting(props: any) {
  const { invoices } = props;
  const { activeSort, setActiveSort, defaultSortState } = props;
  const [shouldSortStatus, setShouldSortStatus] = useState(false);

  const handleStatusSorting = () => {
    if (invoices.length === 0) return;

    setActiveSort({ ...defaultSortState, status: true });

    invoices.sort((a, b) => {
      shouldSortStatus ? setShouldSortStatus(false) : setShouldSortStatus(true);

      const invoiceStatusA = getInvoiceStatus(a);
      const invoiceStatusB = getInvoiceStatus(b);

      if (shouldSortStatus) {
        return invoiceStatusA.localeCompare(invoiceStatusB);
      } else {
        return invoiceStatusB.localeCompare(invoiceStatusA);
      }
    });
  };

  return (
    <span className="ml-2 flex-none cursor-pointer rounded text-gray-400 group-hover:visible group-focus:visible">
      {shouldSortStatus ? (
        <ChevronDownIcon
          className={classNames(
            'h-5 w-5',
            activeSort.status ? 'rounded bg-gray-200 text-gray-600' : ''
          )}
          aria-hidden="true"
          onClick={handleStatusSorting}
        />
      ) : (
        <ChevronUpIcon
          className={classNames(
            'h-5 w-5',
            activeSort.status ? 'rounded bg-gray-200 text-gray-600' : ''
          )}
          aria-hidden="true"
          onClick={handleStatusSorting}
        />
      )}
    </span>
  );
}

export default NameSorting;
