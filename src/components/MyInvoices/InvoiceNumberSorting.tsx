import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function InvoiceNumberSorting(props: any) {
  const { invoices } = props;
  const { activeSort, setActiveSort, defaultSortState, setInvoices } = props;
  const [shouldSortInvoiceNumber, setShouldSortInvoiceNumber] = useState(true);
  const handleInvoiceNumberSorting = () => {
    if (invoices.length === 0) return;

    setActiveSort({ ...defaultSortState, invoiceNumber: true });

    invoices.sort((a, b) => {
      shouldSortInvoiceNumber
        ? setShouldSortInvoiceNumber(false)
        : setShouldSortInvoiceNumber(true);
      if (shouldSortInvoiceNumber) {
        return (
          a.invoiceInformation.invoiceNumber -
          b.invoiceInformation.invoiceNumber
        );
      } else {
        return (
          b.invoiceInformation.invoiceNumber -
          a.invoiceInformation.invoiceNumber
        );
      }
    });
    setInvoices(invoices);
  };

  return (
    <span className="ml-2 flex-none cursor-pointer rounded text-gray-400 group-hover:visible group-focus:visible">
      {shouldSortInvoiceNumber ? (
        <ChevronDownIcon
          className={classNames(
            'h-5 w-5',
            activeSort.invoiceNumber ? 'rounded bg-gray-200 text-gray-600' : ''
          )}
          aria-hidden="true"
          onClick={handleInvoiceNumberSorting}
        />
      ) : (
        <ChevronUpIcon
          className={classNames(
            'h-5 w-5',
            activeSort.invoiceNumber ? 'rounded bg-gray-200 text-gray-600' : ''
          )}
          aria-hidden="true"
          onClick={handleInvoiceNumberSorting}
        />
      )}
    </span>
  );
}

export default InvoiceNumberSorting;
