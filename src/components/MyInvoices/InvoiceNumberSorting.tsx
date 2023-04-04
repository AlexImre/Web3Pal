import { StateContext } from '@/context/stateContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import React, { useContext, useState } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function InvoiceNumberSorting(props: any) {
  const stateContext = useContext(StateContext);
  const { masterState } = stateContext;
  const { myInvoices } = masterState;
  const { activeSort, setActiveSort, defaultSortState } = props;
  const [shouldSortInvoiceNumber, setShouldSortInvoiceNumber] = useState(true);
  const handleInvoiceNumberSorting = () => {
    if (myInvoices.length === 0) return;
    myInvoices.sort((a, b) => {
      setActiveSort({ ...defaultSortState, invoiceNumber: true });
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
